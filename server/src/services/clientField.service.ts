import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientField } from '../Models/clientField.model';
import { Model } from 'mongoose';
import { CreateClientFieldDto } from '../Models/dto/clientField.dto';
import { ValidationException } from '../common/exceptions/validation.exception';

@Injectable()
export class ClientFieldService {
    
    constructor(@InjectModel('ClientField') private readonly clientFieldModel: Model<ClientField>) {}

    async createClientField(createClientFieldDto: CreateClientFieldDto): Promise<ClientField> {
        const { field , value} = createClientFieldDto;

        // if (!field || !value ) {
        //   throw new ValidationException('Missing required fields');
        // }
        console.log("service ClientField\n");
        
        console.log(typeof(field));
        console.log(JSON.stringify(field)+"\n");
        
        console.log(typeof(field.type_));

        console.log(field.type_);
        
        
        const ccf = new this.clientFieldModel(createClientFieldDto);
        
        return await ccf.save();
    }

    async getALLClientFields(): Promise<ClientField[]> {
      return await this.clientFieldModel.find().exec();
  }
  
}