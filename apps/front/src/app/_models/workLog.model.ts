export interface WorkLog {
  _id?: string;
  employeeId: string;
  date: Date;
  checkIn: Date;
  checkOut: Date | null;
  hoursWorked: number;
  overtimeHours?: number;
}