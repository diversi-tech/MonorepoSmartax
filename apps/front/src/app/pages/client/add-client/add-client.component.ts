import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ClientService } from '../../../_services/client.service';
import { Client, ReportType } from '../../../_models/client.module';
import { User } from '../../../_models/user.module';
import { NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TokenService } from '../../../_services/token.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
  providers: [ClientService],
  animations: [
    trigger('dialog', [
      state(
        'void',
        style({
          transform: 'scale(0.7)',
          opacity: 0,
        })
      ),
      transition('void => *', [
        animate('0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'),
      ]),
      transition('* => void', [
        animate(
          '0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            transform: 'scale(0.7)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
  standalone: true,
  imports: [DialogModule, FormsModule, ReactiveFormsModule, NgIf],
})
export class AddClientComponent {
  contactForm!: FormGroup;
  displayDialog: boolean = true;
  @Output() close = new EventEmitter<void>();
  savedData: any;
  newClient: any = {
    companyName: '',
    firstName: '',
    lastName: '',
    contactPersonName: '',
    tz: '',
    spouseName: '',
    spouseTZ: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    encryptedPasswords: [],
    comments: '',
    lastUserUpdate: {
      _id: '',
      userName: '',
      email: '',
      passwordHash: '',
      role: '',
      favorites: [],
    },
    assignTo: [],
    dateOfBirth: new Date(),
    isEmploysWorkers: false,
    isWorkData: false,
    incomeTaxFileNumber: '',
    incomeTaxDeductions_registerID: '',
    VATFileNumber: '',
    reports: ReportType.NotReporting,
    isStatisticsData: false,
    referrerName: '',
    joinDate: new Date(),
    isAccounter: false,
    isOpenAccountWithUs: false,
    tag: { color: '', text: '' },
    payment: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private ClientServic: ClientService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      firstName: [
        '',
        [Validators.required, Validators.pattern('[ a-zA-Zא-ת]{2,}')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('[ a-zA-Zא-ת]{2,}')],
      ],
      contactPersonName: ['', Validators.required],
      tz: ['', Validators.required],
      spouseName: ['', Validators.required],
      spouseTZ: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^0(2|3|4|8|9|7[1-46-9]|5[0-578])[.-:]?([2-9][0-9]{6})$'
          ),
        ],
      ],
      whatsapp: [''],
      email: [''],
      address: [''],
      dateOfBirth: ['', Validators.required],
      comments: [''],
      isEmploysWorkers: [false],
      isWorkData: [false],
      incomeTaxFileNumber: [''],
      incomeTaxDeductions_registerID: [''],
      VATFileNumber: [''],
      reports: [''],
      isStatisticsData: [false],
      referrerName: [''],
      joinDate: [''],
      isAccounter: [false],
      isOpenAccountWithUs: [false],
    });
  }

  onSubmit() {
    console.log('submit');

    if (this.contactForm.valid) {
      alert('נשמר בהצלחה');
      this.savedData = this.contactForm.value;
      this.newClient.companyName = this.savedData.companyName;
      this.newClient.firstName = this.savedData.firstName;
      this.newClient.lastName = this.savedData.lastName;
      this.newClient.contactPersonName = this.savedData.contactPersonName;
      this.newClient.tz = this.savedData.tz;
      this.newClient.spouseName = this.savedData.spouseName;
      this.newClient.spouseTZ = this.savedData.spouseTZ;
      this.newClient.address = this.savedData.address;
      this.newClient.comments = this.savedData.comments;
      this.newClient.dateOfBirth = this.savedData.dateOfBirth;
      this.newClient.email = this.savedData.email;
      this.newClient.incomeTaxDeductions_registerID =
        this.savedData.incomeTaxDeductions_registerID;
      this.newClient.incomeTaxFileNumber = this.savedData.incomeTaxFileNumber;
      this.newClient.isAccounter = this.savedData.isAccounter;
      this.newClient.isEmploysWorkers = this.savedData.isEmploysWorkers;
      this.newClient.isOpenAccountWithUs = this.savedData.isOpenAccountWithUs;
      this.newClient.isStatisticsData = this.savedData.isStatisticsData;
      this.newClient.isWorkData = this.savedData.isWorkData;
      this.newClient.joinDate = this.savedData.joinDate;
      this.newClient.phone = this.savedData.phone;
      this.newClient.referrerName = this.savedData.referrerName;
      this.newClient.reports = this.savedData.reports;
      this.newClient.whatsapp = this.savedData.whatsapp;
      this.newClient.VATFileNumber = this.savedData.VATFileNumber;
      this.newClient.lastUserUpdate = this.tokenService.getCurrentDetail('_id');
      this.newClient.assignTo.push(this.tokenService.getCurrentDetail('_id'));
      this.newClient.tag.color = 'black';
      this.newClient.tag.text = ' ';
      console.log(this.newClient);

      this.ClientServic.createClient(this.newClient).subscribe((response) => {
        console.log('Client created successfully:', response);
      });

      this.close.emit();
    }
  }
  onClose() {
    this.close.emit();
  }
}
