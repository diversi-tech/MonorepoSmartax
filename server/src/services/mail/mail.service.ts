// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class MailService {}



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

  async sendMail(body: any) {
    const {to,email}=body

    // const htmlTemplate = fs.readFileSync('../../assets/pageToHtml.html', 'utf8');
    // const template = handlebars.compile(htmlTemplate);
    const fileContent = fs.readFileSync(__dirname +'/../../../src/assets/pageToHtml.html', 'utf8');
    // const html = template({ /* Add template variables if needed */ });
    const mailOptions = {
      from: process.env.EMAIL,
      to:to,
      subject:'Test Email',
      text:'This is a test email sent from NestJS',
      html:fileContent,
    //   attachments: [
    //     {
    //       filename: "pageToHtml.html",
    //       path: __dirname +'/../../../src/assets/pageToHtml.html', // נתיב לתמונה במערכת הקבצים שלך
    //       cid: '../../assets/pageToHtml.html', // זהה ל-src ב-HTML
    //     }
    //   ]
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
