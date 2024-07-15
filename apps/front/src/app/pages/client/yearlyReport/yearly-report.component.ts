import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { CheckboxModule } from 'primeng/checkbox';
import { Observable } from 'rxjs';
import { YearlyReport } from '../../../_models/yearlyReport.module';
import { YearlyReportService } from '../../../_services/yearlyReport.service';
import { Button, ButtonModule } from 'primeng/button';
import { Route, Router, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Client } from '../../../_models/client.module';

@Component({
  selector: 'app-yearly-report',
  standalone: true,
  imports: [CommonModule,StepperModule,CheckboxModule,Button,RouterOutlet,TableModule,ButtonModule],
  templateUrl: './yearly-report.component.html',
  styleUrl: './yearly-report.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})
export class YearlyReportComponent implements OnInit {
  constructor(private stepFieldsService: stepFieldService,private yearlyReportService: YearlyReportService,private router: Router) {
     this.loadTasks();
  }
  steps: any[];
  allYearlyReport: YearlyReport[]=[];
  employeName: Client;
  ngOnInit(): void {
   this.getYearlyReportsForClient();
   this.employeName=history.state.client;
   console.log(this.allYearlyReport)
   console.log(this.employeName)

  }


  getYearlyReportsForClient(): void {
    const clientId = history.state.client._id; // Assuming the client ID is passed via the state
    this.yearlyReportService.getYearlyReportsForClient(clientId).subscribe(
      (reports) => {
        console.log(reports)
        this.allYearlyReport = reports;
      },
      (error) => {
        console.error('Error fetching yearly reports for client', error);
      }
    );
  }
  createReprtTag():void{
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/yearlyReport/createYearlyReport']);
    
  }
 
  activeIndex: number = 0;
  selectedYear: Date;
  selectedType: string;
  typeOptions: any[] = [
    { label: 'פיצול לעצמאי', value: 'עצמאי' },
    { label: 'עמותה', value: 'עמותה' },
    { label: 'חברה', value: 'חברה' }
  ];
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

  goToSteps(task: any){
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/yearlyReport/steps'], { state: { data: task } });

  }

}
