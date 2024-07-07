import { Component, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { Button } from 'primeng/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ClientProfileComponent } from '../client-profile/client-profile.component';

@Component({
    // standalone:true,
    selector: 'app-client-navbar',
    templateUrl: './client-navbar.component.html',
    styleUrls: ['./client-navbar.component.css'],
    standalone: true,
    imports: [ClientProfileComponent, Button, RouterLink, RouterLinkActive, RouterOutlet]
})
export class ClientNavbarComponent implements OnInit {
  client: Client | null = null;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.client = history.state.client;
  }

  navigateTo(route: string): void {
    if (this.client) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar', route], { state: { client: this.client } });
    }
  }
  
}
