import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { ClientService } from '../../../_services/client.service';
import { Client, ReportType } from '../../../_models/client.module';
import { User } from '../../../_models/user.module';
import { NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TokenService } from '../../../_services/token.service';
import { Router, ActivatedRoute } from '@angular/router'; // הוספתי את Router ו-ActivatedRoute
import { ButtonModule } from 'primeng/button';

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
  imports: [DialogModule, FormsModule, ReactiveFormsModule, NgIf,ButtonModule],
})
export class AddClientComponent implements OnInit { // הוספתי implements OnInit
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
      // _id: '',
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
  editingClient: Client | null = null; // משתנה לשמירת הלקוח שנערך

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private tokenService: TokenService,
    private router: Router, // הוספתי את Router
    private route: ActivatedRoute // הוספתי את ActivatedRoute
  ) {}

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

    // בדיקה אם יש לקוח ב-state והגדרת קומפוננטת עריכה
    // this.route.queryParams.subscribe(params => {
    //   if (params['client']) {
    //     this.editingClient = JSON.parse(params['client']);
    //     this.populateForm(this.editingClient);
    //   }
    // });

    if(history.state.client){
      this.editingClient= history.state.client
      this.populateForm(this.editingClient)
    }

    this.onCHangeIsWorkData();
  }

  get VATFileNumber() { return this.form.get('VATFileNumber'); }

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
    
      if (this.editingClient) {
        // עדכון לקוח קיים
        const updatedClient = { ...this.editingClient, ...this.contactForm.value };
        updatedClient.lastUserUpdate = this.tokenService.getCurrentDetail('_id');
        updatedClient.assignTo.push(this.tokenService.getCurrentDetail('_id'));
        this.clientService.updateClient(updatedClient).subscribe(response => {
          console.log('Client updated successfully:', response);
          alert('לקוח עודכן בהצלחה');
          this.router.navigate(['/clientSearch/clientManagement/clientNavbar'], { state: { client: response } });

          this.close.emit();
        });
      } 
      else {

        // יצירת לקוח חדש
        this.savedData = this.contactForm.value;
        console.log("saveData",this.savedData)

        this.newClient =  {...this.newClient,...this.savedData}  ;
        console.log("in submit",this.newClient)

        this.newClient.lastUserUpdate = this.tokenService.getCurrentDetail('_id');
        // this.newClient.assignTo.push(this.tokenService.getCurrentDetail('_id'));
        console.log("newClient",this.newClient);

        this.clientService.createClient(this.newClient.client).subscribe(response => {
          if(response){
            console.log('Client created successfully:', response);
            alert('לקוח נוצר בהצלחה');
          }
          this.close.emit();
        });
      
    }
  }

  onClose() {
    this.close.emit();
  }
  
  cancel() {
    //return to last page
    window.history.back();
  }
  
}
