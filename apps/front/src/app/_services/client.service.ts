import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../_models/client.module'; // Update the path according to the location of your model
import { CLIENT_ENDPOINT } from '../api-urls';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // private apiUrl = CLIENT_ENDPOINT; // Base URL for the Client API
  private apiUrl = 'http://localhost:8080/clients'; // Base URL for the Client API
  // private apiUrl = '/api/clients';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }

  // Create a new Client
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client, this.httpOptions)
      .pipe(
        catchError(this.handleError<Client>('createClient'))
      );
  }

  // Get all Clients
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError<Client[]>('getAllClients', []))
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
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}`, client, this.httpOptions)
      .pipe(
        catchError(this.handleError<Client>('updateClient'))
      );
  }

  // Delete a Client by ID
  deleteClient(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteClient', false))
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

