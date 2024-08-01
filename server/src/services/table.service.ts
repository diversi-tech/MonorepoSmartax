import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';



@Injectable()
export class TableService {
  constructor(@InjectConnection() private readonly connection: Connection,) { }


  //get tables
  async getNestedTables() {
    const collections = await this.connection.db.listCollections().toArray();
    const nestedTables = {};
    const originalNames = this.connection.modelNames();
    for (const collection of collections) {
      try {
        const tableName = originalNames.find(name => this.connection.model(name).collection.name === collection.name);
        if (tableName) {
          const properties = await this.getTableAttributes(tableName);
          nestedTables[tableName] = properties;
        }
      }
      catch (error) {
        console.log("Error:", error);
        continue;
      }
    }
    return nestedTables;
  }

  async getTableAttributes(tableName: string): Promise<Record<string, string>> {
    try {
      const model = this.connection.model(tableName);
      const schema = model.schema;
      const attributes: Record<string, string> = {};

      schema.eachPath((path: string, schemaType: any) => {
        if (path === '__v') {
          return;
        }
        if (schemaType.options && schemaType.options.ref) {
          attributes[path] = schemaType.options.ref;
        } else {
          attributes[path] = schemaType.instance;
        }
      });

      return attributes;
    } catch (error) {
      console.error(`Error: ${tableName}:`, error);
      throw new Error(`Error: ${tableName}`);
    }
  }

  //get data of selected fields
  async fetchSelectedFields(selectedValues: any): Promise<any> {

    const result = {};

    if (selectedValues) {
      for (const [tableName, fields] of Object.entries(selectedValues)) {

        let hasData = false;

        if (fields && typeof fields === 'object') {
          for (const [fieldName, fieldValue] of Object.entries(fields)) {
            if (this.containsData(fieldValue)) {
              hasData = true;
              break;
            }
          }

          if (hasData) {
            result[tableName] = fields;
          }
        }
      }
    }

    const data = this.fetchDataForSelectedFields(result)
    return data;
  }

  private containsData(value: any): boolean {
    if (value && typeof value === 'object') {
      if (Object.keys(value).length > 0) {
        if ('children' in value) {
          const children = value.children;
          if (typeof children === 'object' && Object.keys(children).length > 0) {
            return true;
          }
        }
        if ('type' in value || 'selected' in value) {
          return true;
        }
      }
    }
    return false;
  }

  async fetchDataForSelectedFields(result: any): Promise<any> {
    const data = {};
    let isInside = false;

    for (const [tableName, fields] of Object.entries(result)) {

      const model = this.connection.model(tableName);
      const fieldNames = Object.keys(fields);

      const projection = fieldNames.reduce((acc, field) => {
        if (fields[field].selected) {
          acc[field] = 1;
        }
        return acc;
      }, {});

      if (!projection['_id']) {
        delete projection['_id'];
      }

      let query = model.find({}, projection);

      fieldNames.forEach(field => {
        if (fields[field].children && Object.keys(fields[field].children).length > 0) {

          for (const [childField, childValue] of Object.entries(fields[field].children)) {
            isInside = true;

            if (childValue['children']) {
              query = query.populate({
                path: field,
                select: Object.keys(fields[field].children).join(' '),
                populate: {
                  path: childField,
                  select: childValue['children'].join(' ')
                }
              });
            }
            else {
              query = query.populate({
                path: field,
                select: Object.keys(fields[field].children).join(' ')
              });
            }


          }

          if (isInside == false) {
            query = query.populate({
              path: field,
              select: Object.keys(fields[field].children).join(' ')
            });
          }

        }
      });

      const results = await query.lean().exec();

      const processedResults = [];
      results.forEach(resultDoc => {
        let baseDoc = { ...resultDoc };

        fieldNames.forEach(field => {
          if (fields[field].children && Object.keys(fields[field].children).length > 0) {
            const childFieldNames = Object.keys(fields[field].children);

            if (Array.isArray(resultDoc[field])) {
              resultDoc[field].forEach(childDoc => {
                const newDoc = { ...baseDoc };
                childFieldNames.forEach(childField => {
                  if (childDoc[childField] !== undefined) {
                    newDoc[childField] = childDoc[childField];
                  }
                });
                Object.keys(fields[field].children).forEach(grandChildField => {
                  if (childDoc[grandChildField] && typeof childDoc[grandChildField] === 'object') {
                    Object.keys(childDoc[grandChildField]).forEach(grandChildSubField => {
                      if (childDoc[grandChildField][grandChildSubField] !== undefined) {
                        newDoc[grandChildSubField] = childDoc[grandChildField][grandChildSubField];
                      }
                    });
                  }
                });
                processedResults.push(newDoc);
              });
            } else if (resultDoc[field] && typeof resultDoc[field] === 'object') {
              const childDoc = resultDoc[field];
              childFieldNames.forEach(childField => {
                if (childDoc[childField] !== undefined) {
                  baseDoc[childField] = childDoc[childField];
                }
              });

              Object.keys(fields[field].children).forEach(grandChildField => {
                if (childDoc[grandChildField] && typeof childDoc[grandChildField] === 'object') {
                  Object.keys(childDoc[grandChildField]).forEach(grandChildSubField => {
                    if (childDoc[grandChildField][grandChildSubField] !== undefined) {
                      baseDoc[grandChildSubField] = childDoc[grandChildField][grandChildSubField];
                    }
                  });
                }
              });
            }

            delete baseDoc[field];
          }
        });

        if (!resultDoc[fieldNames[0]] || !Array.isArray(resultDoc[fieldNames[0]])) {
          processedResults.push(baseDoc);
        }
      });

      const cleanedResults = processedResults.map(doc => {
        const cleanedDoc = { ...doc };
        Object.keys(cleanedDoc).forEach(key => {
          const value = cleanedDoc[key];
          if ((typeof value === 'object') && (value !== null) &&
            ((!Array.isArray(value)) && (!(value instanceof Date)) || (Array.isArray(value)))) {
            delete cleanedDoc[key];
          }
        });

        if ('__v' in cleanedDoc) {
          delete cleanedDoc['__v'];
        }

        return cleanedDoc;
      });

      data[tableName] = cleanedResults;
    }

    return data;
  }
}