import { Component } from '@angular/core';
import { Communication } from '../../../_models/communication.module';
import { Client } from '../../../_models/client.module';
import { DropdownModule } from 'primeng/dropdown';
import { NgFor, NgIf, DatePipe, NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CommunicationService } from '../../../_services/communicaton.service';
import { ClientAddCommunicationComponent } from '../client-add-communication/client-add-communication.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { UserService } from '../../../_services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { callTopicSchema } from '../../../_models/callTopic.module';
import { CallTopicService } from "../../../_services/callTopic.service"
import { ClientService } from '../../../_services/client.service';
import { CalendarModule } from 'primeng/calendar';

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
    NgClass,
    FormsModule,
    DropdownModule,
    DatePipe,
    ClientAddCommunicationComponent,
    ConfirmDialogModule,
    FormsModule,
    CalendarModule
  ],
})
export class ClientCommunicationLogsComponent {


  communications: Communication[] = [];
  client: Client | null = null;
  displayDialog: boolean = false;
  currentCommunication: Communication;
  selectedCommunication: Communication | null = null;
  thisSubject = "";
  users: SelectItem[] = [];
  listClients:Client[] = [];
  selectedClient:Client | null = null;
  date:Date;


  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private calltopicservice: CallTopicService,
    private clientService:ClientService
  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.getCommunications();
    this.loadUsers();
    this.getCallTopics();
    this.loadClients();
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

  private loadClients(): void {
    this.clientService.getAllClients()
      .subscribe((c: any[]) => {
        this.listClients = c;
      });
  }

  getClientById(id: string): Client | undefined {
    return this.listClients.find(client => client._id === id)
    // return this.listClients.find(client => client._id === id);
  }


  getCommunications(): void {
    this.communicationService.getCommunicationsByClientId(this.client._id)
      .subscribe(communications => { this.communications = communications });
  }

  navigateTo(route: string): void {
    if (this.client) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/clientCommunicationLogs', route], { state: { client: this.client } });
    }
  }

  selectCurrentCommunication(communication: Communication) {
    this.currentCommunication = communication;
  }

  showConfirmationEdit(): void {
    this.confirmationService.confirm({
      header: 'עריכת שיחה',
      icon: 'pi pi-pencil',
      key: "edit"
    });
  }
  selectedDate: Date = new Date(); // תאריך ברירת מחדל

  selectCommunication(communication: Communication): void {
    console.log(this.selectedCommunication);
    
    this.selectedCommunication = { ...communication }; 
    console.log(this.selectedCommunication);
    this.selectedCommunication.client = this.getClientById(communication.client).firstName+" "+this.getClientById(communication.client).lastName;
    this.selectedCommunication.date = new Date(this.selectedCommunication.date);
    this.date=new Date()
    console.log(this.selectedCommunication.date);
    
    this.selectedClient = this.getClientById(communication.client);
    console.log(this.selectedClient);
    // Clone the communication for editing
  }
  

  updateCommunication(): void {
    if (this.thisSubject != "")
      this.selectedCommunication.Subject = this.thisSubject
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
    this.confirmationService.close();
  }

  deleteCommunication(): void {
    this.communicationService.deleteCommunication(this.currentCommunication._id)
      .subscribe(() => {
        this.communications = this.communications.filter(c => c._id !== this.currentCommunication._id);
      });
    const index = this.communications.indexOf(this.currentCommunication);
    if (index !== -1) {
      this.communications.splice(index, 1);
    }
    this.currentCommunication = null;
    this.confirmationService.close();
  }

  showConfirmationDelete(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this communication?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      key: "delete"
    });
  }

  cancelDelete(): void {
    this.confirmationService.close();
  }

  confirmDelete(): void {
    this.deleteCommunication();
  }
  // 
  loadUploadedFiles() {
    // קריאה ל-API לטעינת רשימת הקבצים
    this.getCommunications();
  }

  onCreateCompleted() {
    // רענון רשימת הקבצים אחרי העלאת מסמך
    this.loadUploadedFiles();
  }
  // 
  callTopics: callTopicSchema[];

  getCallTopics(): void {
    this.calltopicservice.getAll().subscribe(callTopic => {
      this.callTopics = callTopic
    });
  }
}
