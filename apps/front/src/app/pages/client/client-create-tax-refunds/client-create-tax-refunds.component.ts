import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { YearlyReport } from '../../../_models/yearlyReport.module';
import { stepFieldService } from '../../../_services/step_field.service';
import { Year } from '../../../_models/year.module';
import { DropdownModule } from 'primeng/dropdown';
import { YearService } from '../../../_services/year.service';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { TokenService } from '../../../_services/token.service';
import { DialogModule } from 'primeng/dialog';
import { Location } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Status } from '../../../_models/status.module';
import { StatusService } from '../../../_services/status.service';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TaxRefundsService } from '../../../_services/taxRefunds.service';
import { TaxRefunds } from '../../../_models/taxRefunds.module';


@Component({
  selector: 'app-client-create-tax-refunds',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    CommonModule,
    StepperModule,
    CheckboxModule,
    ButtonModule,
    InputOtpModule,
    ReactiveFormsModule,
    DialogModule,
    InputNumberModule,
      AutoCompleteModule,
      PrimeTemplate,
      TableModule,
      RouterOutlet
  ],
  templateUrl: './client-create-tax-refunds.component.html',
  styleUrl: './client-create-tax-refunds.component.css',
})
@Injectable({
  providedIn: 'root', // Ensure it's provided in root or a specific module
})
export class ClientCreateTaxRefunds implements OnInit {
  displayModal: boolean = false;
  taxRefundsForm: FormGroup;
  userId: string; // Assuming the client ID is passed via the state
  client: any | undefined = undefined;
  formSubmitted = false;
  newYear: Year={
    yearNum: "",
    _id: ''
  }
  typeOptions: any[] = [
    { label: 'פיצול לעצמאי', value: 'עצמאי' },
    { label: 'עמותה', value: 'עמותה' },
    { label: 'חברה', value: 'חברה' },
  ];
  Year2:any[]=[{yearNum:"לא נמצא"}];
  employeName: string;
  reportToUpdate: YearlyReport | null = null;
  yearList: Year[];
  yearList2: Year[];
  statusList: Status[] = [];
  selectedyear: Year| null = null;
  thisSubject2="";
  is: boolean=false;
  thisSubject="";
  constructor(
    private fb: FormBuilder,
    private stepFieldsService: stepFieldService,
    private taxRefundsService: TaxRefundsService,
    private yearService: YearService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,// Inject ActivatedRoute
    private location: Location,
    private statusService: StatusService ,

  ) {
    this.loadData();
  }

  loadData() {
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        console.log(data);
        this.yearList = data;
        this.yearList2 = data;

      },
      error: (error) => {
        console.log(error);
      },
    },
    );
    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error);
      },

    })
    this.userId = this.tokenService.getCurrentDetail('_id');
    this.client = history.state.client;
    this.reportToUpdate = history.state.responseData || null;
  }

  showModalDialog() {
    this.displayModal = true;

  }

  hideModalDialog() {
    this.displayModal = false;

  }

  ngOnInit(): void {
    this.taxRefundsForm = this.fb.group({
      type: ['', Validators.required],
      price: ['', Validators.required],
      paymentAmountPaid: ['', Validators.required],
      balanceDue: ['', Validators.required],
    });
    if (this.reportToUpdate) {
      this.taxRefundsForm.patchValue({
        type: this.reportToUpdate.entityType,
        year: this.reportToUpdate.yearReport,
        price: this.reportToUpdate.price,
        paymentAmountPaid: this.reportToUpdate.paymentAmountPaid,
        balanceDue: this.reportToUpdate.balanceDue,
        status: this.reportToUpdate.status,
      });
    }
    this.showModalDialog(); // Open the modal dialog when component initializes
  }

  onSubmit() {
   
    this.formSubmitted = true;
    if (this.taxRefundsForm.valid) {
      const taxRefunds = this.taxRefundsForm.value;
      taxRefunds.yearReport=this.thisSubject

      if (this.reportToUpdate) {
        const status =  this.determineStatus();
        this.updateTaxRefunds(taxRefunds,status);
      } else {
        this.createTaxRefunds(taxRefunds);
      }
    }
    this.hideModalDialog(); 
  }

  determineStatus(): Status {
    const stepsList = this.reportToUpdate ? this.reportToUpdate.stepsList : [];
    const allCompleted = stepsList.every(step => step.isCompleted);
    const someCompleted = stepsList.some(step => step.isCompleted);

    if (allCompleted) {
      return this.statusList.find(s => s.name == 'COMPLETE') || null;
    } else if (someCompleted) {
      return this.statusList.find(s => s.name == 'IN PROGRESS') || null;
    } else {
      return this.statusList.find(s => s.name == 'TO DO') || null;
    }
  }

  createTaxRefunds(taxRefunds:any) {
    
    console.log('taxRefunds', taxRefunds);
    taxRefunds.status = this.statusList.find(s => s.name == 'TO DO') || null;
    const tax: TaxRefunds = {
      idClient: this.client._id,
      assignee: [this.userId],
      idEmploye: this.userId,
      year:taxRefunds.yearReport,
      date: new Date(),
      price: taxRefunds.price,
      paymentAmountPaid: taxRefunds.paymentAmountPaid,
      balanceDue: taxRefunds.balanceDue,
      stepsList: null,
      entityType: taxRefunds.type,
      status: taxRefunds.status,
    };

    this.taxRefundsService.createTaxRefunds(tax).subscribe(
      (response) => {
        console.log("response", response);
        this.router.navigate(
          ['/clientSearch/clientManagement/clientNavbar/taxRefunds'],
          {
            state: { data: response, client: this.client },

          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTaxRefunds(taxRefund: any, status:any) {
    const updatedReport: TaxRefunds = {
      ...this.reportToUpdate,
      year: taxRefund.yearNUm,
      price: taxRefund.price,
      paymentAmountPaid: taxRefund.paymentAmountPaid,
      balanceDue: taxRefund.balanceDue,
      entityType: taxRefund.type,
      status: status,
      date: new Date(),
    };

    this.taxRefundsService
      .updateTaxRefunds(this.reportToUpdate._id, updatedReport)
      .then(
        (response) => {
          console.log(response);
          if (response)
            this.location.back();

        },
        (error) => {
          console.log(error);
        }
      );
  }
  goBack(): void {
    this.location.back();
  }
  filterByyear(value: string): void {
   console.log(this.yearList2,'2')
    if (value != "") {
      this.is=false
      const query = value.toLowerCase();
      this.yearList2 = this.yearList.filter(year => 
        year.yearNum.toLowerCase().includes(query.toLowerCase())
      );
      if(this.yearList2.length==0)
        {
          this.yearList2=this.Year2
          this.thisSubject2=value
          this.is=true; 
        }
    }
    else
    {
      this.is=false
      console.log(this.yearList,'1')
      this.yearList2 = this.yearList;
    }
    this.selectedyear = null;
    
  }
  select(event:  AutoCompleteSelectEvent): void {
      const year = event.value as Year;
      this.thisSubject=year.yearNum
    }
    add(){
      alert(this.thisSubject2)
      this.newYear.yearNum=this.thisSubject2
      this.yearService.createYear(this.newYear).subscribe(response => {
        this.yearList.push(response); 
        alert( response.yearNum +" "+"נוסף בהצלחה") 
      });
    }
}
