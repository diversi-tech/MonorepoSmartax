// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { WorkLog } from '../_models/workLog.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class WorkLogService {
//   private apiUrl = `http://localhost:8080/work-log`;

//   constructor(private http: HttpClient) {}

//   getWorkLogs(employeeId?: string): Observable<WorkLog[]> {
//     let url = this.apiUrl;
//     if (employeeId) {
//       url += `?employeeId=${employeeId}`;
//     }
//     return this.http.get<WorkLog[]>(url);
//   }

//   createWorkLog(workLog: WorkLog): Observable<WorkLog> {
//     return this.http.post<WorkLog>(this.apiUrl, workLog);
//   }

//   updateWorkLog(id: string, checkIn: Date, checkOut: Date, hoursWorked: number): Observable<WorkLog> {
//     const url = `${this.apiUrl}/${id}`;
//     const updateDto = { id, checkIn, checkOut, hoursWorked };
//     return this.http.put<WorkLog>(url, updateDto);
//   }

//   exportWorkLogs(month: number, year: number): Observable<Blob> {
//     const url = `${this.apiUrl}/export/${month}/${year}`;
//     return this.http.get(url, { responseType: 'blob' });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkLog } from '../_models/workLog.model';

@Injectable({
  providedIn: 'root'
})
export class WorkLogService {
  private apiUrl = 'http://localhost:8080/work-log';

  constructor(private http: HttpClient) {}

  getWorkLogs(): Observable<WorkLog[]> {
    return this.http.get<WorkLog[]>(`${this.apiUrl}`);
  }

  createWorkLog(createWorkLogDto: any): Observable<WorkLog> {
    return this.http.post<WorkLog>(`${this.apiUrl}`, createWorkLogDto);
  }

  updateWorkLog(updateWorkLogDto: any): Observable<WorkLog> {
    const { id, timeEntries } = updateWorkLogDto;
    return this.http.put<WorkLog>(`${this.apiUrl}/${id}`, { timeEntries });
  }

  updateTimeEntry(id: string, entryId: string, updateTimeEntryDto: any): Observable<WorkLog> {
    return this.http.put<WorkLog>(`${this.apiUrl}/${id}/time-entries/${entryId}`, updateTimeEntryDto);
  }

  exportWorkLogs(month: number, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/export/${year}/${month}`, { responseType: 'blob' });
  }
}
