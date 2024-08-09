import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meet } from '../_models/meet.module';
import { MeetService } from '../_services/meet.service';
import { PrimeTemplate } from 'primeng/api';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client.module';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.module';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgClass, NgIf, NgFor } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { GoogleAuthService } from '../_services/google-calendar.service';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrl: './meet.component.css',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    MultiSelectModule,
    PrimeTemplate,
    IconProfileComponent,
    NgFor,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    ListboxModule,
    CheckboxModule,
  ],
})
export class MeetComponent implements OnInit {

  checked: boolean = false;


  @Input() meetingId: string | null = null;
  @Input() selectedDate: string | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  private eventDataSubscription: Subscription;
  public eventId: string;
  public conferenceLink: string;
  d1: Date = new Date();
  d2: Date = new Date();
  //
  visible: boolean = false;

  showDialog() {
    if (this.meetId == 'null') {
      this.visible = true;
    } else {
      this.save();
    }
  }

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
  allMeetings: Meet[] = [];
  meetId: string = '';
  currentMeet!: Meet;

  constructor(
    private meetService: MeetService,
    private userService: UserService,
    private clientService: ClientService,
    private googleCalendarService: GoogleAuthService
  ) { }

  ngOnInit(): void {
    if (this.meetingId) {
      this.getMeetById(this.meetingId);
    }
    this.form.date = new Date(this.selectedDate);
    this.meetId = this.meetingId!;
    this.getAllClients();
    this.getAllUsers();
  }

  // Function to subscribe to event data
  subscribeToEventData() {
    this.eventDataSubscription =
      this.googleCalendarService.eventData$.subscribe((eventData) => {
        if (eventData) {
          this.eventId = eventData.eventId;
          this.conferenceLink = eventData.conferenceLink;
        }
      });
  }

  // Function to unsubscribe from event data
  unsubscribeFromEventData() {
    if (this.eventDataSubscription) {
      this.eventDataSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribeFromEventData();
  }

  cancel() {
    this.closeModal.emit();
  }

  getMeetById(meetId: string) {
    if (meetId === 'null') return;
    this.meetService.getMeetById(meetId).subscribe(
      (meet) => {
        this.currentMeet = meet;

        const beginningTime = new Date(this.currentMeet.beginningTime);
        const endTime = new Date(this.currentMeet.endTime);
        const meetDate = new Date(this.currentMeet.date);
        if (meet.googleId) this.eventId = meet.googleId;

        this.form = {
          address: this.currentMeet.address,
          date: meetDate,
          beginningTime: beginningTime.toISOString().substring(11, 16), // פורמט HH:mm
          endTime: endTime.toISOString().substring(11, 16), // פורמט HH:mm
          usersId: this.currentMeet.usersId,
          clientDepartments: this.currentMeet.clientDepartments,
        };

        this.form.usersId.forEach((userId: string) => {
          this.userService.findOne(userId).subscribe(
            (user) => {
              this.selectedUsers.push(user);
            },
            (error) => { }
          );
        });

        this.form.clientDepartments.forEach((clientId: string) => {
          this.clientService.searchClient(clientId).subscribe(
            (clients) => {
              this.selectedClients.push(clients);
            },
            (error) => { }
          );
        });
      },
      (error) => { }
    );
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => (this.users = users),
      (error) => console.log(error)
    );
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe({
      next: (dataClients) => {
        this.clients = dataClients;
      },
      error: (errClients) => { },
    });
  }

  onUserChange(event: any) {
    this.form.usersId = event.value.map((user: User) => user._id);
  }

  onClientChange(event: any) {
    this.form.clientDepartments = event.value.map(
      (client: Client) => client._id
    );
  }
  cancelDialog() {
    this.visible = false;
    this.save();
  }

  isValidURL(value: string): boolean {
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  // add to google-meeting
  async scheduleMeeting() {
    this.visible = false;
    // ======time=======
    const beginningTime = this.form.beginningTime;
    const endTime = this.form.endTime;

    const [beginningHour, beginningMinute] = beginningTime
      .split(':')
      .map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const today = new Date();
    const startDateTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      beginningHour,
      beginningMinute,
      0,
      0
    );

    const endDateTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      endHour,
      endMinute,
      0,
      0
    );

    // =============

    const em = this.getEmailById(this.form.usersId);

    const eventDetails = {
      nameT: 'פגישה חשובה',
      description: 'פגישה על פרויקט חדש',
      startTime: startDateTime, //'2024-07-15T10:00:00'
      endTime: endDateTime,
      emails: em,
    };
    console.info(eventDetails);

    // Create Google event and return a promise
    const createEventPromise =
      this.googleCalendarService.createGoogleEvent(eventDetails);

    // After creating event, save the meeting
    createEventPromise
      .then(() => {
        this.subscribeToEventData();
        setTimeout(() => {
          this.save();
        }, 1000);
      })
      .catch((error) => {
        console.error('Error creating Google event:', error);
      });
  }

  getEmailById(idArray: string[]) {
    const emails = idArray.map((id) => {
      const item = this.users.find((item) => item._id === id);
      return item ? item.email : null;
    });

    return emails.filter((email) => email !== null);
  }

  save(): void {
    const beginningTime = this.form.beginningTime;
    const endTime = this.form.endTime;

    const [beginningHour, beginningMinute] = beginningTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    this.form.beginningTime = new Date();
    this.form.beginningTime.setHours(
      +beginningHour + 3,
      +beginningMinute,
      0,
      0
    );

    this.form.endTime = new Date();
    this.form.endTime.setHours(+endHour + 3, +endMinute, 0, 0);

    this.currentMeet = {
      address: this.form.address,
      date: this.form.date,
      beginningTime: this.form.beginningTime,
      endTime: this.form.endTime,
      usersId: this.form.usersId,
      clientDepartments: this.form.clientDepartments,
    };
    if (this.eventId) {
      this.currentMeet.googleId = this.eventId;
    }

    if (this.checked && this.conferenceLink) {
      this.currentMeet.address = this.conferenceLink;
    }
    if (this.meetId == 'null') {
      this.meetService.createMeet(this.currentMeet).subscribe(
        (meet) => {
          this.closeModal.emit();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.currentMeet.date = new Date(this.form.date);
      this.meetService.updateMeet(this.meetId, this.currentMeet).subscribe(
        (meet) => {
          this.closeModal.emit();
          if (this.eventId) {
            this.updateMeetingGoogle();
          }
        },
        (error) => { }
      );
    }
  }

  updateMeetingGoogle() {
    // ======time=======
    const beginningTime = new Date(this.form.beginningTime);
    const endTime = new Date(this.form.endTime);

    beginningTime.setHours(beginningTime.getHours() - 3);
    endTime.setHours(endTime.getHours() - 3);
    const emailArray = this.getEmailById(this.form.usersId);

    const eventDetails = {
      eventId: this.eventId,
      nameT: 'פגישה מעודכנת',
      description: 'nnnפגישה מעודכנת על פרויקט חדש',
      startTime: beginningTime,
      endTime: endTime,
      emails: emailArray,
    };
    this.googleCalendarService.updateGoogleEvent(eventDetails);
  }
}
