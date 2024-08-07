import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateSensitiveDataDto } from '../../../../../server/src/Models/dto/sensitiveData.dto';
@Injectable({
  providedIn: 'root'
})
export class SensitiveDataService {

  private apiUrl = 'http://localhost:8080/SensitiveData'; // Base URL for the Sensitive Data API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }

  // Get sensitive data by ID
  getSensitiveData(id: string): Observable<CreateSensitiveDataDto> {
    return this.http.get<CreateSensitiveDataDto>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<CreateSensitiveDataDto>('getSensitiveData'))
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
