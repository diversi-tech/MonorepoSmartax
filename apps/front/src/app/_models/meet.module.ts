import { Client } from "./client.module"
import { User } from "./user.module"

export interface Meet {
  _id?: string
  address: string
  date: Date
  beginningTime: Date
  endTime: Date
  usersId: User[]
  clientDepartments: Client[]
}