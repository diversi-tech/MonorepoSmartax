
import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { CreateClientTypeDto, UpdateClientTypeDto } from '../Models/dto/clientType.dto';
import { ValidationException } from '../common/exceptions/validation.exception';

import { Field } from '../Models/field.model';
import { CreateFieldDto, UpdateFieldDto } from '../Models/dto/field.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FieldService {

    constructor(@InjectModel('Field') private readonly fieldModel: Model<Field>) {}
    async createField(CreateFieldDto: CreateFieldDto): Promise<Field> {
        const { key,type_} = CreateFieldDto;

        if (!key || !type_ ) {
          throw new ValidationException('Missing required fields');
        }
        const createField = new this.fieldModel({ key,type_ });
        return await createField.save();
    }

    async getALLField(): Promise<Field[]> {
        return await this.fieldModel.find().exec();
    }
    async searchField(id:string): Promise<Field> {
        const field= await this.fieldModel.findOne({"_id":id}).exec();
        if (!field) {
            throw new NotFoundException('FieldsTC not found');
          }
          return field;
    }
    async updateField(updateFieldDto: UpdateFieldDto): Promise<Field> {
        const {id, ...updateData } = updateFieldDto;
        const updatedField = await this.fieldModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedField) {
            throw new NotFoundException(`Field with ID ${id} not found`);
        }
        return updatedField;
    }

    async deleteField(id: string): Promise<boolean> {
        const deletedField = await this.fieldModel.findByIdAndDelete(id);
        if (!deletedField) {
            throw new NotFoundException(`Field with ID ${id} not found`);
        }
        return !!deletedField;
    }
}
