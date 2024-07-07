import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Client } from '../../../_models/client.module';
import { SelectItem } from 'primeng/api';
import { Communication } from '../../../_models/communication.module';
import { Router } from '@angular/router';
import { CommunicationService } from '../../../_services/communicaton.service';
import { UserService } from '../../../_services/user.service';


@Component({
    // standalone:true,
    selector: 'app-client-add-communication',
    templateUrl: './client-add-communication.component.html',
    styleUrl: './client-add-communication.component.css',
    standalone: true,
    imports: [FormsModule, DropdownModule],
})
export class ClientAddCommunicationComponent implements OnInit {
  client: Client | null = null;
  users: SelectItem[] = [];
  newCommunication: Communication = {
    client: '',
    date: new Date(),
    type: '',
    summary: '',
    assignedTo: null
  };
  formattedDate: string = '';

  constructor(private router: Router, private communicationService: CommunicationService, private userService: UserService) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.newCommunication.client = this.client?._id ?? '';
    this.formattedDate = this.formatDate(this.newCommunication.date);
    this.loadUsers();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  setTodayDate(): void {
    this.newCommunication.date = new Date();
    this.formattedDate = this.formatDate(this.newCommunication.date);
  }

  createCommunication(): void {
    console.log('Creating communication:', this.newCommunication);
    this.communicationService.createCommunication(this.newCommunication)
      .subscribe(
        (newCommunication: Communication) => {
          console.log('Communication created:', newCommunication);
          this.resetForm();
        },
        error => {
          console.error('Error creating communication:', error);
        }
      );
  }
  private resetForm(): void {
    this.newCommunication = {
      client: this.client?._id ?? '',
      date: new Date(),
      type: '',
      summary: '',
      assignedTo: null
    };
    this.formattedDate = this.formatDate(this.newCommunication.date);
  }

  private loadUsers(): void {
    this.userService.getAllUsers()
      .subscribe((users: any[]) => {
        this.users = users.map(user => ({
          label: user.userName,
          value: user._id
        }));
      });
  }
}
