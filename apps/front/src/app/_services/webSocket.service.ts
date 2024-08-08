import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketServiceW {
  private socket: Socket;

  constructor() {
    this.socket = io('https://monoreposmartax-n13o.onrender.com'); // שנה את הכתובת לכתובת השרת שלך אם יש צורך
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
