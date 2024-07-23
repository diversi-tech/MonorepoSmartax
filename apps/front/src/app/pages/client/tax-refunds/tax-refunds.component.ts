import { Component, AfterViewInit, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { stepFieldService } from '../../../_services/step_field.service';
import { StepField } from '../../../_models/stepField.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectItem } from 'primeng/api';
import { Client } from '../../../_models/client.module';
import { TaxRefundsService } from '../../../_services/taxRefunds.service'
import { TaxRefunds } from '../../../_models/taxRefunds.module'
import { User } from '../../../_models/user.module';
import { UserService } from '../../../_services/user.service';
import { TableModule } from 'primeng/table';
import { Route, Router, RouterOutlet } from '@angular/router';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-tax-refunds',
  standalone: true,
  imports: [CommonModule, CheckboxModule, ButtonModule, TableModule, StepperModule],
  templateUrl: './tax-refunds.component.html',
  styleUrl: './tax-refunds.component.css',
})

export class TaxRefundsComponent implements OnInit{
  constructor(private stepFieldsService: stepFieldService, 
    private taxRefundsService: TaxRefundsService, 
    private userService:UserService,
    private router: Router,

  )
   {
    this.stepData = [
      { label: 'Step 1', value: 'Data for Step 1' },
      { label: 'Step 2', value: 'Data for Step 2' },
      { label: 'Step 3', value: 'Data for Step 3' }
    ];
  }
  flag :boolean = false;
  stepNumber: number = 1
  list: Number[] = [1, 2, 3];
  stepData: SelectItem[];
  active: number | undefined = 0;
  tasksStep: StepField[] = [];
  client: Client;
  stepsByNumber: { [key: number]: StepField[] } = {};
  allTaxRefunds: TaxRefunds[] | null;
  employeName: any| undefined;
  allEmploye:User[]

  ngOnInit(): void {
    this.client=history.state.client;
    this.getTaxRefundsForClient();
    console.log("report after",this.allTaxRefunds)
 
    this.userService.getAllUsers().subscribe(
     (Employes) => {
       this.allEmploye = Employes;
     },
     (error) => {
       console.error('Error ', error);
     }
   )
   }
 
  onStepSelected(panel: any) {
    const selectedStep = this.stepData.find(step => step.label === panel.header);
    console.log(selectedStep.label, selectedStep.value);
  }

  get(number: Number) {
    return this.getStepsByNumber(number)
  }
  StepsByNumber(stepNumber: number) {
    return this.stepsByNumber[stepNumber] || [];
  }
  getStepsByNumber(stepNumber: Number) {
    this.stepFieldsService.getAllStepField().subscribe(data => {
      this.tasksStep = data.filter(task => task.stepNumber === stepNumber);
      console.log("kl",this.tasksStep)
      // let t = this.tasksStep;
      // console.log(t)
    })
  }
  updateStepField(task: StepField): Observable<StepField> {
    task.isComplete = !task.isComplete;
    return this.stepFieldsService.updateStepField(task);
  }
  getTaxRefundsForClient(): void {
    const clientId = this.client._id
    this.taxRefundsService.getTaxRefundsForClient(clientId).subscribe(
      (reports) => {
        this.allTaxRefunds = reports;
        console.log("report", this.allTaxRefunds)
      },
      (error) => {
        console.error('Error fetching yearly reports for client', error);
      }
    );
  }
  // goToSteps(task: any){
  //   debugger
  //   console.log(task)
  //   this.router.navigate(['/clientSearch/clientManagement/clientNavbar/taxRefunds/steps',this.router], { state: { data: task } });

  // }
  getEmployeName(idEmploye: string): any {
    return this.allEmploye.find(x=>x._id==idEmploye)
    
  }
}