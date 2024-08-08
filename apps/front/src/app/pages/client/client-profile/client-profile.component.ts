import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { NgIf, DatePipe, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SensitiveDetailsComponent } from '../sensitive-details/sensitive-details.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { IconProfileComponent } from '../../../share/icon-profile/icon-profile.component';
import { InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../../../_services/client.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    InputTextModule,
    ConfirmDialogModule,
  ],
})

export class ClientProfileComponent implements OnInit {

  client: Client | null = null;
  showDetails: boolean = false;
  sidebarVisible2: boolean = false;
  showPersonalDetails: boolean = false;
  showBusinessDetails: boolean = false;
  showSensitiveDetails: boolean = false;


  constructor(
    private router: Router,
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.client = history.state.client as Client;
    if (!this.client) {
      this.router.navigate(['/clientSearch']); // Redirect to client search if no client is found in state
    }
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
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

  editClient() {
    if (this.client) {
      this.router.navigate(['/addClient'], { state: { client: this.client } });
    }
  }

  deleteClient() {
    this.clientService.deleteClient(this.client._id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => console.error('Error deleting client: ', err),
    });
  }

  showConfirmationDelete(): void {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח שברצונך למחוק את הלקוחות האלה?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      key: "delete"
    });
  }

  cancelDelete(): void {
    this.confirmationService.close();
  }

  confirmDelete(): void {
    this.deleteClient();
  }
}
