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
    private yearService: YearService
  ) { }
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
    this.getMonthlyReportsForClient();

    this.getStepByType('מעם');
  }
  years: Year[] = [];
  months: any = [{ "num": "01" }, { "num": "02" }, { "num": "03" }, { "num": "04" }, { "num": "05" }, { "num": "06" }, { "num": "07" }, { "num": "08" }, { "num": "09" }, { "num": "10" }, { "num": "11" }, { "num": "12" }];
  selectedYear: string = (new Date().getFullYear()).toString();
  selectedMonth: string = (new Date().getMonth() + 1).toString();
  allMonthlyReportsClient: MonthlyReport[] | undefined;
  client: Client;
  clientId: string;
  allMonthlyReports: MonthlyReport[] | undefined;
  myReport: MonthlyReport[] | undefined;
  types: string[] = [];
  steps: any[];
  allFields: stepFieldMonth[];
  fieldByType: { [key: string]: stepFieldMonth[] } = {};

  getMonthlyReportsForClient(): void {
    debugger
    const clientId = String(this.client._id);
    this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe(
      (reports) => {
        this.allMonthlyReportsClient = reports;
        this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear));
      },
      (error) => {
        console.error('Error fetching monthly reports for client', error);
      }
    );
  }
  // getMonthlyReports(): void {
  //   this.monthlyReportService.getAllMonthlyReport().subscribe(
  //     (reports) => {
  //       this.allMonthlyReports = reports;
  //     },
  //     (error) => {
  //       console.error('Error fetching yearly reports for client', error);
  //     }
  //   );
 // }
 
  getStepByType(type: string): void {
    this.steps = this.allMonthlyReports.map((r) =>
      r.monthlyReportFields.filter((r) => r.type === type)
    );
    console.log(this.steps, 'steps');
  }
}
