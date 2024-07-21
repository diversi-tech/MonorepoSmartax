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
  exportWorkLogsForEmployee(employeeId: string, month: number, year: number): Observable<Blob> {
    const url = `${this.apiUrl}/export/${employeeId}/${month}/${year}`;
    return this.http.get(url, { responseType: 'blob' });
  }
   getWorkLogsByEmployeeId(employeeId: string): Observable<WorkLog[]> {
    const url = `${this.apiUrl}/employee/${employeeId}`;
    return this.http.get<{ data: WorkLog[] }>(url).pipe(
      map(response => response.data)
    );
  }
}
