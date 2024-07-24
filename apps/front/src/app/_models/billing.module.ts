import { BillingStatus } from './billingStatus.module';
import { Client } from './client.module';
import { PaymentMethod } from './paymentMethod.module';
import { User } from './user.module';

export interface Billing {
  _id: string;
  date: Date;
  amount: string;
  paymentMethod: PaymentMethod;
  ifRreturn: boolean;
  assignedTo: User;
}