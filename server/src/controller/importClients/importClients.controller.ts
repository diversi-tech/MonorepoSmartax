import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from '../../Models/client.model';
import { Model } from 'mongoose';
import { SensitiveData } from '../../Models/sensitiveData.model';
import { Tag } from '../../Models/tag.model';
import { User } from '../../Models/user.model';
import * as ExcelJS from 'exceljs';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('importClients')
@ApiBearerAuth()
export class importClientsController {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(SensitiveData.name) private readonly sensitiveDataModel: Model<SensitiveData>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const clients = await Promise.all(
      jsonData.map(async (row: any) => {
        const client = new this.clientModel({
          companyName: row['שם החברה'],
          firstName: row['שם פרטי'],
          lastName: row['שם משפחה'],
          contactPersonName: row['שם איש קשר'],
          tz: row['ת.ז.'],
          spouseName: row['שם בן/בת זוג'],
          spouseTZ: row['ת.ז. בן/בת זוג'],
          phone: row['טלפון'],
          whatsapp: row['וואטסאפ'],
          email: row['אימייל'],
          isPreferWhatsapp: row['העדפה לווטסאפ'] === 'כן',
          address: row['כתובת'],
          comments: row['הערות'],
          dateOfBirth: new Date(row['תאריך לידה']),
          isEmploysWorkers: row['מעסיק עובדים'] === 'כן',
          isWorkData: row['מידע על עבודה'] === 'כן',
          incomeTaxFileNumber: row['מספר תיק מס הכנסה'],
          incomeTaxDeductions_registerID: row['מספר רישום ניכויי מס'],
          VATFileNumber: row['מספר תיק מע"מ'],
          reports: row['סוג דוח'],
          isStatisticsData: row['מידע סטטיסטי'] === 'כן',
          referrerName: row['שם המפנה'],
          joinDate: new Date(row['תאריך הצטרפות']),
          isAccounter: row['עבר רואה חשבון'] === 'כן',
          isOpenAccountWithUs: row['פתח חשבון אצלנו'] === 'כן',
          tag: { color: 'black', text: ' ' },
        });
        return client.save();
      })
    );
    return clients;
  }

  @Get('download-template')
  async downloadTemplate(@Res() res: Response) {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('לקוחות');
      worksheet.views = [{ rightToLeft: true }];
  
      const columns = [
        'שם החברה', 'שם פרטי', 'שם משפחה', 'שם איש קשר', 'ת.ז.', 'שם בן/בת זוג',
        'ת.ז. בן/בת זוג', 'טלפון', 'וואטסאפ', 'אימייל', 'העדפה לווטסאפ', 'כתובת',
        'הערות', 'תאריך לידה', 'מעסיק עובדים', 'מידע על עבודה', 'מספר תיק מס הכנסה',
        'מספר רישום ניכויי מס', 'מספר תיק מע"מ', 'סוג דוח', 'מידע סטטיסטי', 'שם המפנה',
        'תאריך הצטרפות', 'עבר רואה חשבון', 'פתח חשבון אצלנו'
      ];
  
      worksheet.columns = columns.map(column => ({ header: column, key: column }));
      // worksheet.getCell(2['עבר רואה חשבון']).dataValidation = {
      //   type: 'list',
      //   formulae: ["כן", "לא"],
      //   showErrorMessage: true,
      //   errorTitle: 'Invalid input',
      //   error: "בחר 'כן' או 'לא'"
      // };
      // worksheet.getCell(2['טלפון']).numFmt = '000-000-0000';
  
      // worksheet.getCell(2['תאריך הצטרפות']).numFmt = 'dd/mm/yyyy';
      // worksheet.getRow(1).eachCell((cell, colNumber) => {
      //   cell.alignment = { readingOrder: 'rtl', horizontal: 'right' };
      // });
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'customers.xlsx',
      );
  
      await workbook.xlsx.write(res);
      res.end();
      
    } catch (error) {
      console.log(error);
      
    }
  }
}