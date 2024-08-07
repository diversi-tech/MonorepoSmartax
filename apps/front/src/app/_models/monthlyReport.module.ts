import { Status } from "./status.module";
import { stepFieldMonth } from "./stepFieldMonth.module";

export interface MonthlyReport {
  _id: string;
  idUser: string;
  idEmploye: string;
  reportDate: Date;
  monthlyReportFields: stepFieldMonth[];
  status: Status[];

}
