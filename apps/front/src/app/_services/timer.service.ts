import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {TIMER_ENDPOINT } from '../api-urls';
import { Timer } from "../_models/timer";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class TimerService {
    url:string=TIMER_ENDPOINT
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }
  
    saveTime(timer: Timer): Observable<Timer> {
        debugger
        var e= this.http.put<Timer>(this.url, timer)
        debugger
        return e
      }
    
  
    getAllTimer(): Observable<Timer[]> {
      return this.http.get<Timer[]>(`${this.url}`)
        
    }
  }
  