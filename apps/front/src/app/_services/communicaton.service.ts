import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Communication } from '../_models/communication.module';
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private apiUrl = 'http://localhost:8080/communications';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllCommunications(): Observable<Communication[]> {
    return this.http.post<Communication[]>(`${this.apiUrl}/all`, {})
      .pipe(
        catchError(this.handleError<Communication[]>('getAllCommunications', []))
      );
  }

  getCommunicationsByClientId(clientId: string): Observable<Communication[]> {
    return this.http.post<Communication[]>(`${this.apiUrl}/by-client`, { clientId }, this.httpOptions)
      .pipe(
        catchError(this.handleError<Communication[]>('getCommunicationsByClientId', []))
      );
  }

  createCommunication(communication: Communication): Observable<Communication> {
    return this.http.post<Communication>(`${this.apiUrl}/create`, communication, this.httpOptions)
      .pipe(
        catchError(this.handleError<Communication>('createCommunication'))
      );
  }

  updateCommunication(id: string, communication: Communication): Observable<Communication> {
    return this.http.post<Communication>(`${this.apiUrl}/update`, { id, ...communication }, this.httpOptions)
      .pipe(
        catchError(this.handleError<Communication>('updateCommunication'))
      );
  }

  deleteCommunication(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/delete`, { id }, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('deleteCommunication'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
