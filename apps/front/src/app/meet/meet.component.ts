import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meet } from '../_models/meet.module';
import { MeetService } from '../_services/meet.service';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig, PrimeTemplate } from "primeng/api";
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client.module';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.module';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleAuthService } from '../_services/google-calendar.service';

@Component({
    selector: 'app-meet',
    templateUrl: './meet.component.html',
    styleUrl: './meet.component.css',
    standalone: true,
    imports: [FormsModule, NgClass, NgIf, MultiSelectModule, PrimeTemplate, IconProfileComponent, NgFor]
})
export class MeetComponent implements OnInit {

  @Input() meetingId: string | null = null;
  @Input() selectedDate: string | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  meeting: Meet | null = null;

  selectedClients: Client[] = [];
  clients: Client[] = [];

  selectedUsers: User[] = [];
  users: User[] = [];

  form: any = {
    address: null,
    date: null,
    beginningTime: '',
    endTime: '',
    usersId: [],
    clientDepartments: [],
  };
  allMeetings: Meet[] = []
  meetId: string = ""
  currentMeet!: Meet;

  // minEndTime: string = '';
  // maxEndTime: string = '';

  constructor(
    private meetService: MeetService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private clientService: ClientService,
    private primengConfig: PrimeNGConfig,
  private googleCalendarService:GoogleAuthService) { }

  ngOnInit(): void {
    if (this.meetingId) {
      this.getMeetById(this.meetingId);
    }
    this.form.date=this.selectedDate
    this.meetId = this.meetingId!
    // this.primengConfig.ripple = true;
    this.getAllClients()
    this.getAllUsers()
  }

  getMeetById(meetId: string) {
    debugger
    if (meetId === 'null') return;
    this.meetService.getMeetById(meetId).subscribe(
      meet => {
        this.currentMeet = meet

        const beginningTime = new Date(this.currentMeet.beginningTime);
        const endTime = new Date(this.currentMeet.endTime);

        const meetDate = new Date(this.currentMeet.date);
        const formattedDate = `${meetDate.getFullYear()}-${(meetDate.getMonth() + 1).toString().padStart(2, '0')}-${meetDate.getDate().toString().padStart(2, '0')}`;

        this.form = {
          address: this.currentMeet.address,
          date: formattedDate,
          beginningTime: beginningTime.toISOString().substring(11, 16), // פורמט HH:mm
          endTime: endTime.toISOString().substring(11, 16), // פורמט HH:mm
          usersId: this.currentMeet.usersId,
          clientDepartments: this.currentMeet.clientDepartments
        };

        this.form.usersId.forEach((userId: string) => {
          this.userService.findOne(userId).subscribe(
            user => {
              this.selectedUsers.push(user)
            },
            error => {
            }
          )
        });

        this.form.clientDepartments.forEach((clientId: string) => {
          this.clientService.searchClient(clientId).subscribe(
            clients => {
              this.selectedClients.push(clients);
            },
            error => {
            }
          );
        });

      },
      error => {
      }
    )
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      users => this.users = users,
      error => console.log(error)
    )
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe({
      next: (dataClients) => {
        this.clients = dataClients;
      },
      error: (errClients) => {
      },
    });
  }

  onUserChange(event: any) {
    this.form.usersId = event.value.map((user: User) => user._id);
  }

  onClientChange(event: any) {
    this.form.clientDepartments = event.value.map((client: Client) => client._id);
  }

  isValidURL(value: string): boolean {
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  onBeginningTimeChange() {
    // if (this.form.beginningTime) {
    //   const beginningHour = parseInt(this.form.beginningTime.split(':')[0], 10);
    //   const beginningMinute = parseInt(this.form.beginningTime.split(':')[1], 10);

    //   // Calculate max end time based on beginning time + 5 hours
    //   const maxEndTimeHour = (beginningHour + 5) % 24;
    //   this.maxEndTime = `${String(maxEndTimeHour).padStart(2, '0')}:${String(beginningMinute).padStart(2, '0')}`;

    //   // Set min end time as beginning time
    //   this.minEndTime = this.form.beginningTime;
    // }
  }

  // updateEndTimeConstraints() {
  //   if (this.form.beginningTime) {
  //     const endTimeInput = document.querySelector('input[name="endTime"]') as HTMLInputElement;
  //     endTimeInput.setAttribute('min', this.form.beginningTime);
  //     endTimeInput.setAttribute('max', this.maxEndTime || '');
  //   }
  // }

  restrictTimeOptions(event: Event) {
    // debugger  
    // const input = event.target as HTMLInputElement;
    // input.focus();
    // input.click();
}


  onSubmit(): void {

    const beginningTime = this.form.beginningTime;
    const endTime = this.form.endTime;

    const [beginningHour, beginningMinute] = beginningTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    this.form.beginningTime = new Date();
    this.form.beginningTime.setHours(+beginningHour + 3, +beginningMinute, 0, 0);

    this.form.endTime = new Date();
    this.form.endTime.setHours(+endHour + 3, +endMinute, 0, 0);

    this.currentMeet = {
      address: this.form.address,
      date: this.form.date,
      beginningTime: this.form.beginningTime,
      endTime: this.form.endTime,
      usersId: this.form.usersId,
      clientDepartments: this.form.clientDepartments
    };

    if (this.meetId == 'null') {

      this.meetService.createMeet(this.currentMeet).subscribe(
        meet => {
          this.closeModal.emit();
          // add to google-meeting
          // scheduleMeeting() {
            let appointmentTime = new Date();
            const startTime = appointmentTime.toISOString().slice(0, 18) + '-07:00';
            const endTime = appointmentTime.toISOString().slice(0, 18) + '-08:00';
            const eventDetails = {
              nameT: 'פגישה חשובה',
              description: 'פגישה על פרויקט חדש',
              startTime: '2024-07-15T10:00:00',
              endTime: '2024-07-15T11:00:00',
              email: 'rbn9574@gmail.com'
            };
            console.info(eventDetails);
            this.googleCalendarService.createGoogleEvent(eventDetails)
          },
        // },
        error => {
        }
      )
    }

    else {
      this.currentMeet.date = new Date(this.form.date)
      this.meetService.updateMeet(this.meetId, this.currentMeet).subscribe(
        meet => {
          this.closeModal.emit();
        },
        error => {
        })
    }
  }
}