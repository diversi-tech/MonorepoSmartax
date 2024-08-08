import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  private taskConfirmedSource = new Subject<string>();
  taskConfirmed$ = this.taskConfirmedSource.asObservable();

  constructor() {
    this.socket = io('https://monoreposmartax-n13o.onrender.com');

    this.socket.on('connect', () => {
      console.log('מחובר לשרת WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('מנותק משרת WebSocket');
    });

    this.socket.on('taskConfirmed', (taskId: string) => {
      this.taskConfirmedSource.next(taskId);
    });
  }

  onTaskCreated(callback: (task: any) => void) {
    this.socket.on('taskCreated', (task) => {
      console.log('אירוע taskCreated התקבל:', task);
      callback(task);
    });
  }

  onTaskConfirmed(callback: (taskId: string) => void) {
    this.socket.on('taskConfirmed', (taskId) => {
      console.log('אירוע taskConfirmed התקבל:', taskId);
      callback(taskId);
    });
  }

  confirmTask(taskId: string) {
    this.socket.emit('confirmTask', taskId);
  }

  addTask(task: any) {
    this.socket.emit('addTask', task);
  }
}
