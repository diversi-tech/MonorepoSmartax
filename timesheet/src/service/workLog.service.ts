import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';
import { CreateWorkLogDto, UpdateWorkLogDto, UpdateTimeEntryDto } from '../dto/workLog.dto';
import { WorkLog, WorkLogDocument } from '../model/workLog.model';
@Injectable()
export class WorkLogService {
  constructor(@InjectModel(WorkLog.name) private workLogModel: Model<WorkLogDocument>) {}
  async create(createWorkLogDto: CreateWorkLogDto): Promise<WorkLog> {
    const createdWorkLog = new this.workLogModel(createWorkLogDto);
    return createdWorkLog.save();
  }
  async update(id: string, updateWorkLogDto: UpdateWorkLogDto): Promise<WorkLog> {
    const updatedWorkLog = await this.workLogModel.findByIdAndUpdate(id, {
      $set: {
        timeEntries: updateWorkLogDto.timeEntries,
        hoursWorked: updateWorkLogDto.hoursWorked,
      },
    }, { new: true });
    if (!updatedWorkLog) {
      throw new NotFoundException(`WorkLog #${id} not found`);
    }
    return updatedWorkLog;
  }
  async updateTimeEntry(id: string, updateTimeEntryDto: UpdateTimeEntryDto): Promise<WorkLog> {
    const workLog = await this.workLogModel.findById(id);
    if (!workLog) {
      throw new NotFoundException('Work log not found');
    }
    const entryIndex = workLog.timeEntries.findIndex(entry => entry._id && entry._id.toString() === updateTimeEntryDto._id);
    if (entryIndex === -1) {
      throw new NotFoundException('Time entry not found');
    }
    // Update the specific time entry
    if (updateTimeEntryDto.checkIn) {
      workLog.timeEntries[entryIndex].checkIn = updateTimeEntryDto.checkIn;
    }
    if (updateTimeEntryDto.checkOut) {
      workLog.timeEntries[entryIndex].checkOut = updateTimeEntryDto.checkOut;
    }
    if (updateTimeEntryDto.hoursWorked) {
      workLog.timeEntries[entryIndex].hoursWorked = updateTimeEntryDto.hoursWorked;
    }
    await workLog.save();
    return workLog;
  }
  async findOne(id: string): Promise<WorkLog | null> {
    return this.workLogModel.findById(id).exec();
  }
  async findAll(): Promise<WorkLog[]> {
    const workLogs = await this.workLogModel.find().exec();
    return workLogs;
  }
  async findByEmployeeId(employeeId: string): Promise<WorkLog[]> {
    return this.workLogModel.find({ employeeId }).exec();
  }
  async exportWorkLogs(month: number, year: number): Promise<Buffer> {
    console.log(`Searching work logs for month: ${month}, year: ${year}`);
    const workLogs = await this.workLogModel.find({
      date: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0),
      },
    }).exec();
    console.log(`Found work logs: ${workLogs.length}`);
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
    this.addSummaryToWorksheet(worksheet, workLogs);
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
  async exportWorkLogsForEmployee(employeeId: string, month: number, year: number): Promise<Buffer> {
    console.log(`Searching work logs for employeeId: ${employeeId}, month: ${month}, year: ${year}`);
    const workLogs = await this.workLogModel.find({
      employeeId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0),
      },
    }).exec();
    console.log(`Found work logs for employeeId: ${employeeId}: ${workLogs.length}`);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Work Logs');
    worksheet.columns = [
      { header: 'Employee ID', key: 'employeeId', width: 15 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Check In', key: 'checkIn', width: 15 },
      { header: 'Check Out', key: 'checkOut', width: 15 },
      { header: 'Hours Worked', key: 'hoursWorked', width: 15 },
    ];
    workLogs.forEach((log) => {
      log.timeEntries.forEach((entry) => {
        worksheet.addRow({
          employeeId: log.employeeId,
          date: log.date.toLocaleDateString('en-US'),
          checkIn: entry.checkIn ? entry.checkIn.toLocaleTimeString('en-US') : '',
          checkOut: entry.checkOut ? entry.checkOut.toLocaleTimeString('en-US') : '',
          hoursWorked: entry.hoursWorked,
        });
      });
    });
    this.addSummaryToWorksheet(worksheet, workLogs);
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
  private addSummaryToWorksheet(worksheet: ExcelJS.Worksheet, workLogs: any[]) {
    // חישוב סך השעות ומספר הימים בחודש
    let totalHoursWorked = 0;
    const daysWorked = new Set(); // Set כדי למנוע ימים כפולים חישוב מספר הימים שעבד העובד
    workLogs.forEach((log) => {
      log.timeEntries.forEach((entry) => {
        totalHoursWorked += entry.hoursWorked;
        daysWorked.add(log.date.getDate());
      });
    });
    const summaryRow = worksheet.addRow({
      employeeId: 'כלל השעות שעבד העובד בחודש',
      date: '',
      checkIn: '',
      checkOut: '',
      hoursWorked: totalHoursWorked.toFixed(2), // מעגל את המשתנה
    });
    // סגנון עבור שורת הסיכום
    summaryRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' }, // צבע צהוב
      };
      cell.font = {
        bold: true, // טקסט מודגש
      };
    });
    const summaryRow2 = worksheet.addRow({
      employeeId: 'מספר הימים שעבד העובד בחודש',
      date: '',
      checkIn: '',
      checkOut: '',
      hoursWorked: daysWorked.size, // עבודה הוא עבד
    });
    summaryRow2.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00' }, // צבע צהוב
      };
      cell.font = {
        bold: true, // טקסט מודגש
      };
    });
      }
}
