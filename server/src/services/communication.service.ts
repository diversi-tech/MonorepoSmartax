import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCommunicationDto, UpdateCommunicationDto } from '../Models/dto/communication.dto';
import { Communication } from '../Models/communication.model';
import { CommunicationArchiveService } from './communicationArchive.service';
import { CommunicationArchive } from '../Models/communicationArchive.model';
import { Client } from '../Models/client.model';
import { ObjectId } from 'typeorm';

@Injectable()
export class CommunicationsService {
  constructor(@InjectModel('Communication') private readonly communicationModel: Model<Communication>,
    @InjectModel('CommunicationArchive') private readonly communicationArchiveModel: Model<CommunicationArchive>,

    private readonly communicationArchiveService: CommunicationArchiveService,) { }


  async createCommunication(createCommunicationDto: CreateCommunicationDto): Promise<Communication> {
    const createdCommunication = new this.communicationModel(createCommunicationDto);
    return createdCommunication.save();
  }

  async updateCommunication(id: string, updateCommunicationDto: UpdateCommunicationDto): Promise<Communication> {
    const updatedCommunication = await this.communicationModel.findByIdAndUpdate(
      id,
      updateCommunicationDto,
      { new: true }
    ).exec();

    if (!updatedCommunication) {
      throw new NotFoundException('Communication not found');
    }

    return updatedCommunication;
  }

  // Upon deletion, the ommunication will be moved to an archive table
  async deleteCommunication(id: string) {

    const deletedCommunication = await this.communicationModel.findById(id).exec();

    if (!deletedCommunication) {
      throw new NotFoundException('Communication not found');
    }

    await this.communicationArchiveService.createArchiveCommunication(deletedCommunication, true);

    await this.communicationModel.findByIdAndDelete(id).exec();
    return deletedCommunication;
  }

  async getAllCommunications(): Promise<Communication[]> {
    return this.communicationModel.find().exec();
  }

  
  async getCommunicationsByClientId(clientId: string): Promise<Communication[]> {
    console.log('Searching for communications with client ID:', clientId);
    const communications = await this.communicationModel.find({ client: clientId }).exec();
    console.log('Communications found:', communications);
    return communications;
  }
  
  

  //Transferring old ommunicationד to an archive table
  async deletingOldCommunications(): Promise<Communication[]> {

    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    const oldCommunications = await this.communicationModel.find({
      date: { $lt: twoYearsAgo },
    }).exec();

    if (oldCommunications.length > 0) {
      for (const communication of oldCommunications) {

        if (!communication) {
          throw new NotFoundException('Communication not found');
        }
        await this.communicationArchiveService.createArchiveCommunication(communication, false);
      }
      await this.communicationModel.deleteMany({ _id: { $in: oldCommunications.map(comm => comm._id) } }).exec();
    }

    return oldCommunications;
  }


}
