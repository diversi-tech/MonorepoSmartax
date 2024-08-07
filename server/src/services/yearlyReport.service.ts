
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateYearlyReportDto } from '../Models/dto/yearlyReport.dbo';
import { YearlyReport } from '../Models/yearlyReports.model';
import { StepField } from '../Models/stepField.model';
import { UpdateYearlyReportDto } from '../Models/dto/yearlyReport.dbo';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class YearlyReportService {

  constructor(
    @InjectModel('YearlyReport') private readonly YearlyReportModel: Model<YearlyReport>,
    @InjectModel('StepField') private readonly stepFieldModel: Model<StepField>
  ) { }

  async createYearlyReport(createYearlyReportDto: CreateYearlyReportDto): Promise<YearlyReport> {
    try {
      const existingYearlyReport = await this.YearlyReportModel.findOne({
        idClient: createYearlyReportDto.idClient,
        yearReport: createYearlyReportDto.yearReport
      }).exec();

      if (existingYearlyReport) {
        throw new HttpException('A yearly report with the same client ID and year already exists.', HttpStatus.BAD_REQUEST);
      }

      const allStepFields = await this.stepFieldModel.find().exec();
      const filteredStepFields = allStepFields.filter(stepField => stepField.type === 'yearly-report');

      const createdYearlyReport = new this.YearlyReportModel({
        ...createYearlyReportDto,
        stepsList: filteredStepFields,
      });

      return await createdYearlyReport.save();
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateYearlyReport(id: string, updateYearlyReportDto: UpdateYearlyReportDto): Promise<YearlyReport> {
    try {
      const existingYearlyReport = await this.YearlyReportModel.findOne({
        idClient: updateYearlyReportDto.idClient,
        yearReport: updateYearlyReportDto.yearReport
      }).exec();

      if (existingYearlyReport) {
        throw new HttpException('A yearly report with the same client ID and year already exists.', HttpStatus.BAD_REQUEST);
      }
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
    catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
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