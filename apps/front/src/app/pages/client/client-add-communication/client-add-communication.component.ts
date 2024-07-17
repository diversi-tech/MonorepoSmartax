import { Component, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Client } from '../../../_models/client.module';
import { PrimeTemplate, SelectItem } from 'primeng/api';
import { Communication } from '../../../_models/communication.module';
import { Router, RouterOutlet } from '@angular/router';
import { CommunicationService } from '../../../_services/communicaton.service';
import { UserService } from '../../../_services/user.service';
import { callTopicSchema } from '../../../_models/callTopic.module';
import { CallTopicService } from "../../../_services/callTopic.service"
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AddClientComponent } from '../add-client/add-client.component';
import { DialogModule } from 'primeng/dialog';
import { EventEmitter } from '@angular/core';


@Component({
    // standalone:true,
    selector: 'app-client-add-communication',
    templateUrl: './client-add-communication.component.html',
    styleUrl: './client-add-communication.component.css',
    standalone: true,
    imports: [FormsModule, DropdownModule,
      AutoCompleteModule,
      PrimeTemplate,
      NgIf,
      TableModule,
      AddClientComponent,
      RouterOutlet,
      DialogModule,
    ],
})
export class ClientAddCommunicationComponent implements OnInit {
  client: Client | null = null;
  users: SelectItem[] = [];
  newCommunication: Communication = {
    client: '',
    date: new Date(),
    summary: '',
    assignedTo: null,
    Status: false,
    Subject:""
  };
  thisSubject="";
  thisSubject2="";
  formattedDate: string = '';
  isSelected: number;
  selectedCallTopic: callTopicSchema| null = null;
  filteredCallTopic: callTopicSchema[] = [];
  callTopics: callTopicSchema[];
  callTopics2: callTopicSchema[]=[{name:"לא נמצא"}];
  is: boolean = false;
  newcallTopicSchema: callTopicSchema={ name:"" };
  displayDialog: boolean = true;
  @Output() close = new EventEmitter<void>();


  constructor(private router: Router, private communicationService: CommunicationService, private userService: UserService,
    private calltopicservice : CallTopicService
  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.newCommunication.client = this.client?._id ?? '';
    this.formattedDate = this.formatDate(this.newCommunication.date);
    this.loadUsers();
    this.getCallTopics();
  }
 getCallTopics(): void {
    this.calltopicservice.getAll().subscribe(callTopic => {
      this.callTopics = callTopic
      this.filteredCallTopic= callTopic ;
    });
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  onStatusChange(statusValue: any) {
    if(statusValue=="0: true")
    this.newCommunication.Status = true;
  }
  setTodayDate(): void {
    this.newCommunication.date = new Date();
    this.formattedDate = this.formatDate(this.newCommunication.date);
  }

  createCommunication(): void {
    this.newCommunication.Subject=this.thisSubject;
    
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
      this.close.emit();
  }
  private resetForm(): void {
    this.newCommunication = {
      client: this.client?._id ?? '',
      date: new Date(),
      summary: '',
      assignedTo: null,
      Status: false,
      Subject : ""
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
  add(){
    this.newcallTopicSchema.name=this.thisSubject2
    this.calltopicservice.createCallTopic(this.newcallTopicSchema).subscribe(response => {
      this.callTopics.push(response); 
      alert( response.name+" "+"נוסף בהצלחה")
       // הוספת הנושא החדש לרשימה המקומית
    });
  }
  filterByNameCallTopic(value: string): void {
  
    if (value != "") {
      this.is=false
      const query = value.toLowerCase();
      this.filteredCallTopic = this.callTopics.filter(callTopic => 
        callTopic.name.toLowerCase().includes(query.toLowerCase())
      );
      if(this.filteredCallTopic.length==0)
        {
          this.filteredCallTopic=this.callTopics2
          this.thisSubject2=value
          this.is=true;
          
        }
    }
    else
    {
      this.is=false
      this.filteredCallTopic = this.callTopics;
    }
    this.selectedCallTopic = null;
    
  }
  select(event:  AutoCompleteSelectEvent): void {
      const callTopic = event.value as callTopicSchema;
      this.thisSubject=callTopic.name
    }
    onClose() {
      this.close.emit();
    }
}
