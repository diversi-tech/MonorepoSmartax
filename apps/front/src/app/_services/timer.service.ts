import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {TIMER_ENDPOINT } from '../api-urls';
import { Timer } from "../_models/timer.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class TimerService {
    url:string=TIMER_ENDPOINT
    private timerInterval: any;
    private totalSecondsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }
  
    saveTime(timer: Timer): Observable<Timer> {
        return this.http.put<Timer>(this.url, timer)
      }
    
  
    getAllTimer(): Observable<Timer[]> {
      return this.http.get<Timer[]>(`${this.url}`)
    }

    startTimer(): void {
      if (!this.timerInterval) {
        this.timerInterval = setInterval(() => {
          let currentSeconds = this.totalSecondsSubject.value;
          this.totalSecondsSubject.next(currentSeconds + 1);
        }, 1000);
      }
    }
  
    stopTimer(): void {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }
  
    getTotalSeconds(): Observable<number> {
      return this.totalSecondsSubject.asObservable();
    }
  
    resetTimer(): void {
      this.totalSecondsSubject.next(0);
      this.stopTimer();
    }

    setTotalSeconds(seconds: number): void {
      this.totalSecondsSubject.next(seconds);
    }
  
    isTimerRunning(): boolean {
      return !!this.timerInterval;
    }
  }
  