
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientTypeDto, UpdateClientTypeDto } from '../Models/dto/clientType.dto';
import { ValidationException } from '../common/exceptions/validation.exception';
import { ClientType } from '../Models/clientType.model';

@Injectable()
export class ClientTypeService {

    constructor(@InjectModel('ClientType') private readonly clientTypeModel: Model<ClientType>) {}
    async createClientType(createClientTypeDto: CreateClientTypeDto): Promise<ClientType> {
        const { name, fields, tasks } = createClientTypeDto;

        if (!name || !fields || !tasks ) {
          throw new ValidationException('Missing required fields');
        }
        const createdClientType = new this.clientTypeModel({ name,fields,tasks });
        return await createdClientType.save();
    }

    async getALLClientTypes(): Promise<ClientType[]> {
        return await this.clientTypeModel.find().exec();
    }
    async searchClientType(id:string): Promise<ClientType> {
        const clientType= await this.clientTypeModel.findOne({"_id":id}).exec();
        if (!clientType) {
            throw new NotFoundException('ClientType not found');
          }
          return clientType;
    }
    async updateClientType(updateClientTypeDto: UpdateClientTypeDto): Promise<ClientType> {
        const {id, ...updateData } = updateClientTypeDto;
        const updatedClientType = await this.clientTypeModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedClientType) {
            throw new NotFoundException(`ClientType with ID ${id} not found`);
        }
        return updatedClientType;
    }

    async deleteClientType(id: string): Promise<boolean> {
        const deletedClientType = await this.clientTypeModel.findByIdAndDelete(id);
        if (!deletedClientType) {
            throw new NotFoundException(`ClientType with ID ${id} not found`);
        }
        return !!deletedClientType;
    }
}
