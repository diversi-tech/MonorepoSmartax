import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Client } from '../Models/client.model';
import { CreateClientDto, UpdateClientDto } from '../Models/dto/client.dto';
import { ValidationException } from '../common/exceptions/validation.exception';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>
  ) {}

  // const usersIdObjectIds = usersId.map(id => new Types.ObjectId(id));
  // const createMeet = new this.MeetModel({
  //     address,
  //     date, beginningTime,
  //     endTime,
  //     usersId:usersIdObjectIds,
  //     clientDepartments:clientDepartmentsObjectIds,
  //     googleId});
  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const existingClient = await this.clientModel.findOne({ tz: createClientDto.tz }).exec();
    if (existingClient) {
      throw new Error('Client with this ID already exists.');
    }
      const highestClientID = await this.getHighestClientID();
      const newClientID = (parseInt(highestClientID, 10) + 1).toString();

        const clientFieldIdObjectIds = createClientDto.clientFields.map(id => new Types.ObjectId(id));

      const createdClient = new this.clientModel({
        ...createClientDto,
        clientID: newClientID,
        clientFields: clientFieldIdObjectIds
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
  // async searchClient(id: string): Promise<Client> {
  //   // console.log(id);
  //   // const validObjectId = new mongoose.Types.ObjectId(id);
  //   // const client = await this.clientModel.findById({ _id: validObjectId }).exec();
  //   // console.log(client);
  //   // console.log("etty");
  //   // if (!client) {
  //   //   throw new NotFoundException('Client not found');
  //   // }
  //   // return client;
  //   try {
  //     // בדוק שה-ID הוא ObjectId חוקי
  //     if (!Types.ObjectId.isValid(id)) {
  //       console.error('Invalid ID format:', id);
  //       throw new NotFoundException('Invalid ID format');
  //     }

  //     console.log("Searching for client with ID:", id);
  //     const client = await this.clientModel.findById(id).exec();
  //     console.log("Client found:", client);

  //     if (!client) {
  //       console.error('Client not found with ID:', id);
  //       throw new NotFoundException('Client not found');
  //     }
  //     return client;
  //   } catch (error) {
  //     console.error("Error while searching for client:", error.message);
  //     throw new NotFoundException('Client not found');
  //   }
  
  // }

  async searchClient(id: string): Promise<Client> {
    try {
      const client = await this.clientModel.findOne({ _id: id }).exec();
      console.log(client);
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      return client;
    }catch(err){
      console.log(err);
      
    }
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto
  ): Promise<Client> {
    try {

      const existingClient = await this.clientModel.findOne({ tz: updateClientDto.tz }).exec();
      if (existingClient) {
        throw new Error('Client with this ID already exists.');
      }
      const updatedClient = await this.clientModel
        .findByIdAndUpdate(id, updateClientDto, { new: true })
        .exec();
      if (!updatedClient) {
        throw new NotFoundException(`Client with customerID ${id} not found`);
      }
      return updatedClient;    
    } catch (error) {
      console.log(error);
      
    }
  }

  async deleteClient(id: string): Promise<boolean> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id);
    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return !!deletedClient;
  }
}
