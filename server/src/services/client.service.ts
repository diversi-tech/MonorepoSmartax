import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../Models/client.model';
import { CreateClientDto, UpdateClientDto } from '../Models/dto/client.dto';
import { ValidationException } from '../common/exceptions/validation.exception';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const highestClientID = await this.getHighestClientID();
      const newClientID = (parseInt(highestClientID, 10) + 1).toString();
      const createdClient = new this.clientModel({
        ...createClientDto,
        clientID: newClientID,
      });
      return await createdClient.save();
    } catch (err) {
      console.log(err);
    }
  }

  async getAllClients(): Promise<Client[]> {
    try {
      return await this.clientModel
        .find()
        .exec();
    } catch (error) {
      console.log(error);
    }
  }
  async getHighestClientID() {
    try {
      const clients = await this.clientModel.find().exec();

      if (clients.length === 0) {
        console.log('No clients found');
        return null;
      }

      const highestClientID = clients
        .map((client) => parseInt(client.clientID, 10))
        .filter((clientID) => !isNaN(clientID))
        .reduce((max, current) => (current > max ? current : max), 0);

      console.log('Highest clientID:', highestClientID.toString());
      return highestClientID.toString();
    } catch (err) {
      console.error('Error finding highest clientID:', err);
    }
  }
  async searchClient(id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ id: id }).exec();
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto
  ): Promise<Client> {
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();
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
