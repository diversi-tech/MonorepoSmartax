import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Client } from '../_models/client.module';
import { CreateSensitiveDataDto } from '../../../../../server/src/Models/dto/sensitiveData.dto'; // Update the path according to your project structure

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/clients'; 
  private sensitiveDataUrl = 'http://localhost:8080/SensitiveData'; // Base URL for the Sensitive Data API

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
  fetchSensitiveDataForClient(clientId: string): Observable<CreateSensitiveDataDto[]> {
    return this.searchClient(clientId).pipe(
      switchMap(client => {
        if (client && client.encryptedPasswords && client.encryptedPasswords.length > 0) {
          const sensitiveDataRequests = client.encryptedPasswords.map(id => 
            this.http.get<CreateSensitiveDataDto>(`${this.sensitiveDataUrl}/${id}`)
          );
          return forkJoin(sensitiveDataRequests);
        } else {
          return of([]); // Return an empty array if no encryptedPasswords found
        }
      }),
      catchError(this.handleError<CreateSensitiveDataDto[]>('fetchSensitiveDataForClient', []))
    );
  }
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

