import { Client } from './client.module';

export interface Doc {
    fileId: string;
    name: string;
    viewLink: string;
    client: Client;
    date: Date;
    status: string;
}