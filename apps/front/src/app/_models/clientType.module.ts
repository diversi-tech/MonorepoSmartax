import { Field } from "./field.module";

export interface ClientType {
    _id?: string;
    name: string;
    tasks: string[];
    fields: Field[];
  }
  