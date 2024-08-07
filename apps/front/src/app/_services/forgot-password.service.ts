import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailService } from './email.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient,private emailService: EmailService) {}
  private apiUrl = 'http://localhost:8080';


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  forgotPassword(to: string): Observable<any> {    
    return this.http.post(`${this.apiUrl}/mail/send-email`, { to });
  }
}
