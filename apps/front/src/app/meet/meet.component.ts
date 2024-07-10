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

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrl: './meet.component.css',
  standalone: true,
  imports: [FormsModule,
    NgClass,
    NgIf,
    MultiSelectModule,
    PrimeTemplate,
    IconProfileComponent,
    NgFor,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    ReactiveFormsModule,
    ListboxModule
  ]
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

  constructor(
    private meetService: MeetService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private clientService: ClientService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    if (this.meetingId) {
      this.getMeetById(this.meetingId);
    }
    debugger
    this.form.date = new Date(this.selectedDate)
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

        this.form = {
          address: this.currentMeet.address,
          date: meetDate,
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


  cancel() {
    this.closeModal.emit();
  }


  save(): void {

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
        },
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