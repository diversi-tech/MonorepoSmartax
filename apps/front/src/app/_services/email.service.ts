// // src/app/email/email.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmailService {

//   private userID = 'YOUR_USER_ID'; // Replace with your EmailJS User ID
//   private apiUrl = 'http://localhost:3000/api/emails'; // Example API endpoint

//   constructor(private http: HttpClient) {
//     emailjs.init(this.userID);
//   }

//   public sendEmail(templateParams: { [key: string]: any }): Promise<EmailJSResponseStatus> {
//     const serviceID = 'service_tmq88nk'; // Replace with your EmailJS Service ID
//     const templateID = 'template_a1ia1tb'; // Replace with your EmailJS Template ID
//     return emailjs.send(serviceID, templateID, templateParams);
//   }

//   public openEmail(email: any) {
//     const mailtoLink = `mailto:${email.from}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
//     window.location.href = mailtoLink;
//   }

//   public searchEmails(clientEmail: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}?clientEmail=${clientEmail}`);
//   }
// }import { Injectable } from '@angular/core';



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/auth'; // עדכני לפי ה-URL שלך

  constructor(private http: HttpClient) { }

  searchEmails(fromEmail: string, toEmail: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/search-emails`, { fromEmail, toEmail });
  }  
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Client } from '../_models/client.module';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmailService {

//   private apiUrl = 'http://localhost:8080'; // Update with your backend API URL

//   constructor(private http: HttpClient) {}

//   public openEmail(clientEmail: string) {
//     const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${clientEmail}`;
//     window.open(mailtoLink, '_blank');
//   }
// }
