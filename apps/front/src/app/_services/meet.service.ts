import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meet } from '../_models/meet.module';
import { Observable } from 'rxjs';
import { MEET_ENDPOINT } from '../api-urls';

@Injectable({
  providedIn: 'root',
})
export class MeetService {
  url: string = MEET_ENDPOINT
  url: string = MEET_ENDPOINT;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }
  constructor(private http: HttpClient) {}

  // getRoleById(id: string): Observable<Role> {
  //   return this.http.post<Role>(`${this.url}/searchClient`, { id }, this.httpOptions)
  // }

  getAllMeetings(): Observable<Meet[]> {
    return this.http.get<Meet[]>(`${this.url}`)

    return this.http.get<Meet[]>(`${this.url}`);
  }
  getMeetById(meetId: string): Observable<Meet> {
    const body = { id: meetId }
    return this.http.post<Meet>(`${this.url}/searchMeet`, body)
  getMeetById(meetId: string): Observable<Meet> {
    const body = { id: meetId };
    return this.http.post<Meet>(`${this.url}/searchMeet`, body);
  }
  createMeet(meet: Meet): Observable<Meet> {
    var e = this.http.put<Meet>(this.url, meet)
    return e
    debugger;
    var e = this.http.put<Meet>(this.url, meet);
    debugger;
    return e;
  }

  updateMeet(id: string, meet: Meet): Observable<Meet> {
    var e = this.http.post<Meet>(`${this.url}`, { id, ...meet }, this.httpOptions)
    return e
    debugger;
    var e = this.http.post<Meet>(
      `${this.url}`,
      { id, ...meet },
      this.httpOptions
    );
    return e;
  }
}
