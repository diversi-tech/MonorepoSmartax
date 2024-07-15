import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { StepField } from '../../../_models/stepField.module';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ScrollerModule } from 'primeng/scroller';
import { StepsModule } from 'primeng/steps';


@Component({
  selector: 'app-yearly-report-steps',
  standalone: true,
  imports: [CommonModule,CheckboxModule,StepperModule,ButtonModule,FormsModule,ScrollerModule,StepsModule],
  templateUrl: './yearly-report-steps.component.html',
  styleUrl: './yearly-report-steps.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})

export class YearlyReportStepsComponent implements OnInit{

  responseData: any;
  allStep: StepField[] = [];
  stepsByNumber: { [key: number]: StepField[] } = {};
  activeStep = 0; // מתחיל בשלב הראשון

  constructor(private yearlyReportService: YearlyReportService){};


  ngOnInit() {
    this.responseData = history.state.data;
    this.allStep=this.responseData.stepsList
    this.loadData();
  }

  loadData(){
    this.groupSteps();
  }

  groupSteps() {
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

  getStepsByNumber(stepNumber: number) {
    return this.stepsByNumber[stepNumber] || [];
  }

  checkStepCompletion() {
      // אפשרות למעבר לשלב הבא רק אם כל תיבות הסימון בשלב הראשון מסומנות
      if (this.activeStep === 0) {
          const allChecked = this.getStepsByNumber(1).every(task => task.isComplete);
          this.isStepOneComplete = () => allChecked;
      }
  }
  
  isStepComplete(stepNumber: number): boolean {
    return this.getStepsByNumber(stepNumber).every(task => task.isComplete);
  }
  async update(task: StepField) {
    console.log("before", task);
    console.log(this.responseData);

    // Find the task and update it directly
    const taskIndex = this.responseData.stepsList.findIndex(t => t._id === task._id);
    if (taskIndex !== -1) {
        console.log("index", taskIndex);
        this.responseData.stepsList[taskIndex].isComplete = !this.responseData.stepsList[taskIndex].isComplete;
    }

    console.log("after", this.responseData.stepsList[taskIndex]);

    try {
        const response = await this.yearlyReportService.updateYearlyReport(this.responseData._id, this.responseData);
        console.log("response from server", response);
        alert("succ update response");
        this.responseData = response;
    } catch (error) {
        console.log(error);
    }
}


// isAllTasksCompleted(stepNumber: number): boolean {
//   const tasks = this.getStepsByNumber(stepNumber);
//   console.log(tasks);

//   return tasks.every(task => task.isComplete);
// }



checkAndChangeHeaderColor() {
  if (this.isAllTasksCompleted(5)) {
    // שנה את צבע הכותרת של שלב 5
    const step5Header = document.querySelector('p-stepperPanel[header*="שלב V"]') as HTMLElement;
    if (step5Header) {
      step5Header.style.color = 'red'; // תחליף את הצבע הרצוי כאן
    }
  }
}

isStepOneComplete(): boolean {
  return this.getStepsByNumber(1).every(task => task.isComplete);
}

nextStep() {
  if (this.activeStep === 0 && !this.isStepOneComplete()) {
    // אם השלב הראשון לא הושלם, אל תאפשר מעבר לשלב הבא
    return;
  }
  this.activeStep++;
}

prevStep() {
  this.activeStep--;
}
isAllTasksCompleted(stepNumber: number): boolean {
  const tasks = this.getStepsByNumber(stepNumber);
  return tasks.every(task => task.isComplete);
}

  
}
