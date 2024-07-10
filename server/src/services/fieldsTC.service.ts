
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientTypeDto, UpdateClientTypeDto } from '../Models/dto/clientType.dto';
import { ValidationException } from '../common/exceptions/validation.exception';

import { FieldsTC } from '../Models/fieldsCT.model';
import { CreateFieldsTCDto, UpdateFieldsCTDto } from '../Models/dto/fieldsCT.dto';

@Injectable()
export class FieldsTCService {

    constructor(@InjectModel('FieldsTC') private readonly fieldsTCModel: Model<FieldsTC>) {}
    async createFieldsTC(CreateFieldsTCDto: CreateFieldsTCDto): Promise<FieldsTC> {
        const { key,type} = CreateFieldsTCDto;

        if (!key || !type ) {
          throw new ValidationException('Missing required fields');
        }
        const createFieldsTC = new this.fieldsTCModel({ key,type });
        return await createFieldsTC.save();
    }

    async getALLFieldsTC(): Promise<FieldsTC[]> {
        return await this.fieldsTCModel.find().exec();
    }
    async searchFieldsTC(id:string): Promise<FieldsTC> {
        const fieldsTC= await this.fieldsTCModel.findOne({"_id":id}).exec();
        if (!fieldsTC) {
            throw new NotFoundException('FieldsTC not found');
          }
          return fieldsTC;
    }
    async updateFieldsTC(updateFieldsTCDto: UpdateFieldsCTDto): Promise<FieldsTC> {
        const {id, ...updateData } = updateFieldsTCDto;
        const updatedFieldsTC = await this.fieldsTCModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFieldsTC) {
            throw new NotFoundException(`FieldsTC with ID ${id} not found`);
        }
        return updatedFieldsTC;
    }

    async deleteFieldsTC(id: string): Promise<boolean> {
        const deletedFieldsTC = await this.fieldsTCModel.findByIdAndDelete(id);
        if (!deletedFieldsTC) {
            throw new NotFoundException(`FieldsTC with ID ${id} not found`);
        }
        return !!deletedFieldsTC;
    }
}
