import { Client } from './client.module';
import { Frequency } from './frequency.module';
import { Priority } from './priority.module';
import { Tag } from './tag.module';
import { User } from './user.module';

export interface RepeatableTask {
  _id?: string;
  client?: Client;
  taskName?: string;
  description?: string;
  dueDate?: Date;
  assignedTo?: User[];
  tags?: Tag[];
  docs?:string[];
  priority?: Priority;
  frequency: Frequency;
  active: boolean;
  virtual: boolean;
}

