
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../Models/client.model';
import { CreateClientDto ,UpdateClientDto } from '../Models/dto/client.dto';
import { ValidationException } from '../common/exceptions/validation.exception';

@Injectable()
export class ClientService {

    constructor(@InjectModel('Client') private readonly clientModel: Model<Client>) {}

    async createClient(createClientDto: CreateClientDto): Promise<Client> {
        // const { name, contactInfo, businessName, source, status, createdDate, tag } = createClientDto;

        // if (!name || !contactInfo || !businessName || !source || !status || !createdDate || !tag) {
        //   throw new ValidationException('Missing required fields');
        // }
        
        const createdClient = new this.clientModel(createClientDto);
        return await createdClient.save();
    }

    async getAllClients(): Promise<Client[]> {
        return await this.clientModel.find().exec();
    }

    async searchClient(id:string): Promise<Client> {
        const client= await this.clientModel.findOne({"id":id}).exec();
        if (!client) {
            throw new NotFoundException('Client not found');
          }
          return client;
    }

    async updateClient(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
        const updatedClient = await this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec();
        if (!updatedClient) {
            throw new NotFoundException(`Client with customerID ${id} not found`);
        }
        return updatedClient;
    }

    async deleteClient(id: string): Promise<boolean> {
        const deletedClient = await this.clientModel.findByIdAndDelete(id);
        if (!deletedClient) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return !!deletedClient;
    }
}
