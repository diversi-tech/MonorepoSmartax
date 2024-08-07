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
    @InjectModel(SensitiveData.name)
    private SensitiveDatatModel: Model<SensitiveData>
  ) {}

  async addEncryptedPasswordToClient(
    clientId: string,
    newEncryptedPassword: CreateSensitiveDataDto
  ): Promise<Client> {
    try {
      const client = await this.clientModel.findById(clientId).exec();
      if (!client) {
        throw new Error('Client not found');
      }
      const highestNumber = await this.getHighestNumber();
      const newNumber = (parseInt(highestNumber, 10) + 1).toString();
      const encryptedPassword = new this.SensitiveDatatModel({
        ...newEncryptedPassword,
        number: newNumber,
      });
      const savedEncryptedPassword = await encryptedPassword.save();
      client.encryptedPasswords.push(savedEncryptedPassword.id);
      return client.save();
      
    } catch (error) {
      console.log(error);
    }
  }
  async getEncryptedPasswordToClient(
    sensDatatId: string
  ): Promise<SensitiveData> {
    try {
      const sensData = await this.SensitiveDatatModel.findById(
        sensDatatId
      ).exec();
      return sensData.toObject({ getters: true });   
    } catch (error) {
      console.log(error);
    }
  }
  async getHighestNumber() {
    try {
      const sensData = await this.SensitiveDatatModel.find().exec();
      if (sensData.length === 0) {
        return null;
      }
      const highestNumber = sensData
        .map((sens) => parseInt(sens.number, 10))
        .filter((clientID) => !isNaN(clientID))
        .reduce((max, current) => (current > max ? current : max), 0);
      return highestNumber.toString();
    } catch (err) {
      console.error('Error finding highest number:', err);
    }
  }
}
