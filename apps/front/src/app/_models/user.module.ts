// import { Client } from "./client.module";
// import { Role } from "./role.module";

// export interface User {
//   _id: string;
//   userName: string;
//   email: string;
//   passwordHash: string;
//   role: string;
//   favoritesClient:string[];
// }
import { Client } from './client.module';
import { Role } from './role.module';

export interface User {
  _id: string;
  userName: string;
  email: string;
  passwordHash: string;
  role: string;
  favoritesClient: string[];
  // role: Role; // התייחסות לאובייקט Role ולא למחרוזת
  // favoritesClient: Client[]; // התייחסות למערך של אובייקטים מסוג Client
}
