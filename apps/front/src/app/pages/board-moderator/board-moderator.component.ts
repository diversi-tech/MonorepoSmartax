import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
    selector: 'app-board-moderator',
    templateUrl: './board-moderator.component.html',
    styleUrls: ['./board-moderator.component.css'],
    standalone: true
})
export class BoardModeratorComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.userService.getModeratorBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
