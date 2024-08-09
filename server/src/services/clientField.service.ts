import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientField } from '../Models/clientField.model';
import { Model } from 'mongoose';
import { CreateClientFieldDto } from '../Models/dto/clientField.dto';

@Injectable()
export class ClientFieldService {

  constructor(
    @InjectModel('ClientField') private readonly clientFieldModel: Model<ClientField>
  ) { }

  async createClientField(createClientFieldDto: CreateClientFieldDto): Promise<ClientField> {
    const { field, value } = createClientFieldDto;
    const ccf = new this.clientFieldModel(createClientFieldDto);
    return await ccf.save();
  }

  async getALLClientFields(): Promise<ClientField[]> {
    return await this.clientFieldModel.find().exec();
  }
}