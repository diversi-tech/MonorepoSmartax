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

@Component({
  selector: 'app-yearly-report',
  standalone: true,
  imports: [CommonModule, StepperModule, CheckboxModule, Button, RouterOutlet, TableModule, ButtonModule],
  templateUrl: './yearly-report.component.html',
  styleUrl: './yearly-report.component.css',
})

@Injectable({
  providedIn: 'root' // Ensure it's provided in root or a specific module
})
export class YearlyReportComponent implements OnInit {
  steps: any[];
  allYearlyReport: YearlyReport[] | null;
  client: Client;
  employeName: any | undefined;
  allEmploye: User[]


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

  getYearlyReportsForClient(): void {
    const clientId =this.client._id // Assuming the client ID is passed via the state
    this.yearlyReportService.getYearlyReportsForClient(clientId).subscribe(
      (reports) => {
        this.allYearlyReport = reports;
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
    this.router.navigate(['/steps', this.router], { state: { data: task, client: this.client } });
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
