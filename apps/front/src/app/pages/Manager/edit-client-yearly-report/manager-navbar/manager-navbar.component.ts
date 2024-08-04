import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manager-navbar',
  standalone: true,
  imports: [CommonModule, Button, RouterLink, RouterLinkActive, RouterOutlet, RouterModule, ButtonModule],
  templateUrl: './manager-navbar.component.html',
  styleUrl: './manager-navbar.component.css',
})
export class ManagerNavbarComponent {
}
