import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkLog } from '../_models/workLog.model';

@Injectable({
  providedIn: 'root'
})
export class WorkLogService {
  private apiUrl = `http://localhost:8080/work-log`;
  
  constructor(private http: HttpClient) {}

  getWorkLogs(): Observable<WorkLog[]> {
    return this.http.get<WorkLog[]>(this.apiUrl);
  }

  createWorkLog(workLog: WorkLog): Observable<WorkLog> {
    return this.http.post<WorkLog>(this.apiUrl, workLog);
  }

  updateWorkLog(id: string, checkIn: Date, checkOut: Date, hoursWorked: number): Observable<WorkLog> {
    const url = `${this.apiUrl}/${id}`;
    const updateDto = { id, checkIn, checkOut, hoursWorked };
    return this.http.put<WorkLog>(url, updateDto);
  }

  exportWorkLogs(month: number, year: number): Observable<Blob> {
    const url = `${this.apiUrl}/export/${month}/${year}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
