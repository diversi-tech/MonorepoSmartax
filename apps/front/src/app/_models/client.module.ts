import { SensitiveData } from "./sensitiveData.module";
import { Tag } from "./tag.module";
import { User } from "./user.module";

export enum ReportType {
  Monthly = 'מדווח חודשי',
  BiMonthly = 'דו חודשי',
  SemiAnnual = 'חצי שנתי',
  NotReporting = 'לא מדווח',
}
export interface Client {
  _id: string;
  companyName: string;
  firstName: string;
  lastName: string;
  contactPersonName: string;
  tz: string;
  spouseName: string;
  spouseTZ: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  encryptedPasswords: SensitiveData[];
  comments: string; lastUserUpdate: User;
  assignTo: User[];
  clientId: number;
  dateOfBirth: Date;
  payment: string;
  isEmploysWorkers: boolean;
  isWorkData: boolean;
  incomeTaxFileNumber: string;
  incomeTaxDeductions_registerID: string;
  VATFileNumber: string;
  reports: ReportType;
  isStatisticsData: boolean;
  referrerName: string;
  joinDate: Date;
  isAccounter: boolean;
  isOpenAccountWithUs: boolean;
  tag:Tag;
}
