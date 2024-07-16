// // import { Component, OnInit } from '@angular/core';
// // import { WorkLogService } from '../../_services/workLog.service';
// // import { WorkLog } from '../../_models/workLog.model';
// // import { MessageService } from 'primeng/api';
// // import { FormsModule } from '@angular/forms';
// // import { ButtonModule } from 'primeng/button';
// // import { InputTextModule } from 'primeng/inputtext';
// // import { TableModule } from 'primeng/table';
// // import { CalendarModule } from 'primeng/calendar';
// // import { CommonModule } from '@angular/common';
// // import { DialogModule } from 'primeng/dialog';
// // import { TokenService } from '../../_services/token.service';

// // @Component({
// //   selector: 'app-work-log',
// //   templateUrl: './work-log.component.html',
// //   styleUrls: ['./work-log.component.css'],
// //   standalone: true,
// //   imports: [
// //     FormsModule,
// //     ButtonModule,
// //     InputTextModule,
// //     TableModule,
// //     CalendarModule,
// //     CommonModule,
// //     DialogModule
// //   ],
// //   providers: [MessageService]
// // })
// // export class WorkLogComponent implements OnInit {
// //   workLogs: WorkLog[] = [];
// //   currentWorkLog: WorkLog | null = null;
// //   employeeId: string | null = null;
// //   exportMonth: number;
// //   exportYear: number;
// //   editedWorkLog: WorkLog | null = null;
// //   displayDialog: boolean = false;
// //   editedCheckIn: Date;
// //   editedCheckOut: Date;
// //   userRole: number;

// //   constructor(
// //     private workLogService: WorkLogService,
// //     private messageService: MessageService,
// //     private tokenService: TokenService
// //   ) {
// //     this.employeeId = this.tokenService.getCurrentDetail('email');
// //     this.userRole = this.tokenService.getCurrentDetail('role').level;
// //   }

// //   ngOnInit(): void {
// //     this.getWorkLogs();
// //   }

// //   getWorkLogs(): void {
// //     if (this.userRole === 3) {
// //       this.workLogService.getWorkLogs(this.employeeId).subscribe(workLogs => this.workLogs = workLogs);
// //     } else if (this.userRole === 6) {
// //       this.workLogService.getWorkLogs().subscribe(workLogs => this.workLogs = workLogs);
// //     }
// //   }
// //   checkIn(): void {
// //     if (this.currentWorkLog) {
// //       alert('כבר ביצעת כניסה. יש לצאת לפני כניסה נוספת.');
// //       return;
// //     }
// //     if (!this.employeeId) {
// //       alert('שגיאה: מספר עובד לא זמין.');
// //       return;
// //     }
// //     this.currentWorkLog = {
// //       employeeId: this.employeeId,
// //       date: new Date(),
// //       checkIn: new Date(),
// //       checkOut: null,
// //       hoursWorked: 0
// //     };
// //   }

// //   checkOut(): void {
// //     if (!this.currentWorkLog) {
// //       alert('לא בוצעה כניסה.');
// //       return;
// //     }
// //     this.currentWorkLog.checkOut = new Date();
// //     this.currentWorkLog.hoursWorked = this.calculateHours(this.currentWorkLog.checkIn, this.currentWorkLog.checkOut);
// //     this.workLogService.createWorkLog(this.currentWorkLog).subscribe(workLog => {
// //       this.workLogs.push(workLog);
// //       this.currentWorkLog = null;
// //     });
// //   }

// //   editWorkLog(log: WorkLog): void {
// //     this.editedWorkLog = { ...log };
// //     this.editedCheckIn = new Date(this.editedWorkLog.checkIn);
// //     if (this.editedWorkLog.checkOut) {
// //       this.editedCheckOut = new Date(this.editedWorkLog.checkOut);
// //     } else {
// //       this.editedCheckOut = null;
// //     }
// //     this.displayDialog = true;
// //   }

// //   saveEditedWorkLog(): void {
// //     if (this.editedWorkLog) {
// //       if (this.editedCheckIn >= this.editedCheckOut) {
// //         alert('שעת הכניסה חייבת להיות לפני שעת היציאה.');
// //         return;
// //       }

// //       this.editedWorkLog.checkIn = this.editedCheckIn;
// //       this.editedWorkLog.checkOut = this.editedCheckOut;
// //       this.editedWorkLog.hoursWorked = this.calculateHours(this.editedCheckIn, this.editedCheckOut);

// //       this.workLogService.updateWorkLog(this.editedWorkLog._id, this.editedWorkLog.checkIn, this.editedWorkLog.checkOut, this.editedWorkLog.hoursWorked)
// //         .subscribe(updatedLog => {
// //           const index = this.workLogs.findIndex(log => log._id === updatedLog._id);
// //           if (index !== -1) {
// //             this.workLogs[index] = updatedLog;
// //           }
// //           this.messageService.add({severity:'success', summary:'עדכון בוצע', detail:'השעות עודכנו בהצלחה'});
// //           this.cancelEdit();
// //         });
// //     }
// //   }

// //   cancelEdit(): void {
// //     this.editedWorkLog = null;
// //     this.displayDialog = false;
// //     this.editedCheckIn = null;
// //     this.editedCheckOut = null;
// //   }

// //   exportWorkLogs(month: number, year: number): void {
// //     this.workLogService.exportWorkLogs(month, year).subscribe(blob => {
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       a.download = `work-logs-${month}-${year}.xlsx`;
// //       document.body.appendChild(a);
// //       a.click();
// //       window.URL.revokeObjectURL(url);
// //     });
// //   }

// //   calculateHours(checkIn: Date, checkOut: Date): number {
// //     if (!checkIn || !checkOut) {
// //       return 0;
// //     }
// //     const diffMilliseconds = Math.abs(checkOut.getTime() - checkIn.getTime());
// //     const diffSeconds = diffMilliseconds / 1000;

// //     const hours = Math.floor(diffSeconds / 3600);
// //     const minutes = Math.floor((diffSeconds % 3600) / 60);
// //     const seconds = Math.floor(diffSeconds % 60);

// //     const totalHours = hours + (minutes / 60) + (seconds / 3600);
// //     const roundedHours = Math.round(totalHours * 100) / 100;

// //     return roundedHours;
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { WorkLogService } from '../../_services/workLog.service';
// import { WorkLog, TimeEntry } from '../../_models/workLog.model';
// import { MessageService } from 'primeng/api';
// import { FormsModule } from '@angular/forms';
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { TableModule } from 'primeng/table';
// import { CalendarModule } from 'primeng/calendar';
// import { CommonModule } from '@angular/common';
// import { DialogModule } from 'primeng/dialog';
// import { TokenService } from '../../_services/token.service';

// @Component({
//   selector: 'app-work-log',
//   templateUrl: './work-log.component.html',
//   styleUrls: ['./work-log.component.css'],
//   standalone: true,
//   imports: [
//     FormsModule,
//     ButtonModule,
//     InputTextModule,
//     TableModule,
//     CalendarModule,
//     CommonModule,
//     DialogModule
//   ],
//   providers: [MessageService]
// })
// // export class WorkLogComponent implements OnInit {
// //   workLogs: any = [];
// //   currentWorkLog: WorkLog | null = null;
// //   employeeId: string | null = null;
// //   editedWorkLog: WorkLog | null = null;
// //   displayDialog: boolean = false;
// //   editedCheckIn: Date;
// //   editedCheckOut: Date;
// //   userRole: number;
// //   exportMonth: number;
// //   exportYear: number;

// //   constructor(
// //     private workLogService: WorkLogService,
// //     private messageService: MessageService,
// //     private tokenService: TokenService
// //   ) {
// //     this.employeeId = this.tokenService.getCurrentDetail('email');
// //     this.userRole = this.tokenService.getCurrentDetail('role').level;
// //   }

// //   ngOnInit(): void {
// //     this.getWorkLogs();
// //   }

// //   getWorkLogs(): void {
// //     this.workLogService.getWorkLogs().subscribe(
// //       (response: any) => {
// //         if (response && response.data) {
// //           this.workLogs = this.groupWorkLogsByDate(response.data);
// //           console.log("יומני עבודה שהתקבלו:", this.workLogs);
// //         } else {
// //           console.error("תגובה לא תקינה מהשרת:", response);
// //         }
// //       },
// //       error => {
// //         console.error("שגיאה בעת קבלת יומני עבודה:", error);
// //       }
// //     );
// //   }

// //   groupWorkLogsByDate(workLogs: WorkLog[]): any {
// //     const groupedLogs = workLogs.reduce((acc, log) => {
// //       const date = new Date(log.date).toLocaleDateString();
// //       if (!acc[date]) {
// //         acc[date] = [];
// //       }
// //       acc[date].push(log);
// //       return acc;
// //     }, {});

// //     return Object.keys(groupedLogs).map(date => ({
// //       date,
// //       logs: groupedLogs[date]
// //     }));
// //   }

// //   checkIn(): void {
// //     if (!this.employeeId) {
// //       alert('שגיאה: מספר עובד לא זמין.');
// //       return;
// //     }

// //     const existingWorkLog = this.workLogs.find(log => log.employeeId === this.employeeId && this.isToday(log.date));

// //     if (existingWorkLog) {
// //       const newTimeEntry: TimeEntry = {
// //         checkIn: new Date(),
// //         checkOut: null,
// //         hoursWorked: 0
// //       };
// //       existingWorkLog.timeEntries.push(newTimeEntry);
// //       this.updateWorkLog(existingWorkLog);
// //     } else {
// //       const newTimeEntry: TimeEntry = {
// //         checkIn: new Date(),
// //         checkOut: null,
// //         hoursWorked: 0
// //       };
// //       const newWorkLog: WorkLog = {
// //         employeeId: this.employeeId,
// //         date: new Date(),
// //         timeEntries: [newTimeEntry]
// //       };
// //       this.createWorkLog(newWorkLog);
// //     }
// //   }

// //   checkOut(): void {
// //     if (!this.currentWorkLog) {
// //       alert('יש להכניס כניסה קודם ליציאה.');
// //       return;
// //     }
// //     this.currentWorkLog.timeEntries[0].checkOut = new Date();
// //     this.calculateHours(this.currentWorkLog.timeEntries[0].checkIn, this.currentWorkLog.timeEntries[0].checkOut);
// //     this.updateWorkLog(this.currentWorkLog);
// //   }

// //   calculateHours(checkIn: Date, checkOut: Date): void {
// //     const diff = checkOut.getTime() - checkIn.getTime();
// //     const hoursWorked = diff / (1000 * 60 * 60);
// //     this.currentWorkLog.timeEntries[0].hoursWorked = hoursWorked;
// //   }

// //   editWorkLog(workLog: WorkLog): void {
// //     this.editedWorkLog = { ...workLog };
// //     this.editedCheckIn = new Date(this.editedWorkLog.timeEntries[0].checkIn);
// //     if (this.editedWorkLog.timeEntries[0].checkOut) {
// //       this.editedCheckOut = new Date(this.editedWorkLog.timeEntries[0].checkOut);
// //     }
// //     this.displayDialog = true;
// //   }

// //   saveEditedWorkLog(): void {
// //     this.editedWorkLog.timeEntries[0].checkIn = this.editedCheckIn;
// //     this.editedWorkLog.timeEntries[0].checkOut = this.editedCheckOut;
// //     this.calculateHours(this.editedWorkLog.timeEntries[0].checkIn, this.editedWorkLog.timeEntries[0].checkOut);
// //     this.updateWorkLog(this.editedWorkLog);
// //   }

// //   cancelEdit(): void {
// //     this.displayDialog = false;
// //   }

// //   exportWorkLogs(month: number, year: number): void {
// //     this.workLogService.exportWorkLogs(month, year).subscribe(blob => {
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       a.download = `work-logs-${month}-${year}.xlsx`;
// //       document.body.appendChild(a);
// //       a.click();
// //       window.URL.revokeObjectURL(url);
// //     });
// //   }

// //   private isToday(someDate: Date): boolean {
// //     const today = new Date();
// //     return someDate.getDate() === today.getDate() &&
// //            someDate.getMonth() === today.getMonth() &&
// //            someDate.getFullYear() === today.getFullYear();
// //   }

// //   private createWorkLog(workLog: WorkLog): void {
// //     this.workLogService.createWorkLog(workLog).subscribe(() => {
// //       this.messageService.add({severity: 'success', summary: 'נשמר בהצלחה', detail: 'יומן עבודה נוסף'});
// //       this.getWorkLogs();
// //     });
// //   }

// //   private updateWorkLog(workLog: WorkLog): void {
// //     this.workLogService.updateWorkLog(workLog._id, workLog.timeEntries).subscribe(() => {
// //       this.messageService.add({severity: 'success', summary: 'עודכן בהצלחה', detail: 'יומן עבודה עודכן'});
// //       this.getWorkLogs();
// //     });
// //   }
// // }
// export class WorkLogComponent implements OnInit {
//   workLogs: any[] = [];
//   groupedWorkLogs: any[] = [];
//   displayDialog: boolean = false;
//   editedCheckIn: Date | null = null;
//   editedCheckOut: Date | null = null;
//   selectedLog: any = null;

//   constructor(private workLogService: WorkLogService) {}

//   ngOnInit() {
//     this.getWorkLogs();
//   }

//   getWorkLogs() {
//     this.workLogService.getWorkLogs().subscribe((response: any) => {
//       if (response && Array.isArray(response.data)) { // בדוק אם response.data הוא מערך
//         this.workLogs = response.data;
//         this.groupWorkLogsByDate();
//       } else {
//         console.error('Data received from API is not an array:', response);
//       }
//     });
//   }

//   groupWorkLogsByDate() {
//     const grouped = this.workLogs.reduce((acc, log) => {
//       const date = log.date.split('T')[0]; // extract date without time
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(log);
//       return acc;
//     }, {});

//     this.groupedWorkLogs = Object.keys(grouped).map(date => {
//       return { date, logs: grouped[date] };
//     });
//   }

//   checkIn() {
//     // כניסה
//   }

//   checkOut() {
//     // יציאה
//   }

//   editWorkLog(log: any) {
//     this.selectedLog = log;
//     this.editedCheckIn = new Date(log.checkIn);
//     this.editedCheckOut = log.checkOut ? new Date(log.checkOut) : null;
//     this.displayDialog = true;
//   }

//   saveEditedWorkLog() {
//     if (this.selectedLog) {
//       this.selectedLog.checkIn = this.editedCheckIn;
//       this.selectedLog.checkOut = this.editedCheckOut;
//       // עדכון ביומן העבודה
//     }
//     this.displayDialog = false;
//   }

//   cancelEdit() {
//     this.selectedLog = null;
//     this.displayDialog = false;
//   }
// }
// work-log.component.ts

//===============//
// import { Component, OnInit } from '@angular/core';
// import { WorkLogService } from '../../_services/workLog.service';
// import { WorkLog, TimeEntry } from '../../_models/workLog.model';
// import { MessageService } from 'primeng/api';
// import { FormsModule } from '@angular/forms';
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { TableModule } from 'primeng/table';
// import { CalendarModule } from 'primeng/calendar';
// import { CommonModule } from '@angular/common';
// import { DialogModule } from 'primeng/dialog';
// import { TokenService } from '../../_services/token.service';
// import { UpdateTimeEntryDto } from '../../../../../../server/src/Models/dto/workLog.dto';

// @Component({
//   selector: 'app-work-log',
//   templateUrl: './work-log.component.html',
//   styleUrls: ['./work-log.component.css'],
//   standalone: true,
//   imports: [
//     FormsModule,
//     ButtonModule,
//     InputTextModule,
//     TableModule,
//     CalendarModule,
//     CommonModule,
//     DialogModule
//   ],
//   providers: [MessageService]
// })
// export class WorkLogComponent implements OnInit {
//   workLogs: WorkLog[] = [];
//   groupedWorkLogs: any[] = [];
//   displayDialog: boolean = false;
//   editedCheckIn: Date | null = null;
//   editedCheckOut: Date | null = null;
//   selectedLog: any = null;
//   employeeId: string | null = null;
//   selectedEntry: TimeEntry | null = null;
//   userRole: number;
//   logGroup: any;

//   constructor(
//     private workLogService: WorkLogService,
//     private messageService: MessageService,
//     private tokenService: TokenService
//   ) {
//     this.employeeId = this.tokenService.getCurrentDetail('_id');
//     this.userRole = this.tokenService.getCurrentDetail('role').level;
//   }

//   ngOnInit() {
//     this.getWorkLogs();
//     console.log(this.userRole);
//   }

//   getWorkLogs() {
//     if (this.userRole === 3) {
//       this.workLogService.getWorkLogs().subscribe(
//         (response: WorkLog[]) => {
//           if (response && Array.isArray(response)) {
//             this.workLogs = response.map(log => ({
//               ...log,
//               date: new Date(log.date),
//               timeEntries: log.timeEntries.map(entry => ({
//                 ...entry,
//                 checkIn: entry.checkIn ? new Date(entry.checkIn) : null,
//                 checkOut: entry.checkOut ? new Date(entry.checkOut) : null
//               }))
//             }));
//             this.groupWorkLogsByDate();
//           } else {
//             console.error('Data received from API is not an array:', response);
//           }
//         },
//         (error) => {
//           console.error('Error fetching work logs:', error);
//         }
//       );
//     } else if (this.userRole === 6) {
//       this.workLogService.getWorkLogs(this.employeeId).subscribe(
//         (response: WorkLog[]) => {
//           if (response && Array.isArray(response)) {
//             this.workLogs = response.map(log => ({
//               ...log,
//               date: new Date(log.date),
//               timeEntries: log.timeEntries.map(entry => ({
//                 ...entry,
//                 checkIn: entry.checkIn ? new Date(entry.checkIn) : null,
//                 checkOut: entry.checkOut ? new Date(entry.checkOut) : null
//               }))
//             }));
//             this.groupWorkLogsByDate();
//           } else {
//             console.error('Data received from API is not an array:', response);
//           }
//         },
//         (error) => {
//           console.error('Error fetching work logs:', error);
//         }
//       );
//     }
//   }

//   groupWorkLogsByDate() {
//     const grouped = this.workLogs.reduce((acc, log) => {
//       const date = new Date(log.date).toLocaleDateString('en-CA');
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(log);
//       return acc;
//     }, {});

//     this.groupedWorkLogs = Object.keys(grouped).map(date => {
//       const logs = grouped[date];
//       const totalHoursWorked = logs.reduce((sum, log) => {
//         return sum + log.timeEntries.reduce((entrySum, entry) => {
//           return entrySum + (entry.hoursWorked || 0);
//         }, 0);
//       }, 0);
//       return { date, logs, totalHoursWorked, expanded: false, employeeId: logs[0].employeeId };
//     });
//   }

//   hasOpenTimeEntry(logGroup: any): boolean {
//     console.log(logGroup);
//     return logGroup.logs.some((log: WorkLog) => log.timeEntries.some((entry: TimeEntry) => !entry.checkOut));
//   }

//   checkIn() {
//     if (!this.employeeId) {
//       alert('שגיאה: מספר עובד לא זמין.');
//       return;
//     }

//     const today = new Date();
//     const existingWorkLog = this.workLogs.find(log => log.employeeId === this.employeeId && this.isToday(new Date(log.date)));

//     if (existingWorkLog) {
//       const newTimeEntry: TimeEntry = {
//         checkIn: today,
//         checkOut: null,
//         hoursWorked: 0
//       };
//       existingWorkLog.timeEntries.push(newTimeEntry);
//       this.updateWorkLog(existingWorkLog, existingWorkLog.timeEntries); // Pass timeEntries here
//     } else {
//       const newTimeEntry: TimeEntry = {
//         checkIn: today,
//         checkOut: null,
//         hoursWorked: 0
//       };
//       const newWorkLog: WorkLog = {
//         employeeId: this.employeeId,
//         date: today,
//         timeEntries: [newTimeEntry]
//       };
//       this.createWorkLog(newWorkLog);
//     }
//   }

//   checkOut() {
//     if (!this.employeeId) {
//       alert('שגיאה: מספר עובד לא זמין.');
//       return;
//     }

//     const today = new Date();
//     const existingWorkLog = this.workLogs.find(log => log.employeeId === this.employeeId && this.isToday(new Date(log.date)));

//     if (!existingWorkLog) {
//       alert('יש להכניס כניסה קודם ליציאה.');
//       return;
//     }

//     const currentEntry = existingWorkLog.timeEntries.find(entry => !entry.checkOut);

//     if (!currentEntry) {
//       alert('לא נמצאה כניסה פתוחה.');
//       return;
//     }

//     currentEntry.checkOut = today;
//     currentEntry.hoursWorked = this.calculateHours(currentEntry.checkIn, currentEntry.checkOut);
//     this.updateWorkLog(existingWorkLog, existingWorkLog.timeEntries); // Pass timeEntries here
//   }

//   editWorkLog(log: any) {
//     this.selectedLog = log;
//     this.selectedEntry = null;
//     this.displayDialog = true;
//   }

//   editTimeEntry(logGroup: any, entry: TimeEntry) {
//     this.selectedLog = logGroup;
//     this.selectedEntry = entry;
//     this.editedCheckIn = new Date(entry.checkIn);
//     this.editedCheckOut = entry.checkOut ? new Date(entry.checkOut) : null;
//     this.displayDialog = true;
//   }

//   saveEditedWorkLog() {
//     if (this.selectedLog && this.selectedEntry) {
//       this.selectedEntry.checkIn = this.editedCheckIn;
//       this.selectedEntry.checkOut = this.editedCheckOut;
//       this.selectedEntry.hoursWorked = this.calculateHours(this.selectedEntry.checkIn, this.selectedEntry.checkOut);
//       this.updateWorkLog(this.selectedLog, this.selectedLog.timeEntries); // Pass timeEntries here
//       this.displayDialog = false;
//     }
//   }

//   cancelEdit() {
//     this.displayDialog = false;
//   }

//   isToday(date: Date): boolean {
//     const today = new Date();
//     return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
//   }

//   updateWorkLog(workLog: WorkLog, timeEntries: TimeEntry[]) {
//     this.workLogService.updateWorkLog(workLog._id, timeEntries).subscribe(
//       response => {
//         if (response) {
//           this.messageService.add({ severity: 'success', summary: 'יומן עבודה עודכן בהצלחה' });
//           this.getWorkLogs();
//         } else {
//           this.messageService.add({ severity: 'error', summary: 'שגיאה בעדכון יומן העבודה' });
//         }
//       }
//     );
//   }
//   updateTimeEntry(id: string, updateTimeEntryDto: UpdateTimeEntryDto) {
//     this.workLogService.updateTimeEntry(id, updateTimeEntryDto).subscribe(
//       response => {
//         if (response) {
//           this.messageService.add({ severity: 'success', summary: 'זמן הכניסה והיציאה עודכנו בהצלחה' });
//           this.getWorkLogs(); // רענון רשימת יומני העבודה לאחר העדכון
//         } else {
//           this.messageService.add({ severity: 'error', summary: 'שגיאה בעדכון זמן הכניסה והיציאה' });
//         }
//       },
//       error => {
//         console.error('Error updating time entry:', error);
//         this.messageService.add({ severity: 'error', summary: 'שגיאה בשרת - נסה שוב מאוחר יותר' });
//       }
//     );
//   }
//   createWorkLog(workLog: WorkLog) {
//     this.workLogService.createWorkLog(workLog).subscribe(
//       response => {
//         if (response) {
//           this.messageService.add({ severity: 'success', summary: 'יומן עבודה נוצר בהצלחה' });
//           this.getWorkLogs();
//         } else {
//           this.messageService.add({ severity: 'error', summary: 'שגיאה ביצירת יומן העבודה' });
//         }
//       }
//     );
//   }

//   calculateHours(checkIn: Date, checkOut: Date): number {
//     if (!checkIn || !checkOut) {
//         return 0;
//     }

//     // Convert strings to Date objects if necessary
//     if (typeof checkIn === 'string') {
//         checkIn = new Date(checkIn);
//     }
//     if (typeof checkOut === 'string') {
//         checkOut = new Date(checkOut);
//     }

//     const diffMilliseconds = Math.abs(checkOut.getTime() - checkIn.getTime());
//     const diffSeconds = diffMilliseconds / 1000;

//     const hours = Math.floor(diffSeconds / 3600);
//     const minutes = Math.floor((diffSeconds % 3600) / 60);
//     const seconds = Math.floor(diffSeconds % 60);

//     const totalHours = hours + (minutes / 60) + (seconds / 3600);
//     const roundedHours = Math.round(totalHours * 100) / 100;

//     return roundedHours;
// }

// }

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
import * as FileSaver from 'file-saver';

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
            this.groupWorkLogsByDate();
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

  groupWorkLogsByDate() {
    const grouped = this.workLogs.reduce((acc, log) => {
      const date = new Date(log.date).toLocaleDateString('en-CA');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log);
      return acc;
    }, {});

    this.groupedWorkLogs = Object.keys(grouped).map(date => {
      const logs = grouped[date];
      const totalHoursWorked = logs.reduce((sum, log) => {
        return sum + log.timeEntries.reduce((entrySum, entry) => {
          return entrySum + (entry.hoursWorked || 0);
        }, 0);
      }, 0);
      return { date, logs, totalHoursWorked, expanded: false, employeeId: logs[0].employeeId };
    });
  }

  hasOpenTimeEntry(logGroup: any): boolean {
    return logGroup.logs.some((log: WorkLog) => log.timeEntries.some((entry: TimeEntry) => !entry.checkOut));
  }

  checkIn() {
    if (!this.employeeId) {
      alert('Error: Employee ID not available.');
      return;
    }

    const today = new Date();
    const existingWorkLog = this.workLogs.find(log => log.employeeId === this.employeeId && this.isToday(new Date(log.date)));

    if (existingWorkLog) {
      const newTimeEntry: TimeEntry = {
        checkIn: today,
        checkOut: null,
        hoursWorked: 0
      };
      existingWorkLog.timeEntries.push(newTimeEntry);
      this.updateWorkLog(existingWorkLog);
    } else {
      const newTimeEntry: TimeEntry = {
        checkIn: today,
        checkOut: null,
        hoursWorked: 0
      };
      const newWorkLog: WorkLog = {
        employeeId: this.employeeId,
        date: today,
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

    const today = new Date();
    const existingWorkLog = this.workLogs.find(log => log.employeeId === this.employeeId && this.isToday(new Date(log.date)));

    if (!existingWorkLog) {
      alert('Please check in before checking out.');
      return;
    }

    const currentEntry = existingWorkLog.timeEntries.find(entry => !entry.checkOut);

    if (!currentEntry) {
      alert('No open entry found.');
      return;
    }

    currentEntry.checkOut = today;
    currentEntry.hoursWorked = this.calculateHours(currentEntry.checkIn, currentEntry.checkOut);
    this.updateWorkLog(existingWorkLog);
  }

  editWorkLog(log: any) {
    this.selectedLog = log;
    this.selectedEntry = null;
    this.displayDialog = true;
  }

  editTimeEntry(logGroup: any, entry: TimeEntry) {
    console.log(logGroup);
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
        id: this.selectedLog.logs[0]._id,
        timeEntries: this.selectedLog.logs.flatMap((log: any) => log.timeEntries.map((entry: any) => ({
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
  // saveEditedWorkLog() {
  //   if (this.selectedLog && this.selectedEntry) {
  //     console.log(this.selectedLog.logs[0]._id);
  //     const updateDto: UpdateWorkLogDto = {
  //       id: this.selectedLog.logs[0]._id,
  //       timeEntries: this.selectedLog.logs.flatMap((log: any) => log.timeEntries.map((entry: any) => ({
  //         _id: entry._id,
  //         checkIn: entry.checkIn,
  //         checkOut: entry.checkOut,
  //         hoursWorked: entry.hoursWorked
  //       })))
  //     };
  //     console.log(updateDto);
  //     this.updateWorkLog(updateDto);
  //     this.displayDialog = false;
  //   }
  // }
  
  
  

  cancelEdit() {
    this.displayDialog = false;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  updateWorkLog(workLog: any) {
    this.workLogService.updateWorkLog(workLog.id, workLog.timeEntries).subscribe(
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
    const diff = Math.abs(checkOut.getTime() - checkIn.getTime());
    return diff / (1000 * 60 * 60);
  }
  exportToExcel() {
    const month = new Date().getMonth() + 1; // לדוגמה, יכול להיות לך צורך להשתמש במשתנים אחרים כמו שנה וכדומה
    const year = new Date().getFullYear();
    
    this.workLogService.exportWorkLogs(month, year).subscribe(
      (blob: Blob) => {
        const filename = `work-logs-${month}-${year}.xlsx`;
        
        
FileSaver.saveAs(blob, filename);
      },
      (error) => {
        console.error('Error exporting work logs to Excel:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to export work logs to Excel.' });
      }
    );
  }
}
