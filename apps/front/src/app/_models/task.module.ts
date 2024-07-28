import { CheckList } from './checkList.model';
import { CheckListItem } from './checkListItem.model';
import { Client } from './client.module';
import { Priority } from './priority.module';
import { Status } from './status.module';
import { Tag } from './tag.module';
import { User } from './user.module';

export interface Task {
  _id?: string;
  parent?: string,
  subTasks?: string[],
  client?: Client;
  taskName?: string;
  description?: string;
  dueDate?: Date;
  deadline?: Date;
  startDate?:Date;
  
  status?: Status;
  assignedTo?: User[];
  tags?: Tag[];
  images?:string[];
  priority?: Priority;
  googleId?:string;
  checkList?: string[];
}

