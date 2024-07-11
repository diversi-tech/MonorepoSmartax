// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Client } from './schemas/client.schema';

// @Injectable()
// export class ClientService {
//   constructor(
//     @InjectModel(client.firstName) private clientModel: Model<Client>,
//   ) {}

//   async addEncryptedPasswordToClient(clientId: string, encryptedPassword: SensitiveData): Promise<Client> {
//     const client = await this.clientModel.findById(clientId).exec();
//     if (!client) {
//       throw new Error('Client not found');
//     }

//     client.encryptedPasswords.push(encryptedPassword);
//     return client.save();
//   }
// }