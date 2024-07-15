export interface TimeEntry {
  checkIn: Date;
  checkOut: Date | null;
  hoursWorked: number;
}

export interface WorkLog {
  _id?: string;
  employeeId: string;
  date: Date;
  timeEntries: TimeEntry[];
}
