import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Priority } from '../_models/priority.module'; // Update the path according to the location of your model
import { PRIORITY } from '../api-urls';

import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  private apiUrl = PRIORITY;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // Create a new Client
  createPriority(Priority: Priority): Observable<Priority> {
    return this.http
      .post<Priority>(this.apiUrl, Priority, this.httpOptions)
      .pipe(catchError(this.handleError<Priority>('createClient')));
  }

  // Get all Clients
  getAllPrioritys(): Observable<Priority[]> {
    return this.http
      .get<Priority[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError<Priority[]>('getAllClients', [])));
  }

  // Search for a Client by ID
  searchPriority(id: string): Observable<Priority[]> {
    return this.http
      .post<Priority[]>(`${this.apiUrl}/searchClient`, { id }, this.httpOptions)
      .pipe(catchError(this.handleError<Priority[]>('searchClient', [])));
  }

  // Update an existing Client
  updatePriority(client: Priority): Observable<Priority> {
    return this.http
      .put<Priority>(`${this.apiUrl}`, client, this.httpOptions)
      .pipe(catchError(this.handleError<Priority>('updateClient')));
  }

  // Delete a Priority by ID
  deletePriority(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(catchError(this.handleError<boolean>('deletePriority', false)));
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }
}
