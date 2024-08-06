import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { StepField } from '../../../_models/stepField.module';
import { StepperModule } from 'primeng/stepper';
import { Client } from '../../../../../../../server/src/Models/client.model';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TaxRefundsService } from '../../../_services/taxRefunds.service';
import { Status } from '../../../_models/status.module';
import { StatusService } from '../../../_services/status.service';

@Component({
  selector: 'app-tax-refunds-steps',
  standalone: true,
  imports: [
    CommonModule,
    StepperModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './tax-refunds-steps.component.html',
  styleUrl: './tax-refunds-steps.component.css',
})

export class TaxRefundsStepsComponent {
  constructor(private taxRefundsService: TaxRefundsService,
    private location: Location,
    private statusService: StatusService,
  ) { }
  tasksStep: StepField[] = [];
  responseData: any;
  allSteps: StepField[] = [];
  stepsByNumber: { [key: number]: StepField[] } = {};
  active: number | undefined = 0;
  changes: { [key: string]: boolean } = {};
  client: Client;
  stepNumbers: number[] = [];

  statusList:Status[]=[];
  ngOnInit() {
    this.responseData = history.state.data;
    this.client = history.state.client;
    this.allSteps = this.responseData.stepsList;
    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        this.statusList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.groupSteps();
  }

  groupSteps() {
    this.allSteps.forEach((step) => {
      const stepNumber = step.stepNumber;
      if (!this.stepsByNumber[stepNumber]) {
        this.stepsByNumber[stepNumber] = [];
      }
      this.stepsByNumber[stepNumber].push(step);
    });
    this.stepNumbers = this.getStepNumbers();
  }

  getStepByNumber(stepNumber: number) {
    return this.stepsByNumber[stepNumber] || [];
  }
  getStepNumbers() {
    return Object.keys(this.stepsByNumber).map(Number);
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
  async update(task: StepField) {
    const taskId = task._id;
    this.changes[taskId] = task.isCompleted
    const taskIndex = this.responseData.stepsList.findIndex(
      (t) => t._id === taskId
    );
    if (taskIndex !== -1) {
      this.responseData.stepsList[taskIndex].isCompleted = this.changes[taskId];
    }
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
  getStatusObject(statusName: string): Status | null {
    return this.statusList.find(s => s.name === statusName) || null;
  }
  async submitChanges() {
    for (const taskId in this.changes) {
      const taskIndex = this.responseData.stepsList.findIndex(
        (t) => t._id === taskId
      );
      if (taskIndex !== -1) {
        this.responseData.stepsList[taskIndex].isCompleted =
          this.changes[taskId];
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
      const response = await this.taxRefundsService.updateTaxRefunds(
        this.responseData._id,
        this.responseData
      );
      alert('Successful update response');
      this.responseData = response;
      this.changes = {};
    } catch (error) {
      console.log(error);
    }
    
  }
  goBack() {
    this.location.back();
  }

}
