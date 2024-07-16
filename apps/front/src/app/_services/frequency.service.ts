import { Injectable } from '@angular/core';
import { FREQUENCY_ENDPOINT } from '../api-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frequency } from '../_models/frequency.module';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {
  constructor(private http: HttpClient) { }
  private apiUrl = FREQUENCY_ENDPOINT;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  getAllFrequancies(): Observable<Frequency[]>{
    return this.http.get<Frequency[]>(`${this.apiUrl}`);
  }

  createFrequency(frequency: Frequency): Observable<Frequency> {
    return this.http.post<Frequency>(this.apiUrl, frequency, this.httpOptions);
  }

  searchFrequency(id: string): Observable<Frequency[]> {
    return this.http.post<Frequency[]>(`${this.apiUrl}/searchFrequency`, { id }, this.httpOptions);
  }

  updateFrequency(frequency: Frequency): Observable<Frequency> {
    return this.http.put<Frequency>(`${this.apiUrl}`, frequency, this.httpOptions);
  }

  deleteFrequency(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, { ...this.httpOptions, body: { id } });
  }



}
