import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../_models/client.module'; // Update the path according to the location of your model
import { CLIENT_ENDPOINT } from '../api-urls';
import { stepFieldMonth } from '../_models/stepFieldMonth.module';
@Injectable({
  providedIn: 'root'
})
export class stepFieldMonthService {

  // private apiUrl = CLIENT_ENDPOINT; // Base URL for the Client API
  private apiUrl = 'http://localhost:8080/step-field'; // Base URL for the Client API
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }

  // Create stepFieldMonth
  createstepFieldMonth(stepFieldMonth: stepFieldMonth): Observable<stepFieldMonth> {
    return this.http.post<stepFieldMonth>(`${this.apiUrl}/create`, stepFieldMonth, this.httpOptions)
      .pipe(
        catchError(this.handleError<stepFieldMonth>('createstepFieldMonth'))
      );
  }

  // Get all Clients
  getAllstepFieldMonth(): Observable<stepFieldMonth[]> {
    return this.http.get<stepFieldMonth[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError<stepFieldMonth[]>('getAllstepFieldMonth', []))
      );
  }

  // Search for a Client by ID
  searchClient(id: string): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/searchClient`, { id }, this.httpOptions)
      .pipe(
        catchError(this.handleError<Client>('searchClient'))
      );
  }

  // Update an existing Client
  updatestepFieldMonth(stepFieldMonth: stepFieldMonth): Observable<stepFieldMonth> {
    return this.http.post<stepFieldMonth>(`${this.apiUrl}/update/${stepFieldMonth._id}`, stepFieldMonth, this.httpOptions)
      .pipe(
        catchError(this.handleError<stepFieldMonth>('updatestepFieldMonth'))
      );
  }

  // Delete a stepFieldMonth by ID
  deletestepFieldMonth(id: string): Observable<boolean> {
    console.log("server id",id)
    return this.http.post<boolean>(`${this.apiUrl}/delete`,   {id} ,this.httpOptions )
      .pipe(
        catchError(this.handleError<boolean>('deletestepFieldMonth', false))
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

