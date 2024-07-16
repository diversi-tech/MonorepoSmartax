import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-tax-refunds',
  standalone: true,
  imports: [CommonModule, CheckboxModule, StepperModule, ButtonModule],
  templateUrl: './tax-refunds.component.html',
  styleUrl: './tax-refunds.component.css',
})
export class TaxRefundsComponent implements AfterViewInit{
  constructor(private stepFieldsService: stepFieldService) {
    this.stepData = [
      { label: 'Step 1', value: 'Data for Step 1' },
      { label: 'Step 2', value: 'Data for Step 2' },
      { label: 'Step 3', value: 'Data for Step 3' }
    ];
  }
  stepNumber:number = 1
   list : Number[] = [1,2,3];
  stepData: SelectItem[];
  active: number | undefined = 0;
  tasksStep: StepField[] = [];
  stepsByNumber: { [key: number]: StepField[] } = {};
  ngAfterViewInit(): void {
     this.getStepsByNumber(this.stepNumber)
     this.stepNumber++;
    
  }
  onStepSelected(panel: any) {
    debugger
    const selectedStep = this.stepData.find(step => step.label === panel.header);
    console.log(selectedStep.label, selectedStep.value);
  }

  get(number:Number){
   return this.getStepsByNumber(number)
  }
  StepsByNumber(stepNumber: number) {
    debugger
    return this.stepsByNumber[stepNumber] || [];
  }
  getStepsByNumber(stepNumber: Number) {
    debugger
    this.stepFieldsService.getAllStepField().subscribe(data => {
      this.tasksStep = data.filter(task => task.type === "החזרי מס" && task.stepNumber === stepNumber);
      console.log(this.tasksStep)
      let t = this.tasksStep;
      console.log(t)
    })
  }
  updateStepField(task: StepField): Observable<StepField> {
    task.isComplete = !task.isComplete;
    return this.stepFieldsService.updateStepField(task);
  }



}
