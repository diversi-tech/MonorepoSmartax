import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CLIENTFIELD_ENDPOINT } from '../api-urls';
import { ClientField } from '../_models/clientField.module';

@Injectable({
  providedIn: 'root'
})
export class ClientFieldService {

  private apiUrl = CLIENTFIELD_ENDPOINT;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
  };

  constructor(private http: HttpClient) { }

  // Create a new ClientField
  createClientField(clientField: ClientField, CId: string): Observable<ClientField> {
    return this.http.post<ClientField>(this.apiUrl, { clientField, CId }, this.httpOptions)
      .pipe(
        catchError(this.handleError<ClientField>('createClientField'))
      );
  }

  createClientFieldsByClientType( clientTypeId: string , clientId: string): Observable<ClientField[]> {
    return this.http.post<ClientField[]>(`${this.apiUrl}/createByClientType`, {clientTypeId , clientId});
  }

  // Get all ClientFields
  getAllClientFields(): Observable<ClientField[]> {
    return this.http.get<ClientField[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError<ClientField[]>('getAllClientFields', []))
      );
  }

  // Search for a ClientField by ID
  searchClientField(id: string): Observable<ClientField> {
    return this.http.post<ClientField>(`${this.apiUrl}/searchClientField`, { id }, this.httpOptions)
      .pipe(
        catchError(this.handleError<ClientField>('searchClientField'))
      );
  }

  // Update an existing ClientField
  updateClientField(clientField: ClientField): Observable<ClientField> {
    try {
        const res = this.http.put<ClientField>(`${this.apiUrl}/${clientField._id}`, clientField)
        return res
    } catch (err) {
        console.log(err);
    }
}

  // Delete a ClientField by ID
  deleteClientField(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteClientField', false))
      );
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); 
      return of(result as T); 
    };
  }
}

