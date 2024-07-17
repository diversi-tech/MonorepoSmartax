import { Component, OnInit } from '@angular/core';
import { WorkLogService } from '../../_services/workLog.service';
import { WorkLog } from '../../_models/workLog.model';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TokenService } from '../../_services/token.service';

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
  currentWorkLog: WorkLog | null = null;
  employeeId: string | null = null;
  exportMonth: number;
  exportYear: number;
  editedWorkLog: WorkLog | null = null;
  displayDialog: boolean = false;
  editedCheckIn: Date;
  editedCheckOut: Date;
  userRole: number;

  constructor(
    private workLogService: WorkLogService,
    private messageService: MessageService,
    private tokenService: TokenService
  ) {
    this.employeeId = this.tokenService.getCurrentDetail('email');
    this.userRole = this.tokenService.getCurrentDetail('role').level;
  }

  ngOnInit(): void {
    this.getWorkLogs();
  }

  getWorkLogs(): void {
    if (this.userRole === 3) {
      this.workLogService.getWorkLogs(this.employeeId).subscribe(workLogs => this.workLogs = workLogs);
    } else if (this.userRole === 6) {
      this.workLogService.getWorkLogs().subscribe(workLogs => this.workLogs = workLogs);
    }
  }
  checkIn(): void {
    if (this.currentWorkLog) {
      alert('כבר ביצעת כניסה. יש לצאת לפני כניסה נוספת.');
      return;
    }
    if (!this.employeeId) {
      alert('שגיאה: מספר עובד לא זמין.');
      return;
    }
    this.currentWorkLog = {
      employeeId: this.employeeId,
      date: new Date(),
      checkIn: new Date(),
      checkOut: null,
      hoursWorked: 0
    };
  }

  checkOut(): void {
    if (!this.currentWorkLog) {
      alert('לא בוצעה כניסה.');
      return;
    }
    this.currentWorkLog.checkOut = new Date();
    this.currentWorkLog.hoursWorked = this.calculateHours(this.currentWorkLog.checkIn, this.currentWorkLog.checkOut);
    this.workLogService.createWorkLog(this.currentWorkLog).subscribe(workLog => {
      this.workLogs.push(workLog);
      this.currentWorkLog = null;
    });
  }

  editWorkLog(log: WorkLog): void {
    this.editedWorkLog = { ...log };
    this.editedCheckIn = new Date(this.editedWorkLog.checkIn);
    if (this.editedWorkLog.checkOut) {
      this.editedCheckOut = new Date(this.editedWorkLog.checkOut);
    } else {
      this.editedCheckOut = null;
    }
    this.displayDialog = true;
  }

  saveEditedWorkLog(): void {
    if (this.editedWorkLog) {
      if (this.editedCheckIn >= this.editedCheckOut) {
        alert('שעת הכניסה חייבת להיות לפני שעת היציאה.');
        return;
      }

      this.editedWorkLog.checkIn = this.editedCheckIn;
      this.editedWorkLog.checkOut = this.editedCheckOut;
      this.editedWorkLog.hoursWorked = this.calculateHours(this.editedCheckIn, this.editedCheckOut);

      this.workLogService.updateWorkLog(this.editedWorkLog._id, this.editedWorkLog.checkIn, this.editedWorkLog.checkOut, this.editedWorkLog.hoursWorked)
        .subscribe(updatedLog => {
          const index = this.workLogs.findIndex(log => log._id === updatedLog._id);
          if (index !== -1) {
            this.workLogs[index] = updatedLog;
          }
          this.messageService.add({severity:'success', summary:'עדכון בוצע', detail:'השעות עודכנו בהצלחה'});
          this.cancelEdit();
        });
    }
  }

  cancelEdit(): void {
    this.editedWorkLog = null;
    this.displayDialog = false;
    this.editedCheckIn = null;
    this.editedCheckOut = null;
  }

  exportWorkLogs(month: number, year: number): void {
    this.workLogService.exportWorkLogs(month, year).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `work-logs-${month}-${year}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  calculateHours(checkIn: Date, checkOut: Date): number {
    if (!checkIn || !checkOut) {
      return 0;
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
}
