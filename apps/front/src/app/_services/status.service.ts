import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { STATUS_ENDPOINT } from '../api-urls'
import { Status } from '../_models/status.module';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  private apiUrl = STATUS_ENDPOINT;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }



  // Search for a Client by ID
  searchStatus(id: string): Observable<Status[]> {
    return this.http.post<Status[]>(`${this.apiUrl}/searchClient`, { id }, this.httpOptions)
      .pipe(
        catchError(this.handleError<Status[]>('searchClient', []))
      );
  }

  // Update an existing Client
  updateStatus(client: Status): Observable<Status> {
    return this.http.put<Status>(`${this.apiUrl}`, client, this.httpOptions)
      .pipe(
        catchError(this.handleError<Status>('updateClient'))
      );
  }

  // Delete a Status by ID
  deleteStatus(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteStatus', false))
      );
 }
  // Create a new Status
  createStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, status, this.httpOptions)
      .pipe(
        catchError(this.handleError<Status>('createStatus'))
      );
  }

  // Get all Statuses
  getAllStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError<Status[]>('getAllStatuses', []))
      );
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }

}

