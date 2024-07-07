import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
 // , subject: string, text: string, html: string
  async sendEmail(@Body() t: string) {
    console.log(t);
    
    
    await this.mailService.sendMail(
      t, // האימייל של הנמען
    //   subject='Test Email', // הנושא של המייל
    //   text='This is a test email sent from NestJS', // תוכן המייל כטקסט
    //   html='<h1>This is a test email sent from NestJS</h1>' // תוכן המייל כ-HTML
    );

    return 'Email sent';
  }
}
