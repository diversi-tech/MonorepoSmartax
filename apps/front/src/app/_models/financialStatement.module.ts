import { Client } from "./client.module";
import { Status } from "./status.module";
import { StepField } from "./stepField.module";
import { User } from "./user.module";
import { Year } from "./year.module";

export interface FinancialStatement {
    _id?: string;
    isInterested: boolean;
    client: Client;
    assignee: User[];
    lastEmployeeWhoTreated: User;
    year: Year;
    date: Date;
    price: number;
    paymentAmountPaid: number;
    balanceDue: number;
    entityType: string;
    stepsList: StepField[];
    status: Status;
    followUp: { dateTime: Date, comment: string };
    finalSubmissionDate: Date;
}