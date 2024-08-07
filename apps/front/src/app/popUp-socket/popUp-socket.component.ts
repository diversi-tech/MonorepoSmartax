import { Component, OnInit } from '@angular/core';
import { SocketService } from '../_services/socket.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-socket',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './popUp-socket.component.html',
  styleUrls: ['./popUp-socket.component.css'],
})

export class PopupNotificationComponent implements OnInit {

  task: any = null;
  display: boolean = false;

  constructor(
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.socketService.onTaskCreated((task) => {
      setTimeout(() => (this.task = null), 10000);
      this.task = task;
      this.display = true;
    });

    this.socketService.onTaskConfirmed((taskId) => {
      if (this.task && this.task.id === taskId) {
        this.task = null;
        this.display = false;
      }
    });
  }

  confirmTask() {
    if (this.task) {
      this.socketService.confirmTask(this.task._id);
      this.display = false;
      this.task = null;
    }
  }
  moveTask() {
    this.socketService.confirmTask(this.task._id);
    this.router.navigate(['/taskSpe', this.task._id]);
    this.display = false;
    this.task = null;
  }
}
