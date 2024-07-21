import { Client } from './client.module';
import { DocType } from './docType.module';

export interface Doc {
    _id: string;
    name: string;
    viewLink: string;
    client: Client;
    date: Date;
    DocType: DocType;
    status: string;
}