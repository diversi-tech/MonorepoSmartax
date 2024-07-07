import { Role } from "./role.module";

export interface User {
  _id: string;
  userName: string;
  email: string;
  passwordHash: string;
  role: string;

}
