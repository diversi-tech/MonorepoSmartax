import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { NgIf, DatePipe, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SensitiveDetailsComponent } from '../sensitive-details/sensitive-details.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { IconProfileComponent } from '../../../share/icon-profile/icon-profile.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    DropdownModule,
    DatePipe,
    CommonModule,
    SensitiveDetailsComponent,
    SidebarModule,
    ButtonModule,
    IconProfileComponent,
    InputTextModule
  ],
})
export class ClientProfileComponent implements OnInit {
  client: Client | null = null;
  showDetails: boolean = false;
  sidebarVisible2: boolean = false;
  showPersonalDetails: boolean = false;
  showBusinessDetails: boolean = false;
  showSensitiveDetails: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.client = history.state.client as Client;
    if (!this.client) {
      this.router.navigate(['/clientSearch']); // Redirect to client search if no client is found in state
    }
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
    console.log(this.client)
  }

  navigateToSensitiveDetails(): void {
    if (this.client) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/sensitiveDetails'], { state: { client: this.client } });
    }
  }

  isPinned: boolean = false;

  

  pinSidebar() {
    this.isPinned = !this.isPinned;
  }
  togglePersonalDetails() {
    this.showPersonalDetails = !this.showPersonalDetails;
  }

  toggleBusinessDetails() {
    this.showBusinessDetails = !this.showBusinessDetails;
  }

  toggleSensitiveDetails() {
    this.showSensitiveDetails = !this.showSensitiveDetails;
  }
  
}
