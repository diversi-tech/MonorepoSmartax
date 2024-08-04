
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaxRefundsDto } from '../Models/dto/taxRefunds.dto';
import { TaxRefunds } from '../Models/taxRefunds.model';
import { StepField } from '../Models/stepField.model';
import { UpdateTaxRefundsDto } from '../Models/dto/taxRefunds.dto';

@Injectable()
export class TaxRefundsService {

  constructor(
    @InjectModel('TaxRefunds') private readonly TaxRefundsModel: Model<TaxRefunds>,
    @InjectModel('StepField') private readonly stepFieldModel: Model<StepField>
  ) { }

  async createTaxRefunds(createTaxRefundsDto: CreateTaxRefundsDto): Promise<TaxRefunds> {
    const allStepFields = await this.stepFieldModel.find().exec();
    const filteredStepFields = allStepFields.filter(stepField => stepField.type === 'החזרי מס');

    const createdTaxRefunds = new this.TaxRefundsModel({
      ...createTaxRefundsDto,
      stepsList: filteredStepFields,
    });
    return createdTaxRefunds.save();
  }


  async updateTaxRefunds(id: string, updateTaxRefundsDto: UpdateTaxRefundsDto): Promise<TaxRefunds> {
    const updatedTaxRefunds = await this.TaxRefundsModel.findByIdAndUpdate(
      id,
      updateTaxRefundsDto,
    ).exec();

    if (!updatedTaxRefunds) {
      throw new NotFoundException('Tax refunds not found');
    }
    return updatedTaxRefunds.save();
  }

  async deleteTaxRefunds(id: string): Promise<void> {
    const result = await this.TaxRefundsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Tax refunds not found');
    }
  }

  async getAllTaxRefunds(): Promise<TaxRefunds[]> {
    return this.TaxRefundsModel.find().exec();
  }
}