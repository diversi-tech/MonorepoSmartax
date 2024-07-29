import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { StepField } from '../../../_models/stepField.module';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ScrollerModule } from 'primeng/scroller';
import { StepsModule } from 'primeng/steps';
import { Router } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { YearlyReport } from '../../../_models/yearlyReport.module';
import { Location } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-yearly-report-steps',
  standalone: true,
  imports: [CommonModule, CheckboxModule, StepperModule, ButtonModule, FormsModule, ScrollerModule, StepsModule,ToastModule],
  templateUrl: './yearly-report-steps.component.html',
  styleUrl: './yearly-report-steps.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})

export class YearlyReportStepsComponent implements OnInit {

  responseData: any;
  allStep: StepField[] = [];
  stepsByNumber: { [key: number]: StepField[] } = {};
  activeStep = 0; // מתחיל בשלב הראשון
  changes: { [key: string]: boolean } = {};
  client: Client;
  activeIndex: number = 0;
  stepNumbers: number[] = [1, 2, 3, 4, 5]; // Step numbers


  constructor(private yearlyReportService: YearlyReportService,
               private router: Router,
               private location: Location
              ) {

  };


  ngOnInit() {
    this.responseData = history.state.data;
    this.client = history.state.client
    this.allStep = this.responseData.stepsList
    this.groupSteps();
  }

  groupSteps() {
    // console.log("task",history.state.task)
    this.allStep.forEach((step) => {
      const stepNumber = step.stepNumber; // Assuming stepNumber is the property you want to group by
      if (!this.stepsByNumber[stepNumber]) {
        this.stepsByNumber[stepNumber] = [];
      }
      this.stepsByNumber[stepNumber].push(step);
    });
  }

  getStepNumbers() {
    return Object.keys(this.stepsByNumber).map(Number);
  }

 


  async update(task: StepField) {
    const taskId = task._id;
    this.changes[taskId] = !this.changes[taskId];
    const taskIndex = this.responseData.stepsList.findIndex(t => t._id === taskId);
    if (taskIndex !== -1) {
      this.responseData.stepsList[taskIndex].isComplete = this.changes[taskId];
    }
  }

  async submitChanges() {
    console.log("Submitting changes:", this.changes);

    for (const taskId in this.changes) {
      const taskIndex = this.responseData.stepsList.findIndex(t => t._id === taskId);
      if (taskIndex !== -1) {
        this.responseData.stepsList[taskIndex].isComplete = this.changes[taskId];
      }
    }

    try {
      const response = await this.yearlyReportService.updateYearlyReport(this.responseData._id, this.responseData);
      console.log("response from server", response);
      alert("Successful update response");
      this.responseData = response;
      this.changes = {};
    } catch (error) {
      console.log(error);
    }
  }


  goToUpdate() {
    this.router.navigate(['/createYearlyReport'], { state: { client: this.client, report: this.responseData } });
  }
  goBack() {
    this.location.back();
  }

}
