import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonthlyReport } from '../_models/monthlyReport.module';
import { MONTHLY_REPORT } from '../api-urls';
import { catchError, map, Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class MonthlyReportService {
  constructor(
    private http: HttpClient,) { }

  private apiUrl =MONTHLY_REPORT;

 createMonthlyReport(monthlyReport: MonthlyReport): Observable<MonthlyReport> {
    return this.http.post<MonthlyReport>(`${this.apiUrl}/create`, monthlyReport)
      .pipe(
        catchError(this.handleError<MonthlyReport>('createMonthlyReport'))
      );
  }

  getAllMonthlyReport(): Observable<MonthlyReport[]> {
    return this.http.get<MonthlyReport[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError<MonthlyReport[]>('getAllMonthlyReport', []))
      );
  }

   getMonthlyReportForClient(clientId: string): Observable<MonthlyReport[]> {
    return this.getAllMonthlyReport().pipe(
      map(reports => reports.filter(report => report.idUser === clientId)),
      catchError(this.handleError<MonthlyReport[]>('getMonthlyReportForClient', []))
    );
  }

  
 

async updateMonthlyReport(id: string, monthlyReport: MonthlyReport): Promise<MonthlyReport> {
  try {
      const response = await this.http.post<MonthlyReport>(`${this.apiUrl}/update/${id}`, monthlyReport).toPromise();
      return response;
  } catch (error) {
      this.handleError<MonthlyReport>('updateMonthlyReport', error);
      throw error; 
  }
}

  deleteMonthlyReport(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, {  body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteMonthlyReport', false))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); 
      return of(result as T); 
    };
  }
  
  
}
