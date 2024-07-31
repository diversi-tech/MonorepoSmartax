import { Component, Inject, numberAttribute } from '@angular/core';
import { Injectable, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MonthlyReportService } from '../../../_services/monthlyReport.service';
import { MonthlyReport } from '../../../_models/monthlyReport.module';
import { Client } from '../../../../../../../server/src/Models/client.model';
import { TreeTableModule } from 'primeng/treetable';
import { stepFieldMonth } from '../../../_models/stepFieldMonth.module';
import { YearService } from '../../../_services/year.service';
import { Year } from '../../../_models/year.module';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TreeTableModule,
    RouterOutlet
  ],
  templateUrl: './monthly-report.component.html',
  styleUrl: './monthly-report.component.css',
})
@Injectable({
  providedIn: 'root',
})
export class MonthlyReportComponent implements OnInit {


  constructor(private monthlyReportService: MonthlyReportService,
    private yearService: YearService,
    private route: ActivatedRoute, private router: Router
  ) {
    this.currentRoute = this.route.snapshot.url.join('/');
    console.log('Current route path:', this.currentRoute);
  }
  ngOnInit(): void {
    this.client = history.state.client;
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        this.years = data;

      },
      error: (error) => {
        console.log(error);
      },
    },
    );
    if (this.currentRoute === "allClientMonthlyReport") {
      this.getMonthlyReports();
    }
    else{
    this.getMonthlyReportsForClient();
    }
    // this.getStepByType('מעם');
  }
  years: Year[] = [];
  selectedYear: Year;
  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  selectedMonth: any;
  allMonthlyReportsClient: MonthlyReport[] | undefined;
  client: Client;
  clientId: string;
  allMonthlyReports: MonthlyReport[] | undefined;
  myReport: MonthlyReport[] | undefined;
  y: boolean = false;
  types: string[] = [];
  steps: any[];
  allFields: stepFieldMonth[];
  fieldByType: { [key: string]: stepFieldMonth[] } = {};
  currentRoute: string;

  fieldBymonths: stepFieldMonth[] = [];


  getMonthlyReportsForClient(): void {
    const clientId = String(this.client._id);
    this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
      next: (reports: any) => {
        this.allMonthlyReportsClient = reports;
        // console.log(Number(this.selectedYear.yearNum), Number(this.selectedMonth), "year, month");
       // this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear))[0];

      },
      error: (error) => {
        console.error('Error fetching monthly reports for client', error);
      }
    });
  }
  getMonthlyReports(): void {
    debugger
    this.monthlyReportService.getAllMonthlyReport().subscribe({
      next: (reports: any) => {
        this.allMonthlyReports = reports;
       // this.myReport = this.allMonthlyReports.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear.yearNum))[0];
        console.log(this.allMonthlyReports, "allmyReport");

      },
      error: (error) => {
        console.error('Error fetching monthly reports', error);
      }
    }

    );
  }

  getStepByType(type: string): void {
    this.steps = this.allMonthlyReports.map((r) =>
      r.monthlyReportFields.filter((r) => r.type === type)
    );
    console.log(this.steps, 'steps');
  }
  changeDate() {
    debugger
    console.log(this.selectedMonth, this.selectedYear);
    if (this.currentRoute === "allClientMonthlyReport") {
      this.myReport = this.allMonthlyReports.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear.yearNum));
    }
    else {
      this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear.yearNum));
    }
    if (this.myReport) {
console.log(this.myReport, "myReport");
    //  this.fieldBymonths = this.myReport.map( m => m.monthlyReportFields);
    }

  }
  createReprtTag(): void {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/createMonthlyReport'], { state: { client: this.client } });

  }
}