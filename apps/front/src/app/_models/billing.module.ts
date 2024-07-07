import { BillingStatus } from './billingStatus.module';
import { Client } from './client.module';
import { User } from './user.module';

export interface Billing {
  client: Client;
  amount: string;
  status: BillingStatus;
  dueDate: Date;
  paidDate: Date;
  assignedTo: User;
}