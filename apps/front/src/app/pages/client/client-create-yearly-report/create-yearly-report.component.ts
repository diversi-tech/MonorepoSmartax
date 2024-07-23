import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { YearlyReport } from '../../../_models/yearlyReport.module';
import { stepFieldService } from '../../../_services/step_field.service';
import { Year } from '../../../_models/year.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { YearService } from '../../../_services/year.service';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { TokenService } from '../../../_services/token.service';
import { DialogModule } from 'primeng/dialog';
import { error } from 'console';

@Component({
  selector: 'app-create-yearly-report',
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
  ],
  templateUrl: './create-yearly-report.component.html',
  styleUrl: './create-yearly-report.component.css',
})
@Injectable({
  providedIn: 'root', // Ensure it's provided in root or a specific module
})
export class CreateYearlyReportComponent implements OnInit {
  displayModal: boolean = false;
  yearlyReportForm: FormGroup;
  userId: string; // Assuming the client ID is passed via the state
  client: any | undefined = undefined;
  formSubmitted = false;
  yearList: Year[];
  typeOptions: any[] = [
    { label: 'פיצול לעצמאי', value: 'עצמאי' },
    { label: 'עמותה', value: 'עמותה' },
    { label: 'חברה', value: 'חברה' },
  ];
  employeName: string;
  reportToUpdate: YearlyReport | null = null;

  constructor(
    private fb: FormBuilder,
    private stepFieldsService: stepFieldService,
    private yearlyReportService: YearlyReportService,
    private yearService: YearService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute

  ) {
    this.loadData();
  }

  loadData() {
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        console.log(data);
        this.yearList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.userId = this.tokenService.getCurrentDetail('_id');
    this.client = history.state.client;
    this.reportToUpdate = history.state.report || null;
    console.log('client', this.client);
    console.log('user', this.userId);
    console.log('reportToUpdate', this.reportToUpdate);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  hideModalDialog() {
    this.displayModal = false;
  }

  ngOnInit(): void {
    this.yearlyReportForm = this.fb.group({
      type: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      paymentAmountPaid: ['', Validators.required],
      balanceDue: ['', Validators.required],
    });
    if (this.reportToUpdate) {
      this.yearlyReportForm.patchValue({
        type: this.reportToUpdate.entityType,
        year: this.reportToUpdate.yearReport,
        price: this.reportToUpdate.price,
        paymentAmountPaid: this.reportToUpdate.paymentAmountPaid,
        balanceDue: this.reportToUpdate.balanceDue,
      });
    }
    this.showModalDialog(); // Open the modal dialog when component initializes
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.yearlyReportForm.valid) {
      const yearlyReport = this.yearlyReportForm.value;
      if (this.reportToUpdate) {
        this.updateYearlyReport(yearlyReport);
      } else {
        this.createYearlyReport(yearlyReport);
      }
    }
    this.hideModalDialog(); //
  }

  createYearlyReport(yearlyReport: any) {
    const yearly: YearlyReport = {
      idUser: this.client._id,
      assignee: [this.userId],
      idEmploye: this.userId,
      yearReport: yearlyReport.year.yearNUm,
      dateTime: new Date(),
      price: yearlyReport.price,
      paymentAmountPaid: yearlyReport.paymentAmountPaid,
      balanceDue: yearlyReport.balanceDue,
      stepsList: null,
      entityType: yearlyReport.type,
    };

    this.yearlyReportService.createYearlyReport(yearly).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(
          ['/clientSearch/clientManagement/clientNavbar/yearlyReport/steps'],
          { state: { data: response } ,
         
       } );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateYearlyReport(yearlyReport: any) {
    const updatedReport: YearlyReport = {
      ...this.reportToUpdate,
      yearReport: yearlyReport.year.yearNUm,
      price: yearlyReport.price,
      paymentAmountPaid: yearlyReport.paymentAmountPaid,
      balanceDue: yearlyReport.balanceDue,
      entityType: yearlyReport.type,
    };

    this.yearlyReportService
      .updateYearlyReport(this.reportToUpdate._id, updatedReport)
      .then(
        (response) => {
          console.log(response);
          if (response) alert('update yearly report succ');
          this.router.navigate(
            ['/clientSearch/clientManagement/clientNavbar/yearlyReport/steps'],
            { state: { data: response } ,
           
         } );

        },
        (error) => {
          console.log(error);
        }
      );
      
  }
}
