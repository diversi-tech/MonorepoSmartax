import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YearlyReport } from '../_models/yearlyReport.module';
import { USER_ENDPOINT, YEARLYREPORT } from '../api-urls';
import { catchError, map, Observable, of } from 'rxjs';

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
    return this.http
      .post<YearlyReport>(`${this.apiUrl}/create`, yearlyReport)
      .pipe(catchError(this.handleError<YearlyReport>('createYearlyReport')));
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
  async updateYearlyReport(
    id: string,
    yearlyReport: YearlyReport
  ): Promise<YearlyReport> {
    try {
      const response = await this.http
        .post<YearlyReport>(`${this.apiUrl}/update/${id}`, yearlyReport)
        .toPromise();
      return response;
    } catch (error) {
      this.handleError<YearlyReport>('updateYearlyReport', error);
      throw error; // Re-throw the error if needed
    }
  }

  // Delete a yearly report by ID
  deleteYearlyReport(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}`, { body: { id } })
      .pipe(catchError(this.handleError<boolean>('deleteYearlyReport', false)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }
}
