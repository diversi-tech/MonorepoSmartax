import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WorkLog } from '../_models/workLog.model';
import { UpdateTimeEntryDto } from '../../../../../timesheet/src/dto/workLog.dto';
import { WORK_LOGS } from '../api-urls';

@Injectable({
  providedIn: 'root',
})
export class WorkLogService {
  // private apiUrl = WORK_LOGS;
  private apiUrl = 'https://api-gateway-m7cv.onrender.com';


  constructor(private http: HttpClient) {}

getWorkLogs(employeeId?: string): Observable<WorkLog[]> {
  let url = this.apiUrl;
  if (employeeId) {    
    url += `/findByEmployeeId/${employeeId}`;
  }
  url += '/findAll';
  return this.http.get<{ data: WorkLog[] }>(url).pipe(
    map(response => response.data)
  );
}


  createWorkLog(workLog: WorkLog): Observable<WorkLog> {
    let url = `${this.apiUrl}/create`;
    return this.http
      .post<{ data: WorkLog }>(url, workLog)
      .pipe(map((response) => response.data));
  }

  updateWorkLog(id: string, timeEntries: any[]): Observable<WorkLog> {
    return this.http
      .put<{ data: WorkLog }>(`${this.apiUrl}/update/${id}`, {
        updateWorkLogDto: { timeEntries },
      })
      .pipe(map((response) => response.data));
  }

  updateTimeEntry(
    id: string,
    updateTimeEntryDto: UpdateTimeEntryDto
  ): Observable<WorkLog> {
    return this.http
      .put<{ data: WorkLog }>(
        `${this.apiUrl}/findByEmployeeId/${id}`,
        updateTimeEntryDto
      )
      .pipe(map((response) => response.data));
  }

  exportWorkLogs(month: number, year: number): Observable<Blob> {
    const url = `${this.apiUrl}/export/${month}/${year}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  exportWorkLogsForEmployee(
    employeeId: string,
    month: number,
    year: number
  ): Observable<Blob> {
    const url = `${this.apiUrl}/export/${employeeId}/${month}/${year}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  getWorkLogsByEmployeeId(employeeId: string): Observable<WorkLog[]> {
    console.log(employeeId);
    const url = `${this.apiUrl}/findByEmployeeId/${employeeId}`;
    return this.http
      .get<{ data: WorkLog[] }>(url)
      .pipe(map((response) => response.data));
  }
}
