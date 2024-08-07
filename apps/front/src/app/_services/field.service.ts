import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Field } from '../_models/field.module';
import { FIELD } from '../api-urls'; // Update the path according to the location of your model

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  private apiUrl = FIELD;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // Create a new Field
  createField(field: Field): Observable<Field> {
    return this.http
      .post<Field>(this.apiUrl, field, this.httpOptions)
      .pipe(catchError(this.handleError<Field>('createField')));
  }

  // Get all Fields
  getAllField(): Observable<Field[]> {
    return this.http
      .get<Field[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError<Field[]>('getAllField', [])));
  }

  // Search for a Field by ID
  searchField(id: string): Observable<Field[]> {
    return this.http
      .post<Field[]>(`${this.apiUrl}/searchField`, { id }, this.httpOptions)
      .pipe(catchError(this.handleError<Field[]>('searchField', [])));
  }

  // Update an existing Field
  updateClientType(field: Field): Observable<Field> {
    return this.http
      .put<Field>(`${this.apiUrl}`, field, this.httpOptions)
      .pipe(catchError(this.handleError<Field>('updateField')));
  }

  // Delete a Field by ID
  deleteField(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(catchError(this.handleError<boolean>('deleteField', false)));
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }
}
