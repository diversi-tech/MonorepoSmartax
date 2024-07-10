import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocType } from '../Models/docType.model';
import { CreateDocTypeDto, UpdateDocTypeDto } from '../Models/dto/docTypes.dto';

@Injectable()
export class DocTypeService {
  constructor(@InjectModel('DocType') private readonly DocTypeModel: Model<DocType>) {}

  async createDocType(CreateDocTypeDto: CreateDocTypeDto): Promise<DocType> {
    const createdDocType = new this.DocTypeModel(CreateDocTypeDto);
    return createdDocType.save();
  }

  async updateDocType(id: string, updateDocTypeDto: UpdateDocTypeDto): Promise<DocType> {
    const updatedDocType = await this.DocTypeModel.findByIdAndUpdate(
      id,
      updateDocTypeDto,
      { new: true }
    ).exec();

    if (!updatedDocType) {
      throw new NotFoundException('DocType not found');
    }

    return updatedDocType;
  }

  async getAllDocType(): Promise<DocType[]> {
    return this.DocTypeModel.find().exec();
  }
  async getDocTypeByName(name:string): Promise<DocType> {
    return this.DocTypeModel.findOne({name:name}).exec();
  }
}