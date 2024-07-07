import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Communication } from '../../../_models/communication.module';
import { Client } from '../../../_models/client.module';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
@Component({
  selector: 'app-client-communication-logs',
  templateUrl: './client-communication-logs.component.html',
  styleUrls: ['./client-communication-logs.component.css'],
    standalone: true,
    imports: [
        Button,
        NgFor,
        NgIf,
        FormsModule,
        DropdownModule,
        DatePipe,
    ],
})
export class ClientCommunicationLogsComponent {


  fruits: string[] = ['apple', 'banana', 'orange'];
  communications: Communication[] = [];
  users: SelectItem[] = [];
  selectedCommunication: Communication | null = null; // for editing
  client: Client | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.client = history.state.client;
  
  }

  navigateTo(route: string): void {
    if (this.client) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/clientCommunicationLogs', route], { state: { client: this.client } });
    }
  }
  
}
