import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../_services/communicaton.service';
import { Communication } from '../../../_models/communication.module';
import { UserService } from '../../../_services/user.service';
import { PrimeTemplate, SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, DatePipe,CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { callTopicSchema } from '../../../_models/callTopic.module'
import { CallTopicService } from "../../../_services/callTopic.service"
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { AddClientComponent } from '../add-client/add-client.component';
import { RouterOutlet } from '@angular/router';
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
        TableModule,
        FormsModule, DropdownModule,
      AutoCompleteModule,
      PrimeTemplate,
      AddClientComponent,
      RouterOutlet,
    ],  
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AllCommunicationComponent {

  isSelected: number = 0;
  filteredCommunicatio:Communication[] = [];
  selectedFilterCriteria: string = '';
  fruits: string[] = ['apple', 'banana', 'orange'];
  communications: Communication[] = [];
  users: SelectItem[] = [];
  selectedCommunication: Communication | null = null; // for editing
  filtername: string = "";
  filterdate:string = "";
  filterstatus: string="";
  filterCallTopic: string="";
  callTopics: callTopicSchema[] = [];
  selectedCallTopic: string = '';
  selectedCallTopic2: callTopicSchema| null = null;
  filteredCallTopic: callTopicSchema[] = [];
  callTopics2: callTopicSchema[]=[{name:"לא נמצא"}]
  is: boolean = false;
  newcallTopicSchema: callTopicSchema={
    name:""
  }
  thisSubject=""
  thisSubject2=""
  constructor(private communicationService: CommunicationService, private userService: UserService,
    private callTopicService: CallTopicService) { }

  ngOnInit(): void {
    this.getAllCommunications();
    this.loadUsers();
    this.getCallTopics();
   
  }
  getCallTopics(): void {
      this.callTopicService.getAll().subscribe(callTopic => {
      this.callTopics = callTopic ;
    });
   
  }
  getAllCommunications(): void {
    this.communicationService.getAllCommunications()
      .subscribe(communications=>{ this.communications = communications
       this.filteredCommunicatio=communications});
     
  }

  selectCommunication(communication: Communication): void {
    this.selectedCommunication = { ...communication }; // Clone the communication for editing
  }
  updateCommunication(): void {
    if(this.thisSubject!="")
    this.selectedCommunication.Subject=this.thisSubject
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
  onSelectionChange(event: Event) {
    debugger
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isSelected = Number(selectedValue.substring(6));
    this.filteredCommunicatio = this.communications;  
  }
  filterByCallTopic(event: Event){
    this.filterCallTopic=(event.target as HTMLSelectElement).value
    if ( this.filterCallTopic != "")
      this.filteredCommunicatio = this.communications.filter(communication => communication.Subject.includes(this.filterCallTopic));
    else
      this.filteredCommunicatio = this.communications;  
  }
  filterClientsByname(): void {
    if (this.filtername != "")
      this.filteredCommunicatio = this.communications.filter(communication => communication.client.includes(this.filtername));
    else
      this.filteredCommunicatio = this.communications;
  }
  filterByStatus(): void {
    if(this.filterstatus=="ליד")
      this.filterBySTtetus2('true');
    else if(this.filterstatus=="מעקב")
      this.filterBySTtetus2('false');
   else
      this.filteredCommunicatio = this.communications;
  }
  filterBySTtetus2(status):void
  {
    this.filteredCommunicatio = this.communications.filter(communication => communication.Status  === status);
  }
  filterByDate(): void {
    if (this.filterdate) {
      // המרת התאריך ממחרוזת לאובייקט Date
      const selectedDate = new Date(this.filterdate);
      
      // סינון התקשורות לפי התאריך הנבחר
      this.filteredCommunicatio = this.communications.filter(communication => {
        // המרת תאריך התקשורת לאובייקט Date
        const communicationDate = new Date(communication.date);
        
        // ביצוע השוואה בין התאריכים
        return communicationDate.toDateString() === selectedDate.toDateString();
      });
    } else {
      // אם אין תאריך נבחר, הצג את כל התקשורות
      this.filteredCommunicatio = this.communications;
    }
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
    this.selectedCallTopic2 = null;
    
  }
  select(event:  AutoCompleteSelectEvent): void {
   
      const callTopic = event.value as callTopicSchema;
      this.thisSubject=callTopic.name
    }
    add(){
      this.newcallTopicSchema.name=this.thisSubject2
      this.callTopicService.createCallTopic(this.newcallTopicSchema).subscribe(response => {
        this.callTopics.push(response);
      // הוספת הנושא החדש לרשימה המקומית
      });
    }
}
