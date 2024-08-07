import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YearlyReport } from '../_models/yearlyReport.module';
import { YEARLYREPORT } from '../api-urls';
import { catchError, map, Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class YearlyReportService {
  
  constructor(private http: HttpClient) {}

  private apiUrl = YEARLYREPORT;

  // Create a new yearly report
  createYearlyReport(yearlyReport: YearlyReport): Observable<YearlyReport> {
    return this.http.post<YearlyReport>(`${this.apiUrl}/create`, yearlyReport)
      .pipe(
        catchError(this.handleError<YearlyReport>('createYearlyReport'))
      );
  }

  // Get all yearly reports
  getAllYearlyReports(): Observable<YearlyReport[]> {
    return this.http
      .get<YearlyReport[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError<YearlyReport[]>('getAllYearlyReports', []))
      );
  }

  // Get all yearly reports for a specific client (filtered on the client side)
  getYearlyReportsForClient(clientId: string): Observable<YearlyReport[]> {
    return this.getAllYearlyReports().pipe(
      map((reports) =>
        reports.filter((report) => report.idClient === clientId)
      ),
      catchError(
        this.handleError<YearlyReport[]>('getYearlyReportsForClient', [])
      )
    );
  }

  // Update an existing yearly report
  updateYearlyReport(id: string, yearlyReport: YearlyReport): Observable<YearlyReport> {
    console.log('updateYearlyReportSEvucec', yearlyReport);
    return this.http.post<YearlyReport>(`${this.apiUrl}/update/${id}`, yearlyReport)
      .pipe(
        catchError(this.handleError<YearlyReport>('updateYearlyReport'))
      );
  }

  // Delete a yearly report by ID
  deleteYearlyReport(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteYearlyReport', false))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      // Return the error message or a default error message
      return throwError(error.error?.message || 'An error occurred');
    };
  }
}
