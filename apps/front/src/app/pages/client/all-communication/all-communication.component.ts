import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../_services/communicaton.service';
import { Communication } from '../../../_models/communication.module';
import { UserService } from '../../../_services/user.service';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe,CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
@Component({
    // standalone:true,
    selector: 'app-client-communication-logs',
    templateUrl: './all-communication.component.html',
    styleUrl: './all-communication.component.css',
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
export class AllCommunicationComponent {


  fruits: string[] = ['apple', 'banana', 'orange'];
  
  communications: Communication[] = [];
  users: SelectItem[] = [];
  selectedCommunication: Communication | null = null; // for editing

  constructor(private communicationService: CommunicationService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllCommunications();
    this.loadUsers();
  }

  getAllCommunications(): void {
    this.communicationService.getAllCommunications()
      .subscribe((communications: Communication[]) => this.communications = communications);
  }

  selectCommunication(communication: Communication): void {
    this.selectedCommunication = { ...communication }; // Clone the communication for editing
  }
  updateCommunication(): void {
    if (this.selectedCommunication) {
      this.communicationService.updateCommunication(this.selectedCommunication._id!, this.selectedCommunication)
        .subscribe((updatedCommunication: Communication) => {
          const index = this.communications.findIndex(c => c._id === updatedCommunication._id);
          if (index !== -1) {
            this.communications[index] = updatedCommunication;
          }
          this.selectedCommunication = null;
        });
    }
  }
  deleteCommunication(id: string): void {
    this.communicationService.deleteCommunication(id)
      .subscribe(() => {
        this.communications = this.communications.filter(c => c._id !== id);
      });
  }
  private loadUsers(): void {
    this.userService.getAllUsers()
      .subscribe((users: any[]) => {
        this.users = users.map(user => ({
          label: user.userName,
          value: user._id // Include user ID as value
        }));
      });
  }
}
