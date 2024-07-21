import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-client-yearly-report',
  standalone: true,
  imports: [CommonModule,TableModule,ToastModule,ButtonModule],
  templateUrl: './edit-client-yearly-report.component.html',
  styleUrl: './edit-client-yearly-report.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})

export class EditClientYearlyReportComponent {
  constructor(private stepFieldService: stepFieldService){}

  allStepFields: StepField[]| null;

  ngOnInit(): void {
 
    this.stepFieldService.getAllStepField().subscribe(
     (stepFields) => {
       this.allStepFields = stepFields;
       console.log(this.allStepFields)
     },
     (error) => {
       console.error('Error ', error);
     }
   )
   }
   saveStepValue(step: StepField) {
    console.log(step)
    const index = this.allStepFields.findIndex(s => s._id === step._id);
    console.log(index)
    if (index ) {
      this.allStepFields[index].value=step.value;
      this.allStepFields[index].stepNumber=step.stepNumber;
    }
  }

  update(step: StepField) {
    console.log(step)
    const originalStep = this.allStepFields.find(s => s._id === step._id);
    console.log("originalStep",originalStep)
    if (originalStep) {
      // שלח את השינויים לשרת
      this.stepFieldService.updateStepField(step).subscribe(
        response => {
          if(response){
            console.log('Step updated successfully', response);
          }
        },
        error => {
          console.error('Error updating step', error);
        }
      );
    }
  }

  delete(step: StepField) {
    console.log("delete")

    // const originalStep = this.allStepFields.find(s => s.stepNumber === step.stepNumber);
    // if (originalStep && (
    //   originalStep.value !== step.value || 
    //   originalStep.stepNumber !== step.stepNumber)) {
      // שלח את השינויים לשרת
      this.stepFieldService.deleteStepField(step._id).subscribe(
        response => {
          console.log('delted  successfully', response);
        },
        error => {
          console.error('Error deleted step', error);
        }
      );
   
  }
 


}
