import { Component, OnInit } from '@angular/core';
import { WorkLogService } from '../../_services/workLog.service';
import { WorkLog, TimeEntry } from '../../_models/workLog.model';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TokenService } from '../../_services/token.service';
import { UpdateWorkLogDto } from '../../../../../../server/src/Models/dto/workLog.dto';

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    CommonModule,
    DialogModule
  ],
  providers: [MessageService]
})
export class WorkLogComponent implements OnInit {
  workLogs: WorkLog[] = [];
  groupedWorkLogs: any[] = [];
  displayDialog: boolean = false;
  editedCheckIn: Date | null = null;
  editedCheckOut: Date | null = null;
  selectedLog: any = null;
  employeeId: string | null = null;
  selectedEntry: TimeEntry | null = null;
  userRole: number;
  logGroup: any;

  constructor(
    private workLogService: WorkLogService,
    private messageService: MessageService,
    private tokenService: TokenService
  ) {
    this.employeeId = this.tokenService.getCurrentDetail('_id');
    this.userRole = this.tokenService.getCurrentDetail('role').level;
  }

  ngOnInit() {
    this.getWorkLogs();
    console.log(this.employeeId);
  }

  getWorkLogs() {
    if (this.userRole === 3) {
      this.workLogService.getWorkLogs().subscribe(
        (response: WorkLog[]) => {
          if (response && Array.isArray(response)) {
            this.workLogs = response.map(log => ({
              ...log,
              date: new Date(log.date),
              timeEntries: log.timeEntries.map(entry => ({
                ...entry,
                checkIn: entry.checkIn ? new Date(entry.checkIn) : null,
                checkOut: entry.checkOut ? new Date(entry.checkOut) : null
              }))
            }));
            this.groupWorkLogsByEmployeeAndDate();
          } else {
            console.error('Data received from API is not an array:', response);
          }
        },
        (error) => {
          console.error('Error fetching work logs:', error);
        }
      );
    } else if (this.userRole === 6) {
      this.workLogService.getWorkLogsByEmployeeId(this.employeeId).subscribe(
        (response: WorkLog[]) => {
          if (response && Array.isArray(response)) {
            this.workLogs = response.map(log => ({
              ...log,
              date: new Date(log.date),
              timeEntries: log.timeEntries.map(entry => ({
                ...entry,
                checkIn: entry.checkIn ? new Date(entry.checkIn) : null,
                checkOut: entry.checkOut ? new Date(entry.checkOut) : null
              }))
            }));
            this.groupWorkLogsByEmployeeAndDate();
          } else {
            console.error('Data received from API is not an array:', response);
          }
        },
        (error) => {
          console.error('Error fetching work logs:', error);
        }
      );
    } else {
      console.error('User role not supported for fetching work logs.');
    }
  }

  groupWorkLogsByEmployeeAndDate() {
    const grouped = this.workLogs.reduce((acc, log) => {
      const key = `${log.employeeId}_${new Date(log.date).toLocaleDateString('en-CA')}`;
      if (!acc[key]) {
        acc[key] = {
          logs: [],
          employeeId: log.employeeId,
          date: new Date(log.date).toLocaleDateString('en-CA'),
          totalHoursWorked: 0
        };
      }
      acc[key].logs.push(log);
      acc[key].totalHoursWorked += log.timeEntries.reduce((sum, entry) => sum + (entry.hoursWorked || 0), 0);
      return acc;
    }, {});

    this.groupedWorkLogs = Object.values(grouped);
  }

  checkIn() {
    if (!this.employeeId) {
      alert('Error: Employee ID not available.');
      return;
    }

    const today = new Date().toLocaleDateString('en-CA'); // תאריך של היום בפורמט 'yyyy-MM-dd'
    const existingWorkLog = this.workLogs.find(log => log.employeeId == this.employeeId && new Date(log.date).toLocaleDateString('en-CA') === today);

    if (existingWorkLog) {
      const openEntry = existingWorkLog.timeEntries.find(entry => !entry.checkOut);
      if (openEntry) {
        alert('There is already an open entry for today.');
        return;
      }
      const newTimeEntry: TimeEntry = {
        checkIn: new Date(),
        checkOut: null,
        hoursWorked: 0
      };
      existingWorkLog.timeEntries.push(newTimeEntry);
      this.updateWorkLog(existingWorkLog);
    } else {
      const newTimeEntry: TimeEntry = {
        checkIn: new Date(),
        checkOut: null,
        hoursWorked: 0
      };
      const newWorkLog: WorkLog = {
        employeeId: this.employeeId,
        date: new Date(),
        timeEntries: [newTimeEntry]
      };
      this.createWorkLog(newWorkLog);
    }
  }

  checkOut() {
    if (!this.employeeId) {
      alert('Error: Employee ID not available.');
      return;
    }

    const today = new Date().toLocaleDateString('en-CA');
    const existingWorkLog = this.workLogs.find(log => log.employeeId === this.employeeId && new Date(log.date).toLocaleDateString('en-CA') === today);

    if (!existingWorkLog) {
      alert('Please check in before checking out.');
      return;
    }

    const openEntry = existingWorkLog.timeEntries.find(entry => !entry.checkOut);
    if (!openEntry) {
      alert('No open entry found.');
      return;
    }

    openEntry.checkOut = new Date();
    openEntry.hoursWorked = this.calculateHours(openEntry.checkIn, openEntry.checkOut);
    this.updateWorkLog(existingWorkLog);
  }

  editWorkLog(log: any) {
    this.selectedLog = log;
    this.selectedEntry = null;
    this.displayDialog = true;
  }

  editTimeEntry(logGroup: any, entry: TimeEntry) {
    this.selectedLog = logGroup;
    this.selectedEntry = entry;
    this.editedCheckIn = new Date(entry.checkIn);
    this.editedCheckOut = entry.checkOut ? new Date(entry.checkOut) : null;
    this.displayDialog = true;
  }

  saveEditedWorkLog() {
    if (this.selectedLog && this.selectedEntry) {
      this.selectedEntry.checkIn = this.editedCheckIn;
      this.selectedEntry.checkOut = this.editedCheckOut;
      this.selectedEntry.hoursWorked = this.calculateHours(this.selectedEntry.checkIn, this.selectedEntry.checkOut);

      const updateDto: UpdateWorkLogDto = {
        _id: this.selectedLog.logs[0]._id,
        timeEntries: this.selectedLog.logs.flatMap(log => log.timeEntries.map(entry => ({
          _id: entry._id,
          checkIn: entry.checkIn,
          checkOut: entry.checkOut,
          hoursWorked: entry.hoursWorked
        })))
      };
      this.updateWorkLog(updateDto);
      this.displayDialog = false;
    }
  }

  cancelEdit() {
    this.displayDialog = false;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  updateWorkLog(workLog: any) {
    this.workLogService.updateWorkLog(workLog._id, workLog.timeEntries).subscribe(
      response => {
        if (response) {
          this.messageService.add({ severity: 'success', summary: 'Work log updated successfully' });
          this.getWorkLogs();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed to update work log' });
        }
      },
      error => {
        console.error('Error updating work log:', error);
        this.messageService.add({ severity: 'error', summary: 'Server error - try again later' });
      }
    );
  }
  createWorkLog(workLog: WorkLog) {
    this.workLogService.createWorkLog(workLog).subscribe(
      response => {
        if (response) {
          this.messageService.add({ severity: 'success', summary: 'Work log created successfully' });
          this.getWorkLogs();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Failed to create work log' });
        }
      },
      error => {
        console.error('Error creating work log:', error);
        this.messageService.add({ severity: 'error', summary: 'Server error - try again later' });
      }
    );
  }

  calculateHours(checkIn: Date, checkOut: Date): number {
    if (!checkIn || !checkOut) {
        return 0;
    }

    if (typeof checkIn === 'string') {
        checkIn = new Date(checkIn);
    }
    if (typeof checkOut === 'string') {
        checkOut = new Date(checkOut);
    }

    const diffMilliseconds = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffSeconds = diffMilliseconds / 1000;

    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = Math.floor(diffSeconds % 60);

    const totalHours = hours + (minutes / 60) + (seconds / 3600);
    const roundedHours = Math.round(totalHours * 100) / 100;

    return roundedHours;
  }

exportToExcel() {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth is zero-based
  const year = now.getFullYear();
  this.workLogService.exportWorkLogs(month, year).subscribe(
    (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = `worklogs_${year}_${month}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    (error) => {
      console.error('Error exporting work logs:', error);
      this.messageService.add({ severity: 'error', summary: 'Failed to export work logs' });
    }
  );
}
}
