// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-pop-up-socket',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './popUp-socket.component.html',
//   styleUrl: './popUp-socket.component.css',
// })
// export class PopUpSocketComponent {}

// popup.component.ts

// popup-notification.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { SocketServiceW } from '../_services/webSocket.service';
import { SocketService } from '../_services/socket.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-socket',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './popUp-socket.component.html',
  styleUrls: ['./popUp-socket.component.css'],
})
export class PopupNotificationComponent implements OnInit {
  task: any = null;
  display: boolean = false;

  constructor(private socketService: SocketService, private router: Router) {}

  ngOnInit() {
    this.socketService.onTaskCreated((task) => {
      console.log('אירוע taskCreated בצד הלקוח:', task);
      setTimeout(() => (this.task = null), 10000);
      this.task = task;
      this.display = true;
    });

    this.socketService.onTaskConfirmed((taskId) => {
      console.log('אירוע taskConfirmed בצד הלקוח:', taskId);
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
