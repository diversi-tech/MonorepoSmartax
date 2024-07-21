import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager-navbar',
  standalone: true,
  imports: [CommonModule, Button, RouterLink, RouterLinkActive, RouterOutlet,RouterModule],
  templateUrl: './manager-navbar.component.html',
  styleUrl: './manager-navbar.component.css',
})
export class ManagerNavbarComponent {
  constructor(private router: Router) {}
}
