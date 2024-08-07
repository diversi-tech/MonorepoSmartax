import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YearlyReport } from '../_models/yearlyReport.module';
import { USER_ENDPOINT, YEAR, YEARLYREPORT, YEARS } from '../api-urls';
import { catchError, map, Observable, of } from 'rxjs';
import { Year } from '../_models/year.module';

@Injectable({
  providedIn: 'root',
})
export class YearService {
  constructor(private http: HttpClient) {}

  private apiUrl = YEAR;

  // Create a new yearly report
  createYear(year: Year): Observable<any> {
    return this.http
      .post<Year>(this.apiUrl, year)
      .pipe(catchError(this.handleError<YearlyReport>('createYear')));
  }

  // Get all yearly reports
  getAllYear(): Observable<Year[]> {
    console.log('se');
    return this.http
      .get<Year[]>(`${YEARS}/all`)
      .pipe(catchError(this.handleError<Year[]>('getAllYearlyReports', [])));
  }

  // Delete a yearly report by ID
  deleteYear(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteYear', false))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }
}
