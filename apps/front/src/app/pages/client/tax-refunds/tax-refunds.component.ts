import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-tax-refunds',
  standalone: true,
  imports: [CommonModule, CheckboxModule],
  templateUrl: './tax-refunds.component.html',
  styleUrl: './tax-refunds.component.css',
})
export class TaxRefundsComponent {
  constructor(private stepFieldsService: stepFieldService) {
    this.loadTasks();
  }
  steps: any[];
  tasksStep: StepField[] = [];
  loadTasks() {
    this.stepFieldsService.getAllStepField().subscribe(data => {
       this.tasksStep = data.filter(task => task.type === "החזרי מס");
    })
  }

  updateStepField(task: StepField): Observable<StepField> {
    task.isComplete = !task.isComplete;
    console.log('hjk')
    return this.stepFieldsService.updateStepField(task);
  }
}
