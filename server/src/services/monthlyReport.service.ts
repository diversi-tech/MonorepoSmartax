
 import { Injectable, NotFoundException } from '@nestjs/common';
 import { InjectModel } from '@nestjs/mongoose';
 import { Model } from 'mongoose';
 import { CreateMonthlyReportDto } from '../Models/dto/monthlyReport.dto';
 import { MonthlyReport } from '../Models/monthlyReport.model';
 import { UpdateMonthlyReportDto } from '../Models/dto/monthlyReport.dto';

@Injectable()
export class MonthlyReportService {

    constructor(@InjectModel('MonthlyReport') private readonly MonthlyReportModel: Model<MonthlyReport>) {}

    async createMonthlyReport(createMonthlyReportDto: CreateMonthlyReportDto): Promise<MonthlyReport> {
        // const allStepFields = await this.stepFieldModel.find().exec();
        // const filteredStepFields = allStepFields.filter(stepField => stepField.type === 'החזרי מס');
                  
        const createdMonthlyReport = new this.MonthlyReportModel({
             ...createMonthlyReportDto,
        //      stepsList: filteredStepFields,
         });
                  
       return createdMonthlyReport.save();
    }
                  

    async updateMonthlyReport(id: string, updateMonthlyReportDto: UpdateMonthlyReportDto): Promise<MonthlyReport> {
      const updatedMonthlyReport = await this.MonthlyReportModel.findByIdAndUpdate(
        id,
        updateMonthlyReportDto,
        // { new: true }
      ).exec();
  
      if (!updatedMonthlyReport) {
        throw new NotFoundException('monthly report not found');
      }
  
      return updatedMonthlyReport.save();
    }

    async deleteMonthlyReport(id: string): Promise<void> {
      const result = await this.MonthlyReportModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('monthly reportnot found');
      }
    }

    async getAllMonthlyReport(): Promise<MonthlyReport[]> {
      return this.MonthlyReportModel.find().exec();
    }


}