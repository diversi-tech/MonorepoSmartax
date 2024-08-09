import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepField } from '../../../_models/stepField.module';
import { Client } from '../../../_models/client.module';
import { Status } from '../../../_models/status.module';
import { FinancialStatementService } from '../../../_services/financialStatement.service';
import { Router } from '@angular/router';
import { StatusService } from '../../../_services/status.service';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ScrollerModule } from 'primeng/scroller';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { Location } from '@angular/common';
import { Year } from '../../../_models/year.module';
import { YearService } from '../../../_services/year.service';

@Component({
  selector: 'app-financial-statement-steps',
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
  templateUrl: './financial-statement-steps.component.html',
  styleUrl: './financial-statement-steps.component.css',
})
export class FinancialStatementStepsComponent {
  responseData: any;
  allStep: StepField[] = [];
  stepsByNumber: { [key: number]: StepField[] } = {};
  activeStep = 0; // מתחיל בשלב הראשון
  changes: { [key: string]: boolean } = {};
  client: Client;
  activeIndex: number = 0;
  stepNumbers: number[] = [1, 2, 3]; // Step numbers
  active: number | undefined = 0;
  statusList: Status[] = []; // List to hold statuses

  constructor(private financialStatementService: FinancialStatementService,
    private router: Router,
    private location: Location,
    private statusService: StatusService,
  ) {

  };


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
    console.log("Submitting changes:", this.changes);

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
      const response = await this.financialStatementService.updateFinancialStatement(this.responseData._id, this.responseData);

      console.log("response from server", response);
      this.responseData = response;
      this.changes = {};
    } catch (error) {
      console.log(error);
    }
  }


  goToUpdate() {
    this.router.navigate(['/createFinancialStatement'], { state: { client: this.client, report: this.responseData } });
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
    console.log("getStepByNumber")
    return this.stepsByNumber[stepNumber] || [];
  }

}
