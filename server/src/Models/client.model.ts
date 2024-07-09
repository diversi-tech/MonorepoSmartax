import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
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

  @Prop({
    required: true,
    unique: true,
    default: 1000,
    validate: {
      validator: function (v) {
        return Number.isInteger(v) && v >= 1000 && v <= 9999;
      },
      message: props => `${props.value} is not a valid customerID!`
    }
  })
  _id: number;

  @Prop()
  isEmploysWorkers: boolean;

  @Prop()
  isWorkData: boolean;

  @Prop()
  incomeTaxFileNumber: string;

  @Prop()
  VATFileNumber: string;

  @Prop()
  reports: ReportType;

  @Prop()
  isStatisticsData: boolean;

  @Prop()
  referrerName: string;

  @Prop()
  entryDate: Date;

  @Prop()
  isAccountant: boolean;

  @Prop()
  isOpenAccountWithUs: boolean;
}

export const ClientModel = SchemaFactory.createForClass(Client);