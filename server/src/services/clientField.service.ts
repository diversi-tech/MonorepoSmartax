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

        if (!field || !value ) {
          throw new ValidationException('Missing required fields');
        }
        
        const createdClientField = new this.clientFieldModel({field , value });
        return await createdClientField.save();
    }

}