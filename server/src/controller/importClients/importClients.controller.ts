import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { createReadStream } from 'fs';
import { join } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from '../../Models/client.model';
import { Model } from 'mongoose';
import { SensitiveData } from '../../Models/sensitiveData.model';
import { Tag } from '../../Models/tag.model';
import { User } from '../../Models/user.model';

@Controller('importClients')
export class importClientsController {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(SensitiveData.name) private readonly sensitiveDataModel: Model<SensitiveData>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
  ) {}

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
          // encryptedPasswords: row['סיסמאות מוצפנות'] ? row['סיסמאות מוצפנות'].split(',').map(id => id.trim()) : [],
          comments: row['הערות'],
          // lastUserUpdate: await this.userModel.findById(row['עדכון אחרון על ידי']),
          // assignTo: await Promise.all(row['הוקצה ל'] ? row['הוקצה ל'].split(',').map(id => this.userModel.findById(id.trim())) : []),
          // clientID: row['מספר לקוח'],
          dateOfBirth: new Date(row['תאריך לידה']),
          // payment: row['תשלום'],
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
  downloadTemplate(@Res() res: Response) {
    const templateData = [
      ['שם החברה', 'שם פרטי', 'שם משפחה', 'שם איש קשר', 'ת.ז.', 'שם בן/בת זוג', 'ת.ז. בן/בת זוג', 'טלפון', 'וואטסאפ', 'אימייל', 'העדפה לווטסאפ', 'כתובת', 'הערות', 'מספר לקוח', 'תאריך לידה', 'מעסיק עובדים', 'מידע על עבודה', 'מספר תיק מס הכנסה', 'מספר רישום ניכויי מס', 'מספר תיק מע"מ', 'סוג דוח', 'מידע סטטיסטי', 'שם המפנה', 'תאריך הצטרפות', 'עבר רואה חשבון', 'פתח חשבון אצלנו'],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename=template.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  }
}

















// // clients.controller.ts
// import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { Response } from 'express';
// import * as XLSX from 'xlsx';
// import { createReadStream } from 'fs';
// import { join } from 'path';
// import { InjectModel } from '@nestjs/mongoose';
// import { Client } from '../../Models/client.model';
// import { Model } from 'mongoose';
// import { SensitiveData } from '../../Models/sensitiveData.model';
// import { Tag } from '../../Models/tag.model';
// import { User } from '../../Models/user.model';

// @Controller('importClients')
// export class importClientsController {
//   constructor(
//     @InjectModel(Client.name) private readonly clientModel: Model<Client>,
//     @InjectModel(SensitiveData.name) private readonly sensitiveDataModel: Model<SensitiveData>,
//     @InjectModel(User.name) private readonly userModel: Model<User>,
//     @InjectModel(Tag.name) private readonly tagModel: Model<Tag>,
//   ) {}

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(@UploadedFile() file: Express.Multer.File) {
//     const workbook = XLSX.read(file.buffer, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     const clients = await Promise.all(
//       jsonData.map(async (row: any) => {
//         const client = new this.clientModel({
//           companyName: row['שם החברה'],
//           firstName: row['שם פרטי'],
//           lastName: row['שם משפחה'],
//           contactPersonName: row['שם איש קשר'],
//           tz: row['ת.ז.'],
//           spouseName: row['שם בן/בת זוג'],
//           spouseTZ: row['ת.ז. בן/בת זוג'],
//           phone: row['טלפון'],
//           whatsapp: row['וואטסאפ'],
//           email: row['אימייל'],
//           isPreferWhatsapp: row['העדפה לווטסאפ'],
//           address: row['כתובת'],
//          // encryptedPasswords: row['סיסמאות מוצפנות'] ? row['סיסמאות מוצפנות'].split(',').map(id => id.trim()) : [],
//           comments: row['הערות'],
//           lastUserUpdate: await this.userModel.findById(row['עדכון אחרון על ידי']),
//           assignTo: await Promise.all(row['הוקצה ל'] ? row['הוקצה ל'].split(',').map(id => this.userModel.findById(id.trim())) : []),
//           //clientID: row['מספר לקוח'],
//           dateOfBirth: new Date(row['תאריך לידה']),
//           payment: row['תשלום'],
//           isEmploysWorkers: row['מעסיק עובדים'],
//           isWorkData: row['מידע על עבודה'],
//           incomeTaxFileNumber: row['מספר תיק מס הכנסה'],
//           incomeTaxDeductions_registerID: row['מספר רישום ניכויי מס'],
//           VATFileNumber: row['מספר תיק מע"מ'],
//           reports: row['סוג דוח'],
//           isStatisticsData: row['מידע סטטיסטי'],
//           referrerName: row['שם המפנה'],
//           joinDate: new Date(row['תאריך הצטרפות']),
//           isAccounter: row['חשבונאי'],
//           isOpenAccountWithUs: row['פתח חשבון אצלנו'],
//           tag: await this.tagModel.findById(row['תגית']),
//         });
//         return client.save();
//       })
//     );

//     return clients;
//   }

//   @Get('download-template')
//   downloadTemplate(@Res() res: Response) {
//     const templateData = [
//       ['שם החברה', 'שם פרטי', 'שם משפחה', 'שם איש קשר', 'ת.ז.', 'שם בן/בת זוג', 'ת.ז. בן/בת זוג', 'טלפון', 'וואטסאפ', 'אימייל', '(כן/לא)העדפה לווטסאפ', 'כתובת', 'הערות', 'עדכון אחרון על ידי', 'הוקצה ל', 'תאריך לידה', 'תשלום', 'מעסיק עובדים', 'מידע על עבודה', 'מספר תיק מס הכנסה', 'מספר רישום ניכויי מס', 'מספר תיק מע"מ', 'סוג דוח', 'מידע סטטיסטי', 'שם המפנה', 'תאריך הצטרפות', 'חשבונאי', 'פתח חשבון אצלנו', 'תגית'],
//     ];
//     const worksheet = XLSX.utils.aoa_to_sheet(templateData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

//     const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

//     res.setHeader('Content-Disposition', 'attachment; filename=template.xlsx');
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.send(buffer);
//   }
// }
