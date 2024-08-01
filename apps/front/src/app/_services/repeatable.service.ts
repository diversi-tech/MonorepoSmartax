import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { RepeatableTask } from '../_models/repeatable.module';
import { REPEATABLE_ENDPOINT } from '../api-urls';

@Injectable({
  providedIn: 'root',
})
export class RepeatableTaskService {
  private apiUrl = REPEATABLE_ENDPOINT; // Base URL for the Client API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) {}

  // Create a new RepeatableTask
  createRepeatableTask(
    RepeatableTask: RepeatableTask
  ): Observable<RepeatableTask> {
    return this.http
      .post<RepeatableTask>(
        this.apiUrl + '/create',
        RepeatableTask,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<RepeatableTask>('createClient')));
  }

  // Get all RepeatableTasks
  getAllRepeatableTasks(): Observable<RepeatableTask[]> {
    return this.http
      .get<RepeatableTask[]>(`${this.apiUrl + '/findAll'}`)
      .pipe(
        catchError(
          this.handleError<RepeatableTask[]>('getAllRepeatableTasks', [])
        )
      );
  }

  // Search for a Client by ID
  searchRepeatableTask(id: string): Observable<RepeatableTask> {
    console.log('id in FE' + id);

    return this.http
      .post<RepeatableTask>(`${this.apiUrl}/findOne`, { id }, this.httpOptions)
      .pipe(catchError(this.handleError<RepeatableTask>('findOne')));
  }

  // Update an existing Client
  updateRepeatableTask(
    id: string,
    RepeatableTask: RepeatableTask
  ): Observable<RepeatableTask> {
    return this.http
      .put<RepeatableTask>(
        `${this.apiUrl}/update/${id}`,
        RepeatableTask,
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError<RepeatableTask>('updateRepeatableTask'))
      );
  }

  // Delete a RepeatableTask by ID
  deleteRepeatableTask(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteRepeatableTask', false))
      );
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }

  //
}
