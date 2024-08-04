import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your password
      },
    });
  }

  // Create a random password from numbers only and 4 characters long
  generatePassword(length: number) {
    const charset = '0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  async sendMail(body: any) {
    const { to, email } = body;

    // Create a random password from numbers only and 4 characters long
    const validPassword = this.generatePassword(4);

    // const fileContent = fs.readFileSync(
    //   '../MonorepoSmartax/server/src/services/mail/mail.service.ts',
    //   'utf8'
    // );

    // הוספת הסיסמה האקראית למייל
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: 'Forgot Password ❓- Smartax',
      text: `Password to verify email address. Your password is: ${validPassword}`,
      // html:m
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

      // החזרת הסיסמה בתגובה של הפונקציה
      return { success: true, password: validPassword, email: to };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }
}
