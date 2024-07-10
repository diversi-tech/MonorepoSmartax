import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { callTopicSchema } from '../Models/callTopicSchema.model';
import { callTopicSchemaDto } from '../Models/dto/callTopicSchema.dto';

@Injectable()
export class CallTopicService {
  constructor(@InjectModel(callTopicSchema.name) private readonly callTopicModel: Model<callTopicSchema>) {}

  async create(createCallTopicDto: callTopicSchemaDto): Promise<callTopicSchema> {
    const createdCallTopic = new this.callTopicModel(createCallTopicDto);
    return createdCallTopic.save();
  }
  async findAll(): Promise<callTopicSchema[]> {
    return this.callTopicModel.find().exec();
  }
}
