import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private CLIENT_ID =
    '975731254673-141hak533863jonh6psdqo7qccdt2qnf.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyCYR3leqAM9uYHuEGmvDXO7jVyEo-mVcFI';
  private DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  private SCOPES =
    'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';
  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGapi();
      this.loadGis();
    }
  }


  // Subject להעברת המידע לקומפוננטות
  private eventDataSubject = new BehaviorSubject<any>(null);
  public eventData$ = this.eventDataSubject.asObservable();

  private loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => this.gapiLoaded();
    document.body.appendChild(script);
  }

  private loadGis() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => this.gisLoaded();
    document.body.appendChild(script);
  }

  private gapiLoaded() {
    gapi.load('client', () => {
      this.ngZone.run(() => {
        this.initializeGapiClient();
      });
    });
  }

  private async initializeGapiClient() {
    await gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
    this.gapiInited = true;
  }

  private gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '',
    });
    this.gisInited = true;
  }

  private reinitializeGapi() {
    gapi.client
      .init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      })
      .then(() => {
        this.gapiInited = true;
      });
  }

  createGoogleEvent(eventDetails: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.gapiInited || !this.gisInited) {
        console.error('GAPI or GIS not initialized');
        this.reinitializeGapi();
        reject(new Error('GAPI or GIS not initialized'));
        return;
      }


      this.tokenClient.callback = async (resp: any) => {
        if (resp.error !== undefined) {
          console.error('Error during token request', resp.error);
          reject(resp.error);
          return;
        }
        try {
          await this.scheduleEvent(eventDetails);
          resolve();
        } catch (error) {
          reject(error);
        }
      };


      try {
        if (gapi.client.getToken() === null) {
          this.tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
          this.tokenClient.requestAccessToken({ prompt: '' });
        }
      } catch (error) {
        console.error('Error requesting access token', error);
        reject(error);
      }
    });
  }

  // private async scheduleEvent(eventDetails: any) {
  //   // Ensure event details have startTime and endTime
  //   if (!eventDetails.startTime || !eventDetails.endTime) {
  //     console.error('Missing event details: startTime or endTime');
  //     return;
  //   }

  //   const event = {
  //     summary: eventDetails.nameT,
  //     location: "",
  //     description: eventDetails.description,
  //     start: {
  //       dateTime: eventDetails.startTime,
  //       timeZone: "Asia/Jerusalem",
  //     },
  //     end: {
  //       dateTime: eventDetails.endTime,
  //       timeZone: "Asia/Jerusalem",
  //     },
  //     attendees: [{ email: eventDetails.email }],
  //     reminders: {
  //       useDefault: false,
  //       overrides: [
  //         { method: "email", minutes: 24 * 60 },
  //         { method: "popup", minutes: 10 },
  //       ],
  //     },
  //     conferenceData: {
  //       createRequest: {
  //         requestId: Math.random().toString(36).substring(2),
  //         conferenceSolutionKey: {
  //           type: "hangoutsMeet"
  //         }
  //       }
  //     }
  //   };

  //   try {
  //     const request = gapi.client.calendar.events.insert({
  //       calendarId: "primary",
  //       resource: event,
  //       conferenceDataVersion: 1
  //     });

  //     request.execute((event: any) => {
  //       let conferenceLink = '';
  //       if (event.conferenceData && event.conferenceData.entryPoints && event.conferenceData.entryPoints.length > 0) {
  //         conferenceLink = event.conferenceData.entryPoints[0].uri;
  //       }
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "המשימה נשמרה",
  //         html: `
  //           לצפיה בלוח המשימות
  //           <a href="${event.htmlLink}" target="_blank" autofocus>לחץ כאן</a>
  //           <br>
  //           לפגישה ב-Google Meet
  //           <a href="${conferenceLink}" target="_blank" autofocus>לחץ כאן</a>
  //         `,
  //         showConfirmButton: false,
  //         timer: 3000
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error creating event:", error);
  //   }
  // }

  private async scheduleEvent(eventDetails: any) {
    // Ensure event details have startTime and endTime
    if (!eventDetails.startTime || !eventDetails.endTime) {
      console.error('Missing event details: startTime or endTime');
      return;
    }


    const attendees = eventDetails.emails.map((email: string) => ({ email }));

    const event = {
      summary: eventDetails.nameT,
      location: '',
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: 'Asia/Jerusalem',
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: 'Asia/Jerusalem',
      },
      attendees: attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(2),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };


    try {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
      });


      request.execute((event: any) => {
        let conferenceLink = '';
        if (
          event.conferenceData &&
          event.conferenceData.entryPoints &&
          event.conferenceData.entryPoints.length > 0
        ) {
          conferenceLink = event.conferenceData.entryPoints[0].uri;
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה נשמרה',
          html: `
            לצפיה בלוח המשימות
            <a href="${event.htmlLink}" target="_blank" autofocus>לחץ כאן</a>
            <br>
            לפגישה ב-Google Meet
            <a href="${conferenceLink}" target="_blank" autofocus>לחץ כאן</a>
          `,
          showConfirmButton: false,
          timer: 3000,
        });
        eventDetails.eventId = event.id;
        this.eventDataSubject.next({ eventId: event.id, conferenceLink });
        // שמירת ה-eventId
        eventDetails.eventId = event.id;
        this.eventDataSubject.next({ eventId: event.id, conferenceLink });
      });
    } catch (error) {
      console.error('Error creating event:', error);
    } 
  }

  public updateGoogleEvent(eventDetails: any) {
    if (!this.gapiInited || !this.gisInited) {
      console.error('GAPI or GIS not initialized');
      this.reinitializeGapi();
      return;
    }
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        console.error('Error during token request', resp.error);
        throw resp;
      }
      await this.modifyEvent(eventDetails);
    };
    try {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        this.tokenClient.requestAccessToken({ prompt: '' });
      }
    } catch (error) {
      console.error('Error requesting access token', error);
    }
  }


  private async modifyEvent(eventDetails: any) {
    // Ensure event details have eventId, startTime, and endTime
    if (
      !eventDetails.eventId ||
      !eventDetails.startTime ||
      !eventDetails.endTime
    ) {
      console.error('Missing event details: eventId, startTime, or endTime');
      return;
    }


    const event = {
      summary: eventDetails.nameT,
      location: '',
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: 'Asia/Jerusalem',
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: 'Asia/Jerusalem',
      },
      attendees: eventDetails.emails.map((email: string) => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(2),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };


    try {
      const request = gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId: eventDetails.eventId,
        resource: event,
        conferenceDataVersion: 1,
      });


      request.execute((event: any) => {
        let conferenceLink = '';
        if (
          event.conferenceData &&
          event.conferenceData.entryPoints &&
          event.conferenceData.entryPoints.length > 0
        ) {
          conferenceLink = event.conferenceData.entryPoints[0].uri;
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה עודכנה',
          html: `
            לצפיה בלוח המשימות
            <a href="${event.htmlLink}" target="_blank" autofocus>לחץ כאן</a>
            <br>
            לפגישה ב-Google Meet
            <a href="${conferenceLink}" target="_blank" autofocus>לחץ כאן</a>
          `,
          showConfirmButton: false,
          timer: 3000,
        });
      });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }

  // delete
  public deleteGoogleEvent(eventId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.gapiInited || !this.gisInited) {
        console.error('GAPI or GIS not initialized');
        this.reinitializeGapi();
        reject(new Error('GAPI or GIS not initialized'));
        return;
      }

      this.tokenClient.callback = async (resp: any) => {
        if (resp.error !== undefined) {
          console.error('Error during token request', resp.error);
          reject(resp.error);
          return;
        }

        try {
          await this.removeEvent(eventId);
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      try {
        if (gapi.client.getToken() === null) {
          this.tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
          this.tokenClient.requestAccessToken({ prompt: '' });
        }
      } catch (error) {
        console.error('Error requesting access token', error);
        reject(error);
      }
    });
  }

  private async removeEvent(eventId: string) {
    try {
      const request = gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
      });

      request.execute(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה נמחקה בהצלחה',
          showConfirmButton: false,
          timer: 3000,
        });
        // Clear eventId and conferenceLink subject data
        this.eventDataSubject.next(null);
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}

