import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { CheckboxModule } from 'primeng/checkbox';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-yearly-report',
  standalone: true,
  imports: [CommonModule,StepperModule,CheckboxModule],
  templateUrl: './yearly-report.component.html',
  styleUrl: './yearly-report.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})
export class YearlyReportComponent  {
  constructor(private stepFieldsService: stepFieldService) {
     this.loadTasks();
  }
  tasksStep1: StepField[] = [];
  tasksStep2: StepField[] = [];
  tasksStep3: StepField[] = [];
  tasksStep4: StepField[] = [];
  tasksStep5: StepField[] = [];
 

  loadTasks() {
    this.stepFieldsService.getAllStepField().subscribe(data => {
      this.tasksStep1 = data.filter(task => task.stepNumber === 1);
      this.tasksStep2 = data.filter(task => task.stepNumber === 2);
      this.tasksStep3 = data.filter(task => task.stepNumber === 3);
      this.tasksStep4 = data.filter(task => task.stepNumber === 4);
      this.tasksStep5 = data.filter(task => task.stepNumber === 5);
    });
  
  }

  updateStepField(task: StepField): Observable<StepField> {
    task.isComplete=!task.isComplete;
    console.log('hjk')
    return this.stepFieldsService.updateStepField(task);
  }
  // toggleTaskCompletion(task: Task) {
  //   task.isCompleted = !task.isCompleted;
  // }

}
