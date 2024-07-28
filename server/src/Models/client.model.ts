import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SensitiveData } from './sensitiveData.model';
import { User } from './user.model';
import { decrypt } from '../services/encrypt.service';
import { Tag } from './tag.model';
import { ClientType } from './clientType.model';

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
  isPreferWhatsapp: boolean;
  @Prop()
  address: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SensitiveData' }] })
  encryptedPasswords: [{ type: Types.ObjectId; ref: 'SensitiveData' }];

  @Prop()
  comments: string;

  @Prop({ type: Types.ObjectId, ref: 'User'})
  lastUserUpdate: User;

  @Prop({ type: Types.ObjectId, ref: 'User'})
  assignTo: User[];

  @Prop({ unique: true })
  clientID: string;

  @Prop()
  dateOfBirth: Date;
  @Prop()
  payment: Types.ObjectId;
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
  @Prop()
  tag: Tag;

  @Prop()
  clientTypes: ClientType[];
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'ClientField' }] })
  clientFields: Types.ObjectId
}
export const ClientModel = SchemaFactory.createForClass(Client);
