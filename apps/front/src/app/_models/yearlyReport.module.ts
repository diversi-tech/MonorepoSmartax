import { StepField } from "./stepField.module";

export interface YearlyReport {
  _id?: string;
  idUser: string;
  assignee: string[];
  idEmploye: string;
  yearReport: string;
  dateTime: Date;
  price: number;
  paymentAmountPaid: number;
  balanceDue: number;
  stepsList: StepField[];
  entityType: string;

 

}
