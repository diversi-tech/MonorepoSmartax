export interface TimeEntry {
  checkIn: Date;
  checkOut?: Date | null;
  hoursWorked: number;
}

export interface WorkLog {
  allhoursWorked: number;
  _id?: string;
  employeeId: string;
  date: Date;
  timeEntries: TimeEntry[];
}