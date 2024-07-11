import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { SensitiveData } from './sensitiveData';
import { User } from './user.model';

export enum ReportType {
  Monthly = 'מדווח חודשי',
  BiMonthly = 'דו חודשי',
  SemiAnnual = 'חצי שנתי',
  NotReporting = 'לא מדווח',
}

@Schema()
export class Client extends Document {

  @Prop()
  companyName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  contactPersonName: string;

  @Prop()
  tz: string;

  @Prop()
  spouseName: string;

  @Prop()
  spouseTZ: string;

  @Prop()
  phone: string;

  @Prop()
  whatsapp: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  encryptedPasswords: SensitiveData[];

  @Prop()
  comments: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  lastUserUpdate: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignTo: User[];

  static clientId = 1000;

  // @Prop({ default: Client.generateClientId, })
  // clientID: number;

  // static generateClientId() {
  //   let newClientId = this.clientId + 1;
  //   return newClientId;
  // }

  @Prop()
  dateOfBirth: Date;

  @Prop()
  payment: ObjectId;

  @Prop()
  isEmploysWorkers: boolean;

  @Prop()
  isWorkData: boolean;

  @Prop()
  incomeTaxFileNumber: string;

  @Prop()
  incomeTaxDeductions_registerID: string;

  @Prop()
  VATFileNumber: string;

  @Prop()
  reports: ReportType;

  @Prop()
  isStatisticsData: boolean;

  @Prop()
  referrerName: string;

  @Prop()
  joinDate: Date;

  @Prop()
  isAccounter: boolean;

  @Prop()
  isOpenAccountWithUs: boolean;
}

export const ClientModel = SchemaFactory.createForClass(Client);