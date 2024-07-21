import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown'; // ייבוא של קומפוננטת ה-Dropdown
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-edit-client-yearly-report',
  standalone: true,
  imports: [CommonModule, TableModule, ToastModule, ButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-client-yearly-report.component.html',
  styleUrls: ['./edit-client-yearly-report.component.css'],
})
@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})
export class EditClientYearlyReportComponent implements OnInit {
  allStepFields: StepField[] = [];
  filteredStepFields: StepField[] = [];
  numberOptions = [1, 2, 3, 4, 5];
  newStep: StepField = {
    _id: '', value: '', stepNumber: 1, type: 'yearly-report',
    isComplete: false
  }; // Initialize with default values

  constructor(private stepFieldService: stepFieldService) {}

  ngOnInit(): void {
    this.stepFieldService.getAllStepField().subscribe(
      (stepFields) => {
        this.allStepFields = stepFields.filter(x => x.type === "yearly-report");
        this.filteredStepFields = [...this.allStepFields];
        console.log(this.allStepFields);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  filterByDescription(description: string): void {
    this.filteredStepFields = this.allStepFields.filter(step =>
      step.value.toLowerCase().includes(description.toLowerCase())
    );
  }

  filterByStepNumber(stepNumber: number): void {
    if (stepNumber) {
      this.filteredStepFields = this.allStepFields.filter(step =>
        step.stepNumber === stepNumber
      );
    } else {
      this.filteredStepFields = [...this.allStepFields];
    }
  }

  update(step: StepField) {
    if (step.value.length < 2) {
      alert('הפירוט חייב להיות לפחות 2 תווים.');
      return;
    }

    if (step.stepNumber < 1 || step.stepNumber > 5) {
      alert('מספר השלב חייב להיות בטווח 1 עד 5.');
      return;
    }

    console.log(step);
    const originalStep = this.allStepFields.find(s => s._id === step._id);
    console.log("originalStep", originalStep);
    if (originalStep) {
      // שלח את השינויים לשרת
      this.stepFieldService.updateStepField(step).subscribe(
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
    console.log("delete");

    this.stepFieldService.deleteStepField(id).subscribe(
      response => {
        if (response) {
          console.log('Deleted successfully', response);
          // רענן את הרשימה לאחר מחיקה
          this.allStepFields = this.allStepFields.filter(step => step._id !== id);
          this.filteredStepFields = [...this.allStepFields];
        }
      },
      error => {
        console.error('Error deleting step', error);
      }
    );
  }

  showAddNewRow() {
    // Add a new row to the beginning of the table
    const newRow: StepField = {
      _id: '', value: '', stepNumber: 1,
      isComplete: false,
      type: 'yearly-report'
    };
    this.filteredStepFields = [newRow, ...this.filteredStepFields];
  }

  cancelEditing() {
    // Handle cancel editing
  }
}
