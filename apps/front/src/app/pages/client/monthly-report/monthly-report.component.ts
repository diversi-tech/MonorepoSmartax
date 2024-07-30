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
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
    this.getMonthlyReportsForClient();

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
  myReport: MonthlyReport;
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
        console.log(Number(this.selectedYear.yearNum), Number(this.selectedMonth), "year, month");
        this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear))[0];

      },
      error: (error) => {
        console.error('Error fetching monthly reports for client', error);
      }
    });
  }
  getMonthlyReports(): void {
    this.monthlyReportService.getAllMonthlyReport().subscribe(
      (reports) => {
        this.allMonthlyReports = reports;
      },
      (error) => {
        console.error('Error fetching yearly reports for client', error);
      }
    );
  }

  getStepByType(type: string): void {
    this.steps = this.allMonthlyReports.map((r) =>
      r.monthlyReportFields.filter((r) => r.type === type)
    );
    console.log(this.steps, 'steps');
  }
    changeDate(){
      this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear))[0];
      if (this.myReport) {


        this.fieldBymonths = this.myReport.monthlyReportFields;
      }
    }

  }
