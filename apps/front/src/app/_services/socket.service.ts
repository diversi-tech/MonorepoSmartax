// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Replace with your server URL
  }

  public onTaskNotAssigned(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('taskNotAssigned', (data) => {
        observer.next(data);
      });
    });
  }

  public onTaskAssignedToYou(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('taskAssignedToYou', (data) => {
        observer.next(data);
      });
    });
  }

  public onTaskAssigned(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('taskAssigned', (data) => {
        observer.next(data);
      });
    });
  }

  public addTask(task: any): void {
    console.log(task);
    this.socket.emit('addTask', task);
  }

  public assignTask(taskId: string, assignedTo: string): void {
    this.socket.emit('assignTask', taskId, assignedTo);
  }
}
