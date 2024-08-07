import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private userID = 'YOUR_USER_ID';

  constructor() {
    emailjs.init(this.userID);
  }

  public sendEmail(templateParams: { [key: string]: any }): Promise<EmailJSResponseStatus> {
    const serviceID = 'service_tmq88nk'; 
    const templateID = 'template_a1ia1tb'; 
    return emailjs.send(serviceID, templateID, templateParams);
  }
}

