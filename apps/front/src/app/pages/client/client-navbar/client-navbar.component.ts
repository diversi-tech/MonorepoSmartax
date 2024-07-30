import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Client } from '../../../_models/client.module';
import { Button } from 'primeng/button';
import {  RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Router } from '@angular/router';
import { ClientProfileComponent } from '../client-profile/client-profile.component';

@Component({
    // standalone:true,
    selector: 'app-client-navbar',
    templateUrl: './client-navbar.component.html',
    styleUrls: ['./client-navbar.component.css'],
    standalone: true,
    imports: [ClientProfileComponent, Button, RouterLink, RouterLinkActive, RouterOutlet,RouterModule,]
})
export class ClientNavbarComponent implements OnInit {
  client: Client | null = null;
  constructor(private router: Router,
             private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.client = history.state.client;
  }

  navigateTo(route: string): void {
    console.log('Navigating to ', route);
    if (this.client) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar', route], { state: { client: this.client } });
      this.cdr.detectChanges();

    }
  }
  
}
