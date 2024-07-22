import { StepField } from "./stepField.module";

export interface TaxRefunds {
  idUser: string;
  idEmploye: string;
  year: string;
  date: Date;
  stepsList: StepField[];

}
