import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { StepField } from '../../../_models/stepField.module';
import { StepperModule } from 'primeng/stepper';
import { Client } from '../../../../../../../server/src/Models/client.model';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TaxRefundsService } from '../../../_services/taxRefunds.service';

@Component({
  selector: 'app-tax-refunds-steps',
  standalone: true,
  imports: [CommonModule, StepperModule, ButtonModule, FormsModule],
  templateUrl: './tax-refunds-steps.component.html',
  styleUrl: './tax-refunds-steps.component.css',
})
export class TaxRefundsStepsComponent {
  constructor(private taxRefundsService: TaxRefundsService,
    private location: Location,
  ) { }
  tasksStep: StepField[] = [];
  responseData: any;
  allSteps: StepField[] = [];
  stepsByNumber: { [key: number]: StepField[] } = {};
  active: number | undefined = 0;
  changes: { [key: string]: boolean } = {};
  client: Client;
  stepNumbers: number[] = [];
  ngOnInit() {
    this.responseData = history.state.data;
    this.client = history.state.client;
    this.allSteps = this.responseData.stepsList;
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
  async submitChanges() {
    console.log('Submitting changes:', this.changes);

    for (const taskId in this.changes) {
      const taskIndex = this.responseData.stepsList.findIndex(
        (t) => t._id === taskId
      );
      if (taskIndex !== -1) {
        this.responseData.stepsList[taskIndex].isCompleted =
          this.changes[taskId];
      }
    }

    try {
      const response = await this.taxRefundsService.updateTaxRefunds(
        this.responseData._id,
        this.responseData
      );
      console.log('response from server', response);
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
