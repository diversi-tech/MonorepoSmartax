import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../_models/tag.module'; // Update the path according to the location of your model

import { Observable, catchError, of } from 'rxjs';
import { TAG_ENDPOINT } from '../api-urls';
@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl = TAG_ENDPOINT; // Base URL for the Client API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) {}

  // Create a new Client
  createTag(tag: Tag): Observable<Tag> {
    return this.http
      .post<Tag>(this.apiUrl, tag, this.httpOptions)
      .pipe(catchError(this.handleError<Tag>('createClient')));
  }

  // Get all Clients
  getAllTags(): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError<Tag[]>('getAllClients', [])));
  }

  // Search for a Client by ID
  searchTag(id: string): Observable<Tag[]> {
    return this.http
      .post<Tag[]>(`${this.apiUrl}/searchClient`, { id }, this.httpOptions)
      .pipe(catchError(this.handleError<Tag[]>('searchClient', [])));
  }

  // Update an existing Client
  updateTag(client: Tag): Observable<Tag> {
    return this.http
      .put<Tag>(`${this.apiUrl}`, client, this.httpOptions)
      .pipe(catchError(this.handleError<Tag>('updateClient')));
  }

  // Delete a Tag by ID
  deleteTag(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } })
      .pipe(catchError(this.handleError<boolean>('deleteTag', false)));
  }

  // Error handling function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error message to console
      return of(result as T); // Return default result to keep the app running
    };
  }
}
