// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { WorkLog } from '../_models/workLog.model';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class WorkLogService {
// //   private apiUrl = `http://localhost:8080/work-log`;

// //   constructor(private http: HttpClient) {}

// //   getWorkLogs(employeeId?: string): Observable<WorkLog[]> {
// //     let url = this.apiUrl;
// //     if (employeeId) {
// //       url += `?employeeId=${employeeId}`;
// //     }
// //     return this.http.get<WorkLog[]>(url);
// //   }

// //   createWorkLog(workLog: WorkLog): Observable<WorkLog> {
// //     return this.http.post<WorkLog>(this.apiUrl, workLog);
// //   }

// //   updateWorkLog(id: string, checkIn: Date, checkOut: Date, hoursWorked: number): Observable<WorkLog> {
// //     const url = `${this.apiUrl}/${id}`;
// //     const updateDto = { id, checkIn, checkOut, hoursWorked };
// //     return this.http.put<WorkLog>(url, updateDto);
// //   }

// //   exportWorkLogs(month: number, year: number): Observable<Blob> {
// //     const url = `${this.apiUrl}/export/${month}/${year}`;
// //     return this.http.get(url, { responseType: 'blob' });
// //   }
// // }
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { WorkLog } from '../_models/workLog.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class WorkLogService {
//   private apiUrl =`http://localhost:8080/work-log` ;

//   constructor(private http: HttpClient) {}

//   getWorkLogs(): Observable<WorkLog[]> {
//     return this.http.get<WorkLog[]>(`${this.apiUrl}`);
//   }

//   createWorkLog(workLog: WorkLog): Observable<any> {
//     return this.http.post(`${this.apiUrl}`, workLog);
//   }

//   updateWorkLog(id: string, timeEntries: any[]): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, { timeEntries });
//   }
// }
//===========================//
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, Observable } from 'rxjs';
// import { WorkLog } from '../_models/workLog.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class WorkLogService {
//   private apiUrl = 'http://localhost:8080/work-log';

//   constructor(private http: HttpClient) {}

//   getWorkLogs(employeeId?: string): Observable<WorkLog[]> {
//     let url = this.apiUrl;
//     if (employeeId) {
//       url += `?employeeId=${employeeId}`;
//     }
//     return this.http.get<{ data: WorkLog[] }>(url).pipe(
//       map(response => response.data)
//     );
//   }

//   createWorkLog(workLog: WorkLog): Observable<WorkLog> {
//     return this.http.post<WorkLog>(this.apiUrl, workLog);
//   }

//   updateWorkLog(id: string, timeEntries: any[]): Observable<WorkLog> {
//     return this.http.put<WorkLog>(`${this.apiUrl}/${id}`, { timeEntries });
//   }

//   exportWorkLogs(month: number, year: number): Observable<Blob> {
//     const url = `${this.apiUrl}/export/${month}/${year}`;
//     return this.http.get(url, { responseType: 'blob' });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WorkLog } from '../_models/workLog.model';
import { UpdateTimeEntryDto } from "../../../../../server/src/Models/dto/workLog.dto";

@Injectable({
  providedIn: 'root'
})
export class WorkLogService {
  private apiUrl = 'http://localhost:8080/worklogs';

  constructor(private http: HttpClient) {}

  getWorkLogs(employeeId?: string): Observable<WorkLog[]> {
    let url = this.apiUrl;
    if (employeeId) {
      url += `/${employeeId}`;
    }
    return this.http.get<{ data: WorkLog[] }>(url).pipe(
      map(response => response.data)
    );
  }

  createWorkLog(workLog: WorkLog): Observable<WorkLog> {
    return this.http.post<{ data: WorkLog }>(this.apiUrl, workLog).pipe(
      map(response => response.data)
    );
  }

  updateWorkLog(id: string, timeEntries: any[]): Observable<WorkLog> {
    return this.http.put<{ data: WorkLog }>(`${this.apiUrl}/${id}`, { timeEntries }).pipe(
      map(response => response.data)
    );
  }
  updateTimeEntry(id: string, updateTimeEntryDto: UpdateTimeEntryDto): Observable<WorkLog> {
    return this.http.put<{ data: WorkLog }>(`${this.apiUrl}/${id}/time-entries`, updateTimeEntryDto).pipe(
      map(response => response.data)
    );
  }
  
  exportWorkLogs(month: number, year: number): Observable<Blob> {
    const url = `${this.apiUrl}/export/${month}/${year}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
