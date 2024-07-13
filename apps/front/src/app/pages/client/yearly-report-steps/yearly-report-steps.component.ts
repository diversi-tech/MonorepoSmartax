import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { StepField } from '../../../_models/stepField.module';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-yearly-report-steps',
  standalone: true,
  imports: [CommonModule,CheckboxModule,StepperModule,ButtonModule],
  templateUrl: './yearly-report-steps.component.html',
  styleUrl: './yearly-report-steps.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})

export class YearlyReportStepsComponent implements OnInit{
  responseData: any;
  allStep: StepField[] = [];
  stepsByNumber: { [key: number]: StepField[] } = {};
  activeStep = 0; // מתחיל בשלב הראשון

  checkStepCompletion() {
      // אפשרות למעבר לשלב הבא רק אם כל תיבות הסימון בשלב הראשון מסומנות
      if (this.activeStep === 0) {
          const allChecked = this.getStepsByNumber(1).every(task => task.isComplete);
          this.isStepOneComplete = () => allChecked;
      }
  }
  
  isStepOneComplete() {
      return this.getStepsByNumber(1).every(task => task.isComplete);
  }
  

  constructor(private yearlyReportService: YearlyReportService){};

  ngOnInit() {
    this.responseData = history.state.data;
    this.allStep=this.responseData.stepsList
    console.log(this.allStep); // בדיקת הנתונים שהתקבלו
    this.loadData();
    console.log(this.stepsByNumber)
  }

  loadData(){
    this.groupSteps();
  }

  groupSteps() {
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
    return this.stepsByNumber[stepNumber] || [];
  }
  isStepComplete(stepNumber: number): boolean {
    return this.getStepsByNumber(stepNumber).every(task => task.isComplete);
  }
  
  
}
