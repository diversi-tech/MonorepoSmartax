import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private userID = 'YOUR_USER_ID'; // החלף ב-User ID שלך מ-EmailJS

  constructor() {
    emailjs.init(this.userID);
  }

  public sendEmail(templateParams: { [key: string]: any }): Promise<EmailJSResponseStatus> {
    const serviceID = 'service_tmq88nk'; // החלף ב-Service ID שלך מ-EmailJS
    const templateID = 'template_a1ia1tb'; // החלף ב-Template ID שלך מ-EmailJS
    return emailjs.send(serviceID, templateID, templateParams);
  }
}

