import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

declare var google: any;
declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleTaskService {
  private CLIENT_ID =
    '975731254673-141hak533863jonh6psdqo7qccdt2qnf.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyCYR3leqAM9uYHuEGmvDXO7jVyEo-mVcFI';
  private DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';
  private SCOPES = 'https://www.googleapis.com/auth/tasks';

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
      callback: (tokenResponse: any) => {
        if (tokenResponse.error !== undefined) {
          console.error('Error during token request', tokenResponse.error);
          throw tokenResponse;
        }
      },
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

  //   public createSimpleTask(taskDetails: any) {
  //     if (!this.gapiInited || !this.gisInited) {
  //       console.error('GAPI or GIS not initialized');
  //       this.reinitializeGapi();
  //       return;
  //     }

  //     this.tokenClient.callback = async (resp: any) => {
  //       if (resp.error !== undefined) {
  //         console.error('Error during token request', resp.error);
  //         throw resp;
  //       }
  //       await this.addTask(taskDetails);
  //     };

  //     try {
  //       if (gapi.client.getToken() === null) {
  //         this.tokenClient.requestAccessToken({ prompt: 'consent' });
  //       } else {
  //         this.tokenClient.requestAccessToken({ prompt: '' });
  //       }
  //     } catch (error) {
  //       console.error('Error requesting access token', error);
  //     }
  //     console.log('Token request initiated');
  //   }
  // 2
  // public createSimpleTask(taskDetails: any): Promise<void> {
  //     return new Promise((resolve, reject) => {
  //       if (!this.gapiInited || !this.gisInited) {
  //         console.error('GAPI or GIS not initialized');
  //         this.reinitializeGapi();
  //         reject('GAPI or GIS not initialized');
  //         return;
  //       }

  //       this.tokenClient.callback = async (resp: any) => {
  //         if (resp.error !== undefined) {
  //           console.error('Error during token request', resp.error);
  //           reject(resp.error);
  //           return;
  //         }
  //         try {
  //           await this.addTask(taskDetails);
  //           resolve();
  //         } catch (error) {
  //           reject(error);
  //         }
  //       };

  //       try {
  //         if (gapi.client.getToken() === null) {
  //           this.tokenClient.requestAccessToken({ prompt: 'consent' });
  //         } else {
  //           this.tokenClient.requestAccessToken({ prompt: '' });
  //         }
  //       } catch (error) {
  //         console.error('Error requesting access token', error);
  //         reject(error);
  //       }
  //       console.log('Token request initiated');
  //     });
  //   }
  // 3
  public createSimpleTask(taskDetails: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.gapiInited || !this.gisInited) {
        console.error('GAPI or GIS not initialized');
        this.reinitializeGapi();
        reject('GAPI or GIS not initialized');
        return;
      }

      this.tokenClient.callback = async (resp: any) => {
        if (resp.error !== undefined) {
          console.error('Error during token request', resp.error);
          reject(resp.error);
          return;
        }
        try {
          await this.addTask(taskDetails);
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

  //   private async addTask(taskDetails: any) {
  //     const task = {
  //       title: taskDetails.title,
  //       notes: taskDetails.notes,
  //       due: taskDetails.dueTime,
  //     };

  //     try {
  //       const request = gapi.client.tasks.tasks.insert({
  //         tasklist: '@default',
  //         resource: task,
  //       });

  //       request.execute((task: any) => {
  //         Swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'המשימה נוצרה בהצלחה',
  //           html: `<a href="${task.selfLink}" target="_blank" autofocus>צפה במשימה</a>`,
  //           showConfirmButton: false,
  //           timer: 3000,
  //         });

  //         console.log('Task created:', task);

  //          // שידור ה-eventId והקישור המעודכן
  //        this.eventDataSubject.next({ eventId: task.id});

  //         // שמור את task.id לשימוש מאוחר יותר
  //         console.log(task.id);
  //         task.id;
  //       });
  //     } catch (error) {
  //       console.error('Error creating task:', error);
  //     }
  //   }

  private addTask(taskDetails: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const task = {
        title: taskDetails.title,
        notes: taskDetails.notes,
        due: taskDetails.dueTime,
      };

      try {
        const request = gapi.client.tasks.tasks.insert({
          tasklist: '@default',
          resource: task,
        });

        request.execute((task: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'המשימה נוצרה בהצלחה',
            html: `<a href="${task.selfLink}" target="_blank" autofocus>צפה במשימה</a>`,
            showConfirmButton: false,
            timer: 3000,
          });

          console.log('Task created:', task);

          // שידור ה-eventId והקישור המעודכן
          this.eventDataSubject.next({ eventId: task.id });

          // שמור את task.id לשימוש מאוחר יותר
          console.log(task.id);

          this.eventDataSubject.next({ eventId: task.id });
          resolve();
        });
      } catch (error) {
        console.error('Error creating task:', error);
        reject(error);
      }
    });
  }



  // updateTask()
  public updateGoogleTask(taskDetails: any) {
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

      const taskId = 'UjRFV3AxSXZ1aW40dDFHTg';
      if (!taskId) {
        console.error('Task ID not found');
        return;
      }

      await this.modifyTask({ ...taskDetails, taskId });
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

  private async modifyTask(taskDetails: any) {
    const task = {
      id: taskDetails.taskId,
      title: taskDetails.title,
      notes: taskDetails.notes,
      due: taskDetails.dueDate,
    };

    try {
      const request = gapi.client.tasks.tasks.update({
        tasklist: '@default',
        task: task.id,
        resource: task,
      });

      request.execute((task: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה עודכנה בהצלחה',
          text: `פרטי המשימה: ${task.title}`,
          showConfirmButton: false,
          timer: 3000,
        });

      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  //   delete
  public deleteGoogleTask(taskId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.gapiInited || !this.gisInited) {
        console.error('GAPI or GIS not initialized');
        this.reinitializeGapi();
        reject('GAPI or GIS not initialized');
        return;
      }

      this.tokenClient.callback = async (resp: any) => {
        if (resp.error !== undefined) {
          console.error('Error during token request', resp.error);
          reject(resp.error);
          return;
        }

        try {
          await this.removeTask(taskId);
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

  private async removeTask(taskId: string): Promise<void> {
    try {
      const request = gapi.client.tasks.tasks.delete({
        tasklist: '@default',
        task: taskId,
      });

      request.execute(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'המשימה נמחקה בהצלחה',
          showConfirmButton: false,
          timer: 3000,
        });
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
