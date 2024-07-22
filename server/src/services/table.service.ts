import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Injectable()
export class TableService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getNestedTables() {
    const collections = await this.connection.db.listCollections().toArray();
    const nestedTables = {};

    const originalNames = this.connection.modelNames();

    for (const collection of collections) {
   
      try {
       
        const tableName = originalNames.find(name => this.connection.model(name).collection.name === collection.name);
        console.log("tableName", tableName);
        if (tableName) {
      const properties=await this.getTableAttributes(tableName);
        
      nestedTables[tableName] = properties;
    }}
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
}