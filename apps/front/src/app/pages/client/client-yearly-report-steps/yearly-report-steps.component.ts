import { Component, Injectable, OnInit } from '@angular/core';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { StepField } from '../../../_models/stepField.module';
import { Client } from '../../../_models/client.module';
import { CommonModule, Location } from '@angular/common';
import { Status } from '../../../_models/status.module';
import { StatusService } from '../../../_services/status.service';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-yearly-report-steps',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    StepperModule,
    ButtonModule,
    FormsModule,
    ScrollerModule,
    StepsModule,
    ToastModule
  ],
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
  activeStep = 0;
  changes: { [key: string]: boolean } = {};
  client: Client;
  activeIndex: number = 0;
  stepNumbers: number[] = [1, 2, 3, 4, 5]; // Step numbers
  active: number | undefined = 0;
  statusList: Status[] = []; // List to hold statuses


  constructor(
    private yearlyReportService: YearlyReportService,
    private router: Router,
    private location: Location,
    private statusService: StatusService
  ) { };


  ngOnInit() {
    this.responseData = history.state.data;
    this.client = history.state.client
    this.allStep = this.responseData.stepsList
    this.groupSteps();
    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  async update(task: StepField) {
    const taskId = task._id;
    this.changes[taskId] = task.isCompleted;
    const taskIndex = this.responseData.stepsList.findIndex(t => t._id === taskId);
    if (taskIndex !== -1) {
      this.responseData.stepsList[taskIndex].isCompleted = this.changes[taskId];
    }
  }
  getStatusObject(statusName: string): Status | null {
    return this.statusList.find(s => s.name === statusName) || null;
  }

  determineStatus(): Status {
    const stepsList = this.responseData.stepsList;
    const allCompleted = stepsList.every(step => step.isCompleted);
    const someCompleted = stepsList.some(step => step.isCompleted);

    if (allCompleted) {
      return this.statusList.find(s => s.name == 'COMPLETE') || null;
      ;
    } else if (someCompleted) {
      return this.statusList.find(s => s.name == 'IN PROGRESS') || null;
    } else {
      return this.statusList.find(s => s.name == 'TO DO') || null;
    }
  }

  async submitChanges() {
    for (const taskId in this.changes) {
      const taskIndex = this.responseData.stepsList.findIndex(t => t._id === taskId);
      if (taskIndex !== -1) {
        this.responseData.stepsList[taskIndex].isCompleted = this.changes[taskId];
      }
    }
    const status = this.determineStatus();
    if (status) {
      this.responseData.status = status;
    } else {
      console.error('Status not found');
      return;
    }
    try {
      const response = await this.yearlyReportService.updateYearlyReport(this.responseData._id, this.responseData);
      Swal.fire('Success', 'דוח שנתי עודכן בהצלחה', 'success');
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

  isStepComplete(stepNumber: number): boolean {
    return this.getStepByNumber(stepNumber).every((task) => task.isCompleted == true);
  }
  
  isStepBeginned(stepNumber: number): boolean {
    return (
      this.getStepByNumber(stepNumber).some((task) => task.isCompleted) &&
      !this.isStepComplete(stepNumber)
    );
  }

  getStepByNumber(stepNumber: number) {
    return this.stepsByNumber[stepNumber] || [];
  }
}
