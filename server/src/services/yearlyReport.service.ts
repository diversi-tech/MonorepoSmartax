
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidationException } from 'server/src/common/exceptions/validation.exception';
import { CreateYearlyReportDto } from '../Models/dto/yearlyReport.dbo';
import { YearlyReport } from '../Models/yearlyReports.model';
import { StepField } from '../Models/stepField.model';
import { UpdateYearlyReportDto } from '../Models/dto/yearlyReport.dbo';

@Injectable()
export class YearlyReportService {

    constructor(@InjectModel('YearlyReport') private readonly YearlyReportModel: Model<YearlyReport>,
                 @InjectModel('StepField')private readonly stepFieldModel: Model<StepField>) {}

    async createYearlyReport(createYearlyReportDto: CreateYearlyReportDto): Promise<YearlyReport> {
      const allStepFields = await this.stepFieldModel.find().exec();
      const createdYearlyReport = new this.YearlyReportModel({
        ...createYearlyReportDto,
        stepsList: allStepFields,
      });
      return createdYearlyReport.save();
    }

    async updateYearlyReport(id: string, updateYearlyReportDto: UpdateYearlyReportDto): Promise<YearlyReport> {
      const updatedYearlyReport = await this.YearlyReportModel.findByIdAndUpdate(
        id,
        updateYearlyReportDto,
        // { new: true }
      ).exec();
  
      if (!updatedYearlyReport) {
        throw new NotFoundException('Yearly Report not found');
      }
  
      return updatedYearlyReport.save();
    }

    async deleteYearlyReport(id: string): Promise<void> {
      const result = await this.YearlyReportModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Yearly Report not found');
      }
    }

    async getAllYearlyReports(): Promise<YearlyReport[]> {
      return this.YearlyReportModel.find().exec();
    }


}