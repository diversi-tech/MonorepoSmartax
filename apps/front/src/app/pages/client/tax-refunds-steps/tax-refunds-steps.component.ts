import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-tax-refunds-steps',
  standalone: true,
  imports: [CommonModule, StepperModule],
  templateUrl: './tax-refunds-steps.component.html',
  styleUrl: './tax-refunds-steps.component.css',
})
export class TaxRefundsStepsComponent {
  constructor(private stepFieldsService: stepFieldService) {}
  tasksStep: StepField[] = [];

  getStepsByNumber(stepNumber: Number) {
    this.stepFieldsService.getAllStepField().subscribe(data => {
      this.tasksStep = data.filter(task => task.type === "החזרי מס" && task.stepNumber === stepNumber);
      console.log(this.tasksStep)
      let t = this.tasksStep;
      console.log(t)
    })
  }
}
