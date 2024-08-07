import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMonthlyReportDto } from '../Models/dto/monthlyReport.dto';
import { MonthlyReport } from '../Models/monthlyReport.model';
import { UpdateMonthlyReportDto } from '../Models/dto/monthlyReport.dto';
import { StepFieldMonth } from '../Models/stepFieldMonth.model';
import { Status } from '../Models/status.model';

@Injectable()
export class MonthlyReportService {
  constructor(
    @InjectModel('MonthlyReport')
    private readonly MonthlyReportModel: Model<MonthlyReport>,
    @InjectModel('StepFieldMonth')
    private readonly stepFieldMonthModel: Model<StepFieldMonth>,
    @InjectModel('Status') private readonly statusModel: Model<Status>
  ) {}

  async createMonthlyReport(
    createMonthlyReportDto: CreateMonthlyReportDto
  ): Promise<MonthlyReport> {
    const allStepFieldsMonth = await this.stepFieldMonthModel.find().exec();
    const allStatuses = await this.statusModel.find().exec();
    const createStatus = allStatuses.filter(
      (status) => status.name === 'TO DO'
    );
    let sortallStepFieldsMonth: Map<string, Array<StepFieldMonth>>=new Map<string,Array<StepFieldMonth>>();
    console.log(sortallStepFieldsMonth);
    
    allStepFieldsMonth.forEach((stepFieldMonth) => {
       if (!sortallStepFieldsMonth.has(stepFieldMonth.type)) {
        sortallStepFieldsMonth.set(stepFieldMonth.type,[]);
      }
      sortallStepFieldsMonth.get(stepFieldMonth.type).push(stepFieldMonth);
    });
    
    console.log(sortallStepFieldsMonth);
    
    const createdMonthlyReport = new this.MonthlyReportModel({
      ...createMonthlyReportDto,
      status: createStatus,
      monthlyReportFields: sortallStepFieldsMonth,
    });
    console.log(createdMonthlyReport, 'createdMonthlyReport');
    return createdMonthlyReport.save();
  }

  async updateMonthlyReport(
    id: string,
    updateMonthlyReportDto: UpdateMonthlyReportDto
  ): Promise<MonthlyReport> {
    const updatedMonthlyReport =
      await this.MonthlyReportModel.findByIdAndUpdate(
        id,
        updateMonthlyReportDto
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
    debugger;
    console.log('monthly', this.MonthlyReportModel.find().exec());
    return this.MonthlyReportModel.find().exec();
  }
}
