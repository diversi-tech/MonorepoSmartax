import { Injectable } from '@angular/core';
import { WorkLog , WorkLogDocument} from '../Models/workLog.model';
import * as ExcelJS from 'exceljs';
import { CreateWorkLogDto, UpdateTimeEntryDto, UpdateWorkLogDto } from '../Models/dto/workLog.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

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

  async updateTimeEntry(id: string, entryId: string, updateTimeEntryDto: UpdateTimeEntryDto): Promise<WorkLog> {
    const workLog = await this.workLogModel.findById(id).exec();
    if (!workLog) {
      throw new NotFoundException('Work log not found');
    }
    const entryIndex = workLog.timeEntries.findIndex(entry => entry._id.toString() === entryId);
    if (entryIndex === -1) {
      throw new NotFoundException('Time entry not found');
    }

    workLog.timeEntries[entryIndex] = { ...workLog.timeEntries[entryIndex], ...updateTimeEntryDto };
    return workLog.save();
  }

  async findOne(id: string): Promise<WorkLog> {
    return this.workLogModel.findById(id).exec();
  }

  async findAll(): Promise<WorkLog[]> {
    return this.workLogModel.find().exec();
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
