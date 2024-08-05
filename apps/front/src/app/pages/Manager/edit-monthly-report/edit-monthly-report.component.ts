import { Component, OnInit,Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stepFieldMonth } from '../../../_models/stepFieldMonth.module';
import { stepFieldMonthService } from '../../../_services/stepFiledMonth.service';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-edit-monthly-report',
  standalone: true,
  imports: [CommonModule, ToastModule,DialogModule,FormsModule, ReactiveFormsModule, TableModule,ButtonModule,InputTextModule,DropdownModule],
  templateUrl: './edit-monthly-report.component.html',
  styleUrl: './edit-monthly-report.component.css',
})
@Injectable({
  providedIn: 'root'
})
export class EditMonthlyReportComponent implements OnInit {
  allStepFields: stepFieldMonth[] = [];
  filteredStepFields: stepFieldMonth[] = [];
  allStepTypes:string[] = [];
  displayAddDialog: boolean = false;
  newStepValue: string = '';
  newStepType: string = '';
  newStepContent: string ='';
  constructor(private stepFieldMonthService: stepFieldMonthService) { }

  ngOnInit(): void {
    this.stepFieldMonthService.getAllstepFieldMonth().subscribe(
    (types) => {
      this.allStepTypes = types.map(type => type.type);
    },

    (error) =>{
      console.error('Error', error);
    }
   )
    this.stepFieldMonthService.getAllstepFieldMonth().subscribe(
      (stepFields) => {
        this.allStepFields = stepFields
        // filter(x => x.type === "החזרי מס");
        // this.filteredStepFields = [...this.allStepFields];
        console.log('all', this.allStepFields)
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  // filterByDescription(description: string): void {
  //   this.filteredStepFields = this.allStepFields.filter(step =>
  //     step.value.toLowerCase().includes(description.toLowerCase())
  //   );
  // }

  showAddDialog(): void {
    this.displayAddDialog = true;
  }

  hideAddDialog(): void {
    this.displayAddDialog = false;
    this.newStepValue = '';
    this.newStepContent = '';
    this.newStepType = '';
  }

  addStep(): void {
    const newStep = {
      value: this.newStepValue,
      content: this.newStepContent,
      type: this.newStepType,
    };

    if (this.isValidStep(newStep)) {
      this.stepFieldMonthService.createstepFieldMonth(newStep).subscribe(
        response => {
          if (response) {
            this.allStepFields.push(response);
            this.filteredStepFields = [...this.allStepFields];
            this.hideAddDialog();
          }
        },
        error => {
          console.error('Error adding step', error);
        }
      );
    }
  }

  isValidStep(step): boolean {
    return step.value.length >= 2;
  }

  update(step: stepFieldMonth) {
    if (step.value.length < 2) {
      alert('הפירוט חייב להיות לפחות 2 תווים.');
      return;
    }

    const originalStep = this.allStepFields.find(s => s._id === step._id);
    if (originalStep) {
      this.stepFieldMonthService.updatestepFieldMonth(step).subscribe(
        response => {
          if (response) {
            console.log('Step updated successfully', response);
          }
        },
        error => {
          console.error('Error updating step', error);
        }
      );
    }
  }

  delete(id: string) {
    this.stepFieldMonthService.deletestepFieldMonth(id).subscribe(
      response => {
        if (response) {
          this.allStepFields = this.allStepFields.filter(step => step._id !== id);
          this.filteredStepFields = [...this.allStepFields];
        }
      },
      error => {
        console.error('Error deleting step', error);
      }
    );
  }
}


