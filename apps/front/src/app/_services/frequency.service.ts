import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Frequency } from '../_models/frequency.module';

import { Observable, catchError, of } from 'rxjs';
import { FREQUENCY_ENDPOINT } from '../api-urls';

@Injectable({
  providedIn: 'root',
})
export class FrequencyService {
  private apiUrl = FREQUENCY_ENDPOINT; // Base URL for the Client API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) {}

  createFrequency(Frequency: Frequency): Observable<Frequency> {
    return this.http
      .post<Frequency>(this.apiUrl, Frequency, this.httpOptions)
      .pipe(catchError(this.handleError<Frequency>('createClient')));
  }

  // Get all Clients
  getAllFrequencys(): Observable<Frequency[]> {
    return this.http
      .get<Frequency[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError<Frequency[]>('getAllClients', [])));
  }

  // Search for a Client by ID
  searchFrequency(id: string): Observable<Frequency[]> {
    return this.http
      .post<Frequency[]>(
        `${this.apiUrl}/searchClient`,
        { id },
        this.httpOptions
      )
      .pipe(catchError(this.handleError<Frequency[]>('searchClient', [])));
  }

  // Update an existing Client
  updateFrequency(client: Frequency): Observable<Frequency> {
    return this.http
      .put<Frequency>(`${this.apiUrl}`, client, this.httpOptions)
      .pipe(catchError(this.handleError<Frequency>('updateClient')));
  }

  // Delete a Frequency by ID
  deleteFrequency(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(catchError(this.handleError<boolean>('deleteFrequency', false)));
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }
}
