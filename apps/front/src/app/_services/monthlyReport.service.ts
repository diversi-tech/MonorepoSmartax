import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonthlyReport } from '../_models/monthlyReport.module';
import { MONTHLY_REPORT, STEP_FIELD_MONTH } from '../api-urls';
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
  constructor(@Inject(HttpClient) private http: HttpClient) {}

 
  private apiUrl = MONTHLY_REPORT;
  private stepapiUrl = STEP_FIELD_MONTH;
  createMonthlyReport(monthlyReport: any): Observable<MonthlyReport> {
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
  getAllTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.stepapiUrl}/types`)
      .pipe(
        catchError(this.handleError<string[]>('getAllMonthlyReport', []))
      );
  } 
   getAllValuesForType(type:string): Observable<string[]> {
    return this.http.get<string[]>(`${this.stepapiUrl}/values/${type}`)
      .pipe(
        catchError(this.handleError<string[]>('getAllMonthlyReport', []))
      );
  }



   updateMonthlyReport(id: string, monthlyReport: MonthlyReport): Observable<MonthlyReport> {
    try {
      return  this.http.post<MonthlyReport>(`${this.apiUrl}/update/${id}`, monthlyReport);
    } catch (error) {
      this.handleError<MonthlyReport>('updateMonthlyReport', error);
      throw error;
    }
  }

  deleteMonthlyReport(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { body: { id } })
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
