import { SelectItem } from 'primeng/api';

export interface Communication {
  _id?: string;
  client: string; // ObjectId as string
  date: Date;
  summary: string;
  assignedTo: SelectItem | null; // Change type to SelectItem
  Status: boolean;
  Subject: string;
}
