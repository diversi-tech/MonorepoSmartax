// import { Injectable } from '@angular/core';
// import { gapi } from 'gapi-script';

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleCalendarService {

//   private gapiSetup: boolean = false;
//   private googleAuth: gapi.auth2.GoogleAuth | undefined;
//   private calendarItems: any[] = [];
//   private apiKey: string = 'YOUR_API_KEY'; // שים כאן את מפתח ה-API שלך
//   private clientId: string = 'YOUR_CLIENT_ID'; // שים כאן את מזהה הלקוח שלך

//   constructor() {
//     this.initClient();
//   }

//   private async initClient() {
//     if (!this.gapiSetup) {
//       await new Promise<void>((resolve) => {
//         gapi.load('client:auth2', resolve);
//       });
//       await gapi.client.init({
//         apiKey: this.apiKey,
//         clientId: this.clientId,
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//         scope: 'https://www.googleapis.com/auth/calendar.readonly',
//       });
//       this.gapiSetup = true;
//       this.googleAuth = gapi.auth2.getAuthInstance();
//     }
//   }

//   async signIn() {
//     if (!this.googleAuth) return;
//     await this.googleAuth.signIn();
//   }

//   async signOut() {
//     if (!this.googleAuth) return;
//     await this.googleAuth.signOut();
//   }

//   async listUpcomingEvents() {
//     if (!this.googleAuth) return;
//     const isSignedIn = this.googleAuth.isSignedIn.get();
//     if (isSignedIn) {
//       const response = await gapi.client.calendar.events.list({
//         calendarId: 'primary',
//         timeMin: (new Date()).toISOString(),
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 10,
//         orderBy: 'startTime',
//       });
//       this.calendarItems = response.result.items;
//       return this.calendarItems;
//     } else {
//       console.log('User is not signed in');
//     }
//   }
// }
