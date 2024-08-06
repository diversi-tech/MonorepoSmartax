import { Status } from "./status.module";
import { StepField } from "./stepField.module";

export interface TaxRefunds {
  idClient: string;
  idEmploye: string;
  year: string;
  date: Date;
  stepsList: StepField[];
  status: Status[];
  assignee: string[];
  price: number;
  paymentAmountPaid: number;
  balanceDue: number;
  entityType: string;
}