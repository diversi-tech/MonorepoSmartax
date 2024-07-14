import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingStatus } from '../Models/billingStatus.model';
import { CreateBillingStatusDto, UpdateBillingStatusDto } from '../Models/dto/biliingStatus.dto';
import { Year } from '../Models/year.model';
import {  createYearDto } from '../Models/dto/year.dto';

@Injectable()
export class YearService {
  constructor(@InjectModel('Year') private readonly YearModel: Model<Year>) {}

  async createYear(createYearDto: createYearDto): Promise<Year> {
    const createYear =new this.YearModel(createYearDto);
    return createYear.save();
  }

  async deleteYear(id: string){
    return this.YearModel.findByIdAndDelete(id);
  }
 

  async getAllYear(): Promise<Year[]> {
    return this.YearModel.find().exec();
  }
}