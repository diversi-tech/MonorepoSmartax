import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GmailService {
  private oauth2Client;

  constructor(private readonly configService: ConfigService) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      this.configService.get('GOOGLE_REDIRECT_URI'),
    );

    this.oauth2Client.setCredentials({
      refresh_token: this.configService.get('GOOGLE_REFRESH_TOKEN'),
    });
  }

  setCredentials(credentials: { refresh_token: string }) {
    this.oauth2Client.setCredentials(credentials);
  }

  async searchEmails(fromEmail: string, toEmail: string) {
    const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: `from:${fromEmail} to:${toEmail}`,
    });

    const messages = response.data.messages || [];
    const emails = [];
    for (const message of messages) {
      const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });
      emails.push(msg.data);
    }
    return emails;
  }
}
