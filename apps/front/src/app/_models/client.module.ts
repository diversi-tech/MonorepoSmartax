import { Tag } from "./tag.module";

import { Status } from "./status.module";

export interface Client {
  _id?: string;
  name: string;
  contactInfo: string;
  businessName: string;
  source: string;
  status: Status|null;
  createdDate: Date;
  tag:Tag;
  email:string;
}
