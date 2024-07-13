import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { YearlyReport } from '../../../_models/yearlyReport.module';
import { StepField } from '../../../_models/stepField.module';
import { stepFieldService } from '../../../_services/step_field.service';
import { Year } from '../../../_models/year.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { YearService } from '../../../_services/year.service';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-yearly-report',
  standalone: true,
  imports: [FormsModule,
            DropdownModule,
            CommonModule, 
            StepperModule, 
            CheckboxModule, 
            ButtonModule, 
            InputOtpModule, 
            ReactiveFormsModule],
  templateUrl: './create-yearly-report.component.html',
  styleUrl: './create-yearly-report.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})
export class CreateYearlyReportComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private stepFieldsService: stepFieldService,
    private yearlyReportService: YearlyReportService,
    private yearService: YearService,
    private router: Router) {
    this.loadData();
  }

  yearlyReportForm: FormGroup;
  formSubmitted = false;
  yearList: Year[];
  typeOptions: any[] = [
    { label: 'פיצול לעצמאי', value: 'עצמאי' },
    { label: 'עמותה', value: 'עמותה' },
    { label: 'חברה', value: 'חברה' }
  ];
  employeName: string;

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
  }



  ngOnInit(): void {
    console.log("gbhnj")
    this.yearlyReportForm = this.fb.group({
      type: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      paymentAmountPaid: ['', Validators.required],
      balanceDue: ['', Validators.required],
    });

  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.yearlyReportForm.valid) {
      const yearlyReport = this.yearlyReportForm.value;
      this.createYearlyReport(yearlyReport);
    }
  }

  createYearlyReport(yearlyReport: any) {

    const yearly: YearlyReport = {
      idUser: history.state.client?._id!,
      assignee: history.state.user?._id!,
      idEmploye: history.state.user?._id!,
      yearReport: yearlyReport.year.yearNUm,
      dateTime: new Date(),
      price: yearlyReport.price,
      paymentAmountPaid: yearlyReport.paymentAmountPaid,
      balanceDue: yearlyReport.balanceDue,
      stepsList: null,
    };

    this.yearlyReportService.createYearlyReport(yearly).subscribe(response => {
      console.log(response)
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/yearlyReport/steps'], { state: { data: response } });

    }, error => {
      console.log(error)
    });
  }
  ;


}
