import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Client } from '../Models/client.model';
import { SensitiveData } from '../Models/sensitiveData.model';
import { CreateSensitiveDataDto } from '../Models/dto/sensitiveData.dto';

@Injectable()
export class SensitiveDataService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(SensitiveData.name) private SensitiveDatatModel: Model<SensitiveData>
  ) {}

  async addEncryptedPasswordToClient(clientId: string, newEncryptedPassword: CreateSensitiveDataDto): Promise<Client> {
    const client = await this.clientModel.findById(clientId).exec();
    if (!client) {
      throw new Error('Client not found');
    }

 const encryptedPassword= new this.SensitiveDatatModel( newEncryptedPassword);
 const savedEncryptedPassword = (await encryptedPassword.save());
 client.encryptedPasswords.push(savedEncryptedPassword);    
    return client.save();
  }
}