import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TableService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getAllCollections(): Promise<any> {
    const collections = await this.connection.db.listCollections().toArray();
    const collectionsWithDetails = await Promise.all(
      collections.map(async (collection) => {
        const documents = await this.connection.db.collection(collection.name).find().toArray();
        const properties = documents.reduce((acc, doc) => {
          Object.keys(doc).forEach(key => acc.add(key));
          return acc;
        }, new Set<string>());
        return {
          name: collection.name,
          properties: Array.from(properties),
        };
      }),
    );
    return collectionsWithDetails;
  }
}