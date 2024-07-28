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


@Component({
  selector: 'app-yearly-report-steps',
  standalone: true,
  imports: [CommonModule, CheckboxModule, StepperModule, ButtonModule, FormsModule, ScrollerModule, StepsModule],
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

  getStepsByNumber(stepNumber: number) {
    console.log("njhg")
    return this.stepsByNumber[stepNumber] || [];
  }

  checkStepCompletion() {
    // אפשרות למעבר לשלב הבא רק אם כל תיבות הסימון בשלב הראשון מסומנות
    if (this.activeStep === 0) {
      const allChecked = this.getStepsByNumber(1).every(task => task.isComplete);
      this.isStepOneComplete = () => allChecked;
    }
  }

  isStepComplete(stepNumber: number): boolean {
    return this.getStepsByNumber(stepNumber).every(task => task.isComplete);
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

  checkAndChangeHeaderColor() {
    if (this.isAllTasksCompleted(5)) {
      const step5Header = document.querySelector('p-stepperPanel[header*="שלב V"]') as HTMLElement;
      if (step5Header) {
        step5Header.style.color = 'red';
      }
    }
  }

  isStepOneComplete(): boolean {
    return this.getStepsByNumber(1).every(task => task.isComplete);
  }

  nextStep() {
    if (this.activeStep === 0 && !this.isStepOneComplete()) {
      return;
    }
    this.activeStep++;
  }

  prevStep() {
    this.activeStep--;
  }

  isAllTasksCompleted(stepNumber: number): boolean {
    const tasks = this.getStepsByNumber(stepNumber);
    return tasks.every(task => task.isComplete);
  }

  goToUpdate() {
    this.router.navigate(['steps/createYearlyReport'], { state: { client: this.client, report: this.responseData } });
  }
  goBack() {
    this.location.back();
  }

}
