import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientService } from '../../../_services/client.service';
import { Client, ReportType } from '../../../_models/client.module';
import { NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TokenService } from '../../../_services/token.service';
import { ButtonModule } from 'primeng/button';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
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
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    ButtonModule
  ],
})
export class AddClientComponent implements OnInit {
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
    isPreferWhatsapp: false
  };
  isWorkData: boolean = false;
  form: FormGroup;
  editingClient: Client | null = null;
  get VATFileNumber() { return this.form.get('VATFileNumber'); }


  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      companyName: ['', [Validators.maxLength(20)]],
      firstName: [
        '',
        [Validators.required, Validators.pattern('[ a-zA-Zא-ת]{2,}'), Validators.maxLength(25)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('[ a-zA-Zא-ת]{2,}'), Validators.maxLength(25)],
      ],
      contactPersonName: ['', [Validators.maxLength(20)]],
      tz: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      spouseName: ['', [Validators.maxLength(20)]],
      spouseTZ: ['', [Validators.pattern('[0-9]{9}')]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^0(2|3|4|8|9|7[1-46-9]|5[0-578])[.-:]?([2-9][0-9]{6})$'
          ),
        ],
      ],
      whatsapp: ['',
        [
          Validators.pattern(
            '^0(2|3|4|8|9|7[1-46-9]|5[0-578])[.-:]?([2-9][0-9]{6})$'
          ),
        ],],
      businessActivity: ["", [Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.maxLength(25)]],
      dateOfBirth: ['', Validators.required],
      comments: ['', [Validators.maxLength(155)]],
      isEmploysWorkers: [false],
      isWorkData: [false],
      incomeTaxFileNumber: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
      incomeTaxDeductions_registerID: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
      VATFileNumber: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
      reports: [''],
      isStatisticsData: [false],
      referrerName: ['', [Validators.maxLength(25)]],
      joinDate: [''],
      isAccounter: [false],
      isOpenAccountWithUs: [false],
      isPreferWhatsapp: [false]
    });
    if (history.state.client) {
      this.editingClient = history.state.client
      this.populateForm(this.editingClient)
    }
    else {
      this.populateForm(this.newClient);
    }
    this.onCHangeIsWorkData();
  }


  onCHangeIsWorkData(): void {
    this.isWorkData = this.contactForm.get('isWorkData')?.value;
  }

  populateForm(client: Client) {
    this.contactForm.patchValue({
      companyName: client.companyName,
      firstName: client.firstName,
      lastName: client.lastName,
      contactPersonName: client.contactPersonName,
      tz: client.tz,
      spouseName: client.spouseName,
      spouseTZ: client.spouseTZ,
      phone: client.phone,
      whatsapp: client.whatsapp,
      email: client.email,
      address: client.address,
      dateOfBirth: client.dateOfBirth,
      comments: client.comments,
      isEmploysWorkers: client.isEmploysWorkers,
      isWorkData: client.isWorkData,
      incomeTaxFileNumber: client.incomeTaxFileNumber,
      incomeTaxDeductions_registerID: client.incomeTaxDeductions_registerID,
      VATFileNumber: client.VATFileNumber,
      reports: client.reports,
      isStatisticsData: client.isStatisticsData,
      referrerName: client.referrerName,
      joinDate: client.joinDate,
      isAccounter: client.isAccounter,
      isOpenAccountWithUs: client.isOpenAccountWithUs,
      isPreferWhatsapp: client.isPreferWhatsapp
    });
  }

  sent() {
    if (this.contactForm.valid) {
      if (this.editingClient) {
        console.log('update client');
        const updatedClient = { ...this.editingClient, ...this.contactForm.value };
        updatedClient.lastUserUpdate = this.tokenService.getCurrentDetail('_id');
        updatedClient.assignTo.push(this.tokenService.getCurrentDetail('_id'));

        this.clientService.updateClient(updatedClient).subscribe(
          response => {
            if (response?._id) {
              Swal.fire('Success', 'לקוח עודכן בהצלחה', 'success');
              this.router.navigate(['/clientSearch/clientManagement/clientNavbar'], { state: { client: response } });
            } else {
              Swal.fire('Error', 'Invalid client', 'error');
            }
            this.close.emit();
          },
          error => {
            console.error('Error updating client:', error);
            Swal.fire('Error', `Failed to update client: ${error.message}`, 'error');
          }
        );
      }
      else {
        this.newClient.companyName = this.contactForm.value.companyName,
          this.newClient.lastName = this.contactForm.value.lastName,
          this.newClient.firstName = this.contactForm.value.firstName,
          this.newClient.contactPersonName = this.contactForm.value.contactPersonName,
          this.newClient.tz = this.contactForm.value.tz,
          this.newClient.spouseName = this.contactForm.value.spouseName,
          this.newClient.spouseTZ = this.contactForm.value.spouseTZ,
          this.newClient.phone = this.contactForm.value.phone,
          this.newClient.whatsapp = this.contactForm.value.whatsapp,
          this.newClient.email = this.contactForm.value.email,
          this.newClient.address = this.contactForm.value.address,
          this.newClient.dateOfBirth = this.contactForm.value.dateOfBirth,
          this.newClient.comments = this.contactForm.value.comments,
          this.newClient.isEmploysWorkers = this.contactForm.value.isEmploysWorkers,
          this.newClient.isWorkData = this.contactForm.value.isWorkData,
          this.newClient.incomeTaxFileNumber = this.contactForm.value.incomeTaxFileNumber,
          this.newClient.incomeTaxDeductions_registerID = this.contactForm.value.incomeTaxDeductions_registerID,
          this.newClient.VATFileNumber = this.contactForm.value.VATFileNumber,
          this.newClient.reports = this.contactForm.value.reports,
          this.newClient.isStatisticsData = this.contactForm.value.isStatisticsData,
          this.newClient.referrerName = this.contactForm.value.referrerName,
          this.newClient.joinDate = this.contactForm.value.joinDate,
          this.newClient.isAccounter = this.contactForm.value.isAccounter,
          this.newClient.isOpenAccountWithUs = this.contactForm.value.isOpenAccountWithUs,
          this.newClient.isPreferWhatsapp = this.contactForm.value.isPreferWhatsapp
        this.clientService.createClient(this.newClient).subscribe(
          response => {
            if (response) {
              console.log('Client created successfully:', response);
              Swal.fire('Success', 'לקוח נוצר בהצלחה', 'success');
            }
            this.close.emit();
          },
          error => {
            console.error('Error creating client:', error);
            Swal.fire('Error', `Failed to create client: ${error.message}`, 'error');
          }
        );
      }
    }
  }

  onClose() {
    this.close.emit();
  }

  cancel() {
    window.history.back();
  }
}
