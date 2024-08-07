// websocket.service.ts
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { WebSocketSubject } from 'rxjs/webSocket';
// import { io } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService {
//   private socket$: WebSocketSubject<any>;
//   private socket = io('http://localhost:3000'); // הכתובת והפורט צריכים להתאים לשרת שלך

//   constructor() {
//     this.socket$ = new WebSocketSubject('ws://localhost:8080');
//   }

// //   public send(message: any): void {
// //     this.socket$.next(message);
// //   }

//   send(message: any) {
//     this.socket.emit('message', message);
//     console.log('message', message);

//   }

// //   public get messages$() {
// //     return this.socket$.asObservable();
// //   }

//   get messages$() {
//     return new Observable(observer => {
//       this.socket.on('message', (message) => {
//         observer.next(message);
//       });
//     });
//   }
// }

// src/app/web-socket.service.ts
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { io, Socket } from 'socket.io-client';
// // import * as io from 'socket.io-client';

// @Injectable({
//   providedIn: 'root',
// })
// export class WebSocketService {
//   private socket: Socket;

//   // private socket: SocketIOClient.Socket;
//   private taskCreatedSource = new Subject<any>();

//   constructor() {
//     // this.socket = io('http://localhost:3000'); // החלף עם ה-URL של השרת שלך
//     // this.socket.on('connect', () => {
//     //   console.log('Connected to WebSocket server');
//     // });
//     // this.socket.on('taskCreated', (task: any) => {
//     //   console.log('Received taskCreated event:', task); // לוג לקבלת הודעה
//     //   this.taskCreatedSource.next(task);
//     // });
//     this.socket = io('http://localhost:3000'); // ודא שה-URL הוא הנכון

//     this.socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });

//     this.socket.on('taskCreated', (task: any) => {
//       console.log('Received taskCreated event:', task);
//       this.taskCreatedSource.next(task);
//     });

//     this.socket.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//     });

//     this.socket.on('error', (error: any) => {
//       console.error('WebSocket error:', error);
//     });
//   }

//   // onTaskCreated(callback: (task: any) => void) {
//   //   console.log('callback', callback);

//   //   this.socket.on('taskCreated', callback);
//   // }

//   onTaskCreated(callback: (task: any) => void) {
//     this.taskCreatedSource.subscribe(callback);

//     console.log('callback', callback);
//   }
// }

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketServiceW {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket = io('https://monoreposmartax.onrender.com'); // שנה את הכתובת לכתובת השרת שלך אם יש צורך
  }

  onTaskCreated(callback: (task: any) => void) {
    this.socket.on('taskCreated', callback);
  }

  confirmTask(taskId: string) {
    this.socket.emit('confirmTask', taskId);
  }

  onTaskConfirmed(callback: (taskId: string) => void) {
    this.socket.on('taskConfirmed', callback);
  }
}
