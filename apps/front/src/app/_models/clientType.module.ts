import { Field } from "./field.module";
import { RepeatableTask } from "./repeatable.module";

export interface ClientType {
    _id?: string;
    name: string;
    tasks: RepeatableTask[];
    fields: Field[];
  }
  