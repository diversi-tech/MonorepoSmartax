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
import { TokenService } from '../../../_services/token.service';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/user.module';
import { NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yearly-report',
  standalone: true,
  imports: [CommonModule, StepperModule, CheckboxModule, Button, RouterOutlet, TableModule, ButtonModule,FormsModule],
  templateUrl: './yearly-report.component.html',
  styleUrl: './yearly-report.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})
export class YearlyReportComponent implements OnInit {
  steps: any[];
  allYearlyReport: YearlyReport[] | null;
  filterallYearlyReport: YearlyReport[] ;
  client: Client;
  employeName: any | undefined;
  allEmploye: User[]
  isSelected: number = 5;
  selectedStatus:string="";
  filterstatus: string = "";
  is:number =2

  constructor(private stepFieldsService: stepFieldService,
    private yearlyReportService: YearlyReportService,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.getYearlyReportsForClient();
    console.log("report after", this.allYearlyReport)

    this.userService.getAllUsers().subscribe(
      (Employes) => {
        this.allEmploye = Employes;
      },
      (error) => {
        console.error('Error ', error);
      }
    )
  }
  onSelectionChange(a : any) {
    this.isSelected = Number(a);
    this.filterallYearlyReport=this.allYearlyReport
    
  }
  filterToDoWithBalanceDue(): void {
    this.is=4
    this.filterallYearlyReport = this.allYearlyReport.filter(report =>
     ( report.status.name === "TO DO" && report.paymentAmountPaid > 0)
    );
}
filterToDoWithBalanceDue2(): void {
  this.is=2
  this.filterallYearlyReport = this.allYearlyReport
}
  filterByStatus(event: Event): void { 
    // שמירה על כל הדוחות
    this.filterallYearlyReport = this.allYearlyReport;

    // קבלת הערך הנבחר
    this.filterstatus = (event.target as HTMLSelectElement).value;
    // סינון על פי הסטטוס שנבחר
    if (this.filterstatus === "TO DO" || this.filterstatus === "IN PROGRESS") {
        this.filterallYearlyReport = this.allYearlyReport.filter(report => 
            report.status.name === this.filterstatus
        );
    } else {
        this.filterallYearlyReport = this.allYearlyReport;
    }
}

  

  getYearlyReportsForClient(): void {
    const clientId =this.client._id // Assuming the client ID is passed via the state
    this.yearlyReportService.getYearlyReportsForClient(clientId).subscribe(
      (reports) => {
        this.allYearlyReport = reports;
        this.filterallYearlyReport=reports
        console.log("report", this.allYearlyReport)
      },
      (error) => {
        console.error('Error fetching yearly reports for client', error);
      }
    );
  }

  createReprtTag(): void {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/createYearlyReport'], { state: { client: this.client } });
}

  goToSteps(task: any) {
    this.router.navigate(['clientSearch/clientManagement/clientNavbar/steps', this.router], { state: { data: task, client: this.client } });
  }

  getEmployeName(idEmploye: string): any {
    return this.allEmploye.find(x => x._id == idEmploye)
  }

  goToUpdate(report: YearlyReport) {
    if (report) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/yearlyReport/createYearlyReport'], { state: { client: this.client, report: report } });
    }
  }

}
