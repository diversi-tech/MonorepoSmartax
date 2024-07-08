import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { callTopicSchema } from '../_models/callTopic.module';

@Injectable({
  providedIn: 'root'
})
export class CallTopicService {
  private apiUrl = 'http://localhost:8080/CallTopicController'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  // פונקציה להוספת נתונים
  createCallTopic(callTopic: callTopicSchema): Observable<callTopicSchema> {
    console.log("g",callTopic)
    return this.http.post<callTopicSchema>(`${this.apiUrl}`, callTopic, this.httpOptions);
  }

  // פונקציה לקריאת כל הנתונים
  getCallTopics(): Observable<callTopicSchema[]> {
    return this.http.get<callTopicSchema[]>(`${this.apiUrl}`);
  }
  getAll(): Observable<callTopicSchema[]> {
    return this.http.post<callTopicSchema[]>(`${this.apiUrl}/all`, {})
     
  }
}
