import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Communication } from '../Models/communication.model';
import { CommunicationArchive } from '../Models/communicationArchive.model';
import { CreateCommunicationArchiveDto ,UpdateCommunicationArchiveDto} from '../Models/dto/communicationArchive.dto';

@Injectable()
export class CommunicationArchiveService {
    constructor(@InjectModel('CommunicationArchive') private readonly communicationArchiveModel: Model<CommunicationArchive>) {}
  
    
    
    async createArchiveCommunication(communication: Communication, isDeleted: boolean = false): Promise<CommunicationArchive> {
        
        const communicationArchive = new this.communicationArchiveModel({
          client: communication.client,
          date: communication.date,
          type: communication.type,
          summary: communication.summary,
          isDeleted: isDeleted,
        });
    
        return communicationArchive.save();
      }
    

    async getAllCommunications(): Promise<CommunicationArchive[]> {
        return this.communicationArchiveModel.find().exec();
      }
  
}
    