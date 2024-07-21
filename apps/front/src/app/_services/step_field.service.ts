import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../_models/client.module'; // Update the path according to the location of your model
import { CLIENT_ENDPOINT } from '../api-urls';
import { StepField } from '../_models/stepField.module';
@Injectable({
  providedIn: 'root'
})
export class stepFieldService {

  // private apiUrl = CLIENT_ENDPOINT; // Base URL for the Client API
  private apiUrl = 'http://localhost:8080/step-field'; // Base URL for the Client API
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }

  // Create stepField
  createStepField(stepField: StepField): Observable<StepField> {
    return this.http.post<StepField>(this.apiUrl, stepField, this.httpOptions)
      .pipe(
        catchError(this.handleError<StepField>('createStepField'))
      );
  }

  // Get all Clients
  getAllStepField(): Observable<StepField[]> {
    return this.http.get<StepField[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError<StepField[]>('getAllStepField', []))
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
  updateStepField(StepField: StepField): Observable<StepField> {
    return this.http.post<StepField>(`${this.apiUrl}/update/${StepField._id}`, StepField, this.httpOptions)
      .pipe(
        catchError(this.handleError<StepField>('updateStepField'))
      );
  }

  // Delete a StepField by ID
  deleteStepField(id: string): Observable<boolean> {
    console.log("server id",id)
    return this.http.post<boolean>(`${this.apiUrl}/delete`,   {id} ,this.httpOptions )
      .pipe(
        catchError(this.handleError<boolean>('deleteStepField', false))
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

