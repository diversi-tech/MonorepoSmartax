import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meet } from '../_models/meet.module';
import { MeetService } from '../_services/meet.service';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client.module';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.module';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgClass, NgIf, NgFor } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { GoogleAuthService } from '../_services/google-calendar.service';
import { Subscription, tap } from 'rxjs';
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
  // cancelDialog() {
  //   this.visible = false;
  //   this.save();
  // }
  // @Input() meetingId: string | null = null;
  // @Input() selectedDate: string | null = null;
  // @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  // private eventDataSubscription: Subscription;
  // public eventId: string;
  // public conferenceLink: string;
  // d1: Date = new Date();
  // d2: Date = new Date();
  // //
  // visible: boolean = false;
  checked: boolean = false;

  // showDialog() {
  //   this.visible = true;
  // }

  // meeting: Meet | null = null;

  // selectedClients: Client[] = [];
  // clients: Client[] = [];

  // selectedUsers: User[] = [];
  // users: User[] = [];

  // form: any = {
  //   address: null,
  //   date: null,
  //   beginningTime: '',
  //   endTime: '',
  //   usersId: [],
  //   clientDepartments: [],
  // };
  // allMeetings: Meet[] = [];
  // meetId: string = '';
  // currentMeet!: Meet;

  // constructor(
  //   private meetService: MeetService,
  //   private activatedRoute: ActivatedRoute,
  //   private userService: UserService,
  //   private clientService: ClientService,
  //   private primengConfig: PrimeNGConfig,
  //   private googleCalendarService: GoogleAuthService
  // ) {}

  // ngOnInit(): void {
  //   if (this.meetingId) {
  //     this.getMeetById(this.meetingId);
  //   }
  //   debugger;
  //   this.form.date = new Date(this.selectedDate);
  //   this.meetId = this.meetingId!;
  //   // this.primengConfig.ripple = true;
  //   this.getAllClients();
  //   this.getAllUsers();
  // }

  // // Function to subscribe to event data
  // subscribeToEventData() {
  //   this.eventDataSubscription =
  //     this.googleCalendarService.eventData$.subscribe((eventData) => {
  //       if (eventData) {
  //         this.eventId = eventData.eventId;
  //         console.log('eventData: ', this.eventId);
  //         this.conferenceLink = eventData.conferenceLink;
  //         console.log('eventData: ', this.conferenceLink);
  //       }
  //     });
  // }

  // // Function to unsubscribe from event data
  // unsubscribeFromEventData() {
  //   if (this.eventDataSubscription) {
  //     this.eventDataSubscription.unsubscribe();
  //   }
  // }

  // // ngOnDestroy() {
  // //   this.unsubscribeFromEventData();
  // // }

  // cancel() {
  //   this.closeModal.emit();
  // }

  // getMeetById(meetId: string) {
  //   debugger;
  //   if (meetId === 'null') return;
  //   this.meetService.getMeetById(meetId).subscribe(
  //     (meet) => {
  //       this.currentMeet = meet;

  //       const beginningTime = new Date(this.currentMeet.beginningTime);
  //       const endTime = new Date(this.currentMeet.endTime);
  //       const meetDate = new Date(this.currentMeet.date);

  //       this.form = {
  //         address: this.currentMeet.address,
  //         date: meetDate,
  //         beginningTime: beginningTime.toISOString().substring(11, 16), // פורמט HH:mm
  //         endTime: endTime.toISOString().substring(11, 16), // פורמט HH:mm
  //         usersId: this.currentMeet.usersId,
  //         clientDepartments: this.currentMeet.clientDepartments,
  //       };

  //       this.form.usersId.forEach((userId: string) => {
  //         this.userService.findOne(userId).subscribe(
  //           (user) => {
  //             this.selectedUsers.push(user);
  //           },
  //           (error) => {}
  //         );
  //       });

  //       this.form.clientDepartments.forEach((clientId: string) => {
  //         this.clientService.searchClient(clientId).subscribe(
  //           (clients) => {
  //             this.selectedClients.push(clients);
  //           },
  //           (error) => {}
  //         );
  //       });
  //     },
  //     (error) => {}
  //   );
  // }
  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe(
  //     (users) => (this.users = users),
  //     (error) => console.log(error)
  //   );
  // }

  // getAllClients() {
  //   this.clientService.getAllClients().subscribe({
  //     next: (dataClients) => {
  //       this.clients = dataClients;
  //     },
  //     error: (errClients) => {},
  //   });
  // }

  // onUserChange(event: any) {
  //   this.form.usersId = event.value.map((user: User) => user._id);
  // }

  // onClientChange(event: any) {
  //   this.form.clientDepartments = event.value.map(
  //     (client: Client) => client._id
  //   );
  // }

  // isValidURL(value: string): boolean {
  //   let url;
  //   try {
  //     url = new URL(value);
  //   } catch (_) {
  //     return false;
  //   }
  //   return url.protocol === 'http:' || url.protocol === 'https:';
  // }

  // // add to google-meeting
  // scheduleMeeting() {
  //   // return new Promise<void>((resolve, reject) => {
  //     // Call save() function after all tasks are done

  //     this.visible = false;
  //     debugger;

  //     let appointmentTime = new Date();
  //     const startTime3 =
  //       appointmentTime.toISOString().slice(0, 18) +
  //       '-' +
  //       this.form.beginningTime;
  //     const endTime3 =
  //       appointmentTime.toISOString().slice(0, 18) + '-' + this.form.endTime;
  //     // חיבור התאריך והשעה לפורמט ISO
  //     // המרת תאריך ושעה לפורמט ISO
  //     // this.d1=this.form.date
  //     // this.d2=this.form.date

  //     // const b=this.form.beginningTime
  //     // const[h,m]=b.split(':')
  //     // this.form.beginningTime=new Date()
  //     // this.form.beginningTime.setHours(+h + 3, +m, 0, 0);

  //     // const e=this.form.endTime

  //     const startDateTime2 = new Date(
  //       this.form.date.getFullYear(),
  //       this.form.date.getMonth(),
  //       this.form.date.getDate(),
  //       this.d1.getHours(),
  //       this.d1.getMinutes()
  //     ).toISOString();

  //     const endDateTime2 = new Date(
  //       this.form.date.getFullYear(),
  //       this.form.date.getMonth(),
  //       this.form.date.getDate(),
  //       this.d2.getHours(),
  //       this.d2.getMinutes()
  //     ).toISOString();
  //     const em = this.getEmailById(this.form.usersId);

  //     const eventDetails = {
  //       nameT: 'פגישה חשובה',
  //       description: 'פגישה על פרויקט חדש',
  //       startTime: startTime3, //'2024-07-15T10:00:00'
  //       endTime: endTime3,
  //       emails: em,
  //     };
  //     console.info(eventDetails);
  //     this.googleCalendarService.createGoogleEvent(eventDetails);

  //     this.subscribeToEventData();

  //     this.save();
  //   //   resolve();
  //   // });
  // }

  // // callScheduleMeeting() {
  // //   this.scheduleMeeting().then(() => {
  // //     this.save();
  // //   });
  // // }
  // getEmailById(idArray: string[]) {
  //   const emails = idArray.map((id) => {
  //     const item = this.users.find((item) => item._id === id);
  //     return item ? item.email : null;
  //   });

  //   return emails.filter((email) => email !== null); // מסיר את הקיום
  // }

  // save(): void {
  //   const beginningTime = this.form.beginningTime;
  //   const endTime = this.form.endTime;

  //   const [beginningHour, beginningMinute] = beginningTime.split(':');
  //   const [endHour, endMinute] = endTime.split(':');

  //   this.form.beginningTime = new Date();
  //   this.form.beginningTime.setHours(
  //     +beginningHour + 3,
  //     +beginningMinute,
  //     0,
  //     0
  //   );

  //   this.form.endTime = new Date();
  //   this.form.endTime.setHours(+endHour + 3, +endMinute, 0, 0);
  //   if(this.checked){
  //     this.form.address=this.conferenceLink
  //   }
  //   this.currentMeet = {
  //     address: this.form.address,
  //     date: this.form.date,
  //     beginningTime: this.form.beginningTime,
  //     endTime: this.form.endTime,
  //     usersId: this.form.usersId,
  //     clientDepartments: this.form.clientDepartments,
  //   };

  //   if (this.meetId == 'null') {
  //     this.meetService.createMeet(this.currentMeet).subscribe(
  //       (meet) => {
  //         this.closeModal.emit();
  //       },
  //       // },
  //       (error) => {}
  //     );
  //   } else {
  //     this.currentMeet.date = new Date(this.form.date);
  //     this.meetService.updateMeet(this.meetId, this.currentMeet).subscribe(
  //       (meet) => {
  //         this.closeModal.emit();
  //       },
  //       (error) => {}
  //     );
  //   }
  // }

  // updateMeeting() {
  //   const eventDetails = {
  //     eventId: 'ID של האירוע שנשמר כאן',
  //     nameT: 'פגישה מעודכנת',
  //     description: 'פגישה מעודכנת על פרויקט חדש',
  //     startTime: '2024-07-15T12:00:00',
  //     endTime: '2024-07-15T13:00:00',
  //     emails: ['sh054848758@gmail.com', 'tzwine974@gmail.com'],
  //   };
  //   this.googleCalendarService.updateGoogleEvent(eventDetails);

  //   this.subscribeToEventData();
  // }

  // ===========================================
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
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private clientService: ClientService,
    private primengConfig: PrimeNGConfig,
    private googleCalendarService: GoogleAuthService
  ) {}

  ngOnInit(): void {
    if (this.meetingId) {
      this.getMeetById(this.meetingId);
    }
    debugger;
    this.form.date = new Date(this.selectedDate);
    this.meetId = this.meetingId!;
    // this.primengConfig.ripple = true;
    this.getAllClients();
    this.getAllUsers();
  }

  // Function to subscribe to event data
  subscribeToEventData() {
    // alert('se1')
    this.eventDataSubscription =
      this.googleCalendarService.eventData$.subscribe((eventData) => {
        if (eventData) {
          // alert('se2')
          console.log(eventData);
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
            (error) => {}
          );
        });

        this.form.clientDepartments.forEach((clientId: string) => {
          this.clientService.searchClient(clientId).subscribe(
            (clients) => {
              this.selectedClients.push(clients);
            },
            (error) => {}
          );
        });
      },
      (error) => {}
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
      error: (errClients) => {},
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
    // if (this.meetId == 'null') {
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
        // alert('הפגישה נוספה בהצלחה');
        this.subscribeToEventData();
        setTimeout(() => {
          this.save();
        }, 1000); // המתנה 1 שניות, כדי לוודא שההרשמות הושלמו בצורה נכונה

        // this.save(); // Save meeting details
      })
      .catch((error) => {
        console.error('Error creating Google event:', error);
      });

    // this.googleCalendarService.createGoogleEvent(eventDetails);
    // await this.googleCalendarService.createGoogleEvent(eventDetails);
    // this.googleCalendarService.createGoogleEvent(eventDetails).pipe(
    //   tap((eventData) => {
    //     this.eventId = eventData.eventId;
    //     this.conferenceLink = eventData.conferenceLink;
    //   })
    // );

    // await this.save();
    // } else {
    //   this.save();
    // }
  }

  getEmailById(idArray: string[]) {
    const emails = idArray.map((id) => {
      const item = this.users.find((item) => item._id === id);
      return item ? item.email : null;
    });

    return emails.filter((email) => email !== null); // מסיר את הקיום
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
    // alert('2');

    if (this.eventId) {
      this.currentMeet.googleId = this.eventId;
    }

    if (this.checked && this.conferenceLink) {
      this.currentMeet.address = this.conferenceLink;
    }

    // alert(this.conferenceLink);

    console.log(this.currentMeet);

    if (this.meetId == 'null') {
      this.meetService.createMeet(this.currentMeet).subscribe(
        (meet) => {
          this.closeModal.emit();
          // alert('4');
        },
        // },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.currentMeet.date = new Date(this.form.date);
      this.meetService.updateMeet(this.meetId, this.currentMeet).subscribe(
        (meet) => {
          this.closeModal.emit();

          // updateMeeting() {
          if (this.eventId) {
            // const eventDetails = {
            //   eventId: this.eventId,
            //   nameT: 'פגישה מעודכנת',
            //   description: 'nnnפגישה מעודכנת על פרויקט חדש',
            //   startTime: '2024-07-15T12:00:00',
            //   endTime: '2024-07-15T13:00:00',
            //   emails: ['sh054848758@gmail.com', 'tzwine974@gmail.com'],
            // };
            // debugger;
            // this.googleCalendarService.updateGoogleEvent(eventDetails);
            this.updateMeetingGoogle();
            // this.subscribeToEventData();
          }
        },
        (error) => {}
      );
    }
  }

  updateMeetingGoogle() {
    // ======time=======
    const beginningTime = new Date(this.form.beginningTime);
    const endTime = new Date(this.form.endTime);

    beginningTime.setHours(beginningTime.getHours() - 3);
    endTime.setHours(endTime.getHours() - 3);

    // convert to ISO8601
    // const beginningTimeISO = beginningTime.toISOString();
    // const endTimeISO = endTime.toISOString();
    // =============

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
