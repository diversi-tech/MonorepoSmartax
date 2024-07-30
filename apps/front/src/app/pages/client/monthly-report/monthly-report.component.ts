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

  }
  years: Year[] = [];
  months: any = [{ "num": "01" }, { "num": "02" }, { "num": "03" }, { "num": "04" }, { "num": "05" }, { "num": "06" }, { "num": "07" }, { "num": "08" }, { "num": "09" }, { "num": "10" }, { "num": "11" }, { "num": "12" }];
  selectedYear: string = (new Date().getFullYear()).toString();
  selectedMonth: string = (new Date().getMonth() + 1).toString();
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
  fieldBymonths: stepFieldMonth[] = [];


  getMonthlyReportsForClient(): void {
    const clientId = String(this.client._id);
    this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
      next: (reports: any) => {
        this.allMonthlyReportsClient = reports;
        this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear))[0];

      },
      error:(error) => {
        console.error('Error fetching monthly reports for client', error);
      }
  });
  }
  changeDate(){
    this.myReport = this.allMonthlyReportsClient.filter(m => new Date(m.reportDate).getMonth() + 1 === Number(this.selectedMonth) && new Date(m.reportDate).getFullYear() === Number(this.selectedYear))[0];    
    if(this.myReport)
       this.fieldBymonths=this.myReport.monthlyReportFields;    
  }

}
