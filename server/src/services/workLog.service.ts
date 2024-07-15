import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
import { CreateWorkLogDto, UpdateWorkLogDto } from '../Models/dto/workLog.dto';
import { WorkLog, WorkLogDocument } from '../Models/workLog.model';

@Injectable()
export class WorkLogService {
  constructor(@InjectModel(WorkLog.name) private workLogModel: Model<WorkLogDocument>) {}

  async create(createWorkLogDto: CreateWorkLogDto): Promise<WorkLog> {
    const createdWorkLog = new this.workLogModel(createWorkLogDto);
    return createdWorkLog.save();
  }

  async update(id: string, updateWorkLogDto: UpdateWorkLogDto): Promise<WorkLog> {
    const updatedWorkLog = await this.workLogModel.findByIdAndUpdate(id, updateWorkLogDto, { new: true });
    return updatedWorkLog;
  }

  async findOne(id: string): Promise<WorkLog> {
    const workLog = await this.workLogModel.findById(id).exec();
    return workLog;
  }

  async findAll(): Promise<WorkLog[]> {
    const workLogs = await this.workLogModel.find().exec();
    return workLogs;
  }

  async exportWorkLogs(month: number, year: number): Promise<Buffer> {
    const workLogs = await this.workLogModel.find({
      date: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0),
      },
    }).exec();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Work Logs');

    worksheet.columns = [
      { header: 'שם עובד', key: 'employeeId', width: 15 },
      { header: 'תאריך', key: 'date', width: 20 },
      { header: 'שעת כניסה', key: 'checkIn', width: 15 },
      { header: 'שעת יציאה', key: 'checkOut', width: 15 },
      { header: 'מס שעות עבודה', key: 'hoursWorked', width: 15 },
    ];

    workLogs.forEach((log) => {
      log.timeEntries.forEach((entry) => {
        worksheet.addRow({
          employeeId: log.employeeId,
          date: log.date.toLocaleDateString('he-IL'),
          checkIn: entry.checkIn.toLocaleTimeString('he-IL'),
          checkOut: entry.checkOut ? entry.checkOut.toLocaleTimeString('he-IL') : '',
          hoursWorked: entry.hoursWorked,
        });
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
