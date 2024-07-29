import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Communication } from '../../../_models/communication.module';
import { Client } from '../../../_models/client.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TokenService } from '../../../_services/token.service';
import { CommunicationService } from '../../../_services/communicaton.service';
import { ClientAddCommunicationComponent } from "../client-add-communication/client-add-communication.component";

@Component({
  selector: 'app-client-communication-logs',
  templateUrl: './client-communication-logs.component.html',
  styleUrls: ['./client-communication-logs.component.css'],
  standalone: true,
  imports: [
    TableModule,
    Button,
    NgFor,
    NgIf,
    FormsModule,
    DropdownModule,
    DatePipe,
    ClientAddCommunicationComponent
],
})
export class ClientCommunicationLogsComponent {


  communications: Communication[] = [];
  client: Client | null = null;
  displayDialog: boolean = false;

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.getCommunications();
  }

  getCommunications(): void {
    const i = this.tokenService.getCurrentDetail('_id');
    const j = this.client._id;
    this.communicationService.getCommunicationsByClientId(j)
      .subscribe(communications =>
        { this.communications = communications });
     console.log(j, i, this.communications)
  }


  navigateTo(route: string): void {
    if (this.client) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/clientCommunicationLogs', route], { state: { client: this.client } });
    }
  }
}
