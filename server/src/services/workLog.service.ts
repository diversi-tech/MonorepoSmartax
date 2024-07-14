import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
import { WorkLog, WorkLogDocument } from '../Models/workLog.model';
import { CreateWorkLogDto ,UpdateWorkLogDto} from '../Models/dto/workLog.dto';

@Injectable()
export class WorkLogService {
  constructor(@InjectModel(WorkLog.name) private workLogModel: Model<WorkLogDocument>) {}

  async create(createWorkLogDto: CreateWorkLogDto): Promise<WorkLog> {
    const createdWorkLog = new this.workLogModel(createWorkLogDto);
    return createdWorkLog.save();
  }

  async update(id: string, updateWorkLogDto: UpdateWorkLogDto): Promise<WorkLog> {
    return this.workLogModel.findByIdAndUpdate(id, updateWorkLogDto, { new: true });
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
      { header: 'מס שעות עבודה ', key: 'hoursWorked', width: 15 },
    ];

    workLogs.forEach((log) => {
      worksheet.addRow({
        employeeId: log.employeeId,
        date: log.date.toLocaleDateString('he-IL'), // הפורמט הנכון לתאריך
        checkIn: log.checkIn ? log.checkIn.toLocaleTimeString('he-IL') : '', // הפורמט הנכון לשעת כניסה
        checkOut: log.checkOut ? log.checkOut.toLocaleTimeString('he-IL') : '', // הפורמט הנכון לשעת יציאה
        hoursWorked: log.hoursWorked,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
