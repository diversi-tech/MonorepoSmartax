import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Client } from '../_models/client.module';
import { CreateSensitiveDataDto } from '../../../../../server/src/Models/dto/sensitiveData.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/clients';
  private sensitiveDataUrl = 'http://localhost:8080/SensitiveData'; // Base URL for the Sensitive Data API
  allClients: Client[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }


  // Create a new Client
  createClient(client: Client): Observable<Client> {

    return this.isIDExists(client).pipe(
      switchMap(exists => {
        if (exists) {
          return throwError(() => new Error('תעודת זהות כבר קיימת.'));
        } else {
          return this.http.post<Client>(`${this.apiUrl}`, client, this.httpOptions)
          
            .pipe(
              catchError(this.handleError<Client>('updateClient'))
            );
        }
      })
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
  updateClient(client: Client): Observable<Client> {
    console.log('Updating client ' + client.tz);
    return this.isIDExists(client).pipe(
      switchMap(exists => {
        if (exists) {
          return throwError(() => new Error('תעודת זהות כבר קיימת.'));
          alert("ת.ז כבר קיימת במערכת")
        } else {
          return this.http.put<Client>(`${this.apiUrl}`, client, this.httpOptions)
            .pipe(
              catchError(this.handleError<Client>('updateClient'))
            );
        }
      })
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

  private isIDExists(client: Client): Observable<boolean> {
    return this.getAllClients().pipe(
      map(clients => !!clients.find(c => c.tz === client.tz && c._id !== client._id)),
      catchError(() => of(false)) // Handle error and return false in case of an error
    );
  }
  
  
}

