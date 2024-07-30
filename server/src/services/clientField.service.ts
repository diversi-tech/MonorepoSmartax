import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientField } from '../Models/clientField.model';
import { Client } from '../Models/client.model';
import { ClientType } from '../Models/clientType.model';
import { Model, Types } from 'mongoose';
import { CreateClientFieldDto } from '../Models/dto/clientField.dto';
import { ValidationException } from '../common/exceptions/validation.exception';

@Injectable()
export class ClientFieldService {
    
    constructor(@InjectModel('ClientField') private readonly clientFieldModel: Model<ClientField>,
    @InjectModel('ClientType') private readonly clientTypeModel: Model<ClientType>,
    @InjectModel('Client') private readonly clientModel: Model<Client>) {}

    async createClientField(createClientFieldDto: CreateClientFieldDto , clientId: string): Promise<ClientField> {
      try{
        const ccfd = createClientFieldDto;
        console.log(clientId);
        
        const client = await this.clientModel.findById({_id:'669f95d2592b56c4f2be695b'});
        if (!client) {
          throw new Error('Client not found');
        }
        // if (!field || !value ) {
        //   throw new ValidationException('Missing required fields');
        // }
        console.log("service ClientField\n");
        console.log("---------------------------------------------");
        
        const ccf = new this.clientFieldModel(ccfd);
        console.log("V1");
        console.log(ccf);
        
        ccf.save();
        console.log("V2");      
          
        {client.clientFields.push( ccf?._id!);}

        console.log("ccf: "+ ccf);

        client.save();

        return ccf;
      }catch(err){
        console.log(err);
        
      }
    }
   
  async createClientFieldsByClientType( clientTypeId: string, clientId: string): Promise<ClientField[]> {
    const clientType = await this.clientTypeModel.findById(clientTypeId);
    if (!clientType) {
      throw new Error('ClientType not found');
    }

    const clientFields: ClientField[] = [];
    console.log(clientType);
    
    for (const field of clientType.fields) {
      const createClientFieldDto: CreateClientFieldDto = {
        field,
        value: '',
      };

      const createdClientField = await this.createClientField(createClientFieldDto, clientId);
      clientFields.push(createdClientField);
    }

    return clientFields;
  }

    async getALLClientFields(): Promise<ClientField[]> {
      return await this.clientFieldModel.find().exec();
  }
  
}