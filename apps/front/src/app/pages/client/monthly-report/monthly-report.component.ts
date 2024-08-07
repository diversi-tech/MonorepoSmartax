import { Component, OnInit } from '@angular/core';
import { MonthlyReportService } from '../../../_services/monthlyReport.service';
import { YearService } from '../../../_services/year.service';
import { TokenService } from '../../../_services/token.service';
import { MonthlyReport } from '../../../_models/monthlyReport.module';
import { Client } from '../../../../../../../server/src/Models/client.model';
import { stepFieldMonth } from '../../../_models/stepFieldMonth.module';
import { Year } from '../../../_models/year.module';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { User } from '../../../../../../../server/src/Models/user.model';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RouterOutlet,
    DropdownModule,
    ReactiveFormsModule,
    DialogModule,
  ],
})
export class MonthlyReportComponent implements OnInit {
  user: User;
  years: Year[] = [];
  selectedYear: Year;
  createdYear: Year;
  months: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  selectedMonth: any;
  createdMonth: any;
  allMonthlyReports: MonthlyReport[] | undefined;
  myReport: MonthlyReport[] | undefined;
  types: string[] = [];
  organizedData: any = {};
  changes: any = {};
  visible: boolean = false;
  exist: boolean = false;
  report: MonthlyReport;
  currentRoute: string;
  client: Client;
  constructor(
    private monthlyReportService: MonthlyReportService,
    private yearService: YearService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
    this.currentRoute = this.route.snapshot.url.join('/');
    console.log('Current route path:', this.currentRoute);
  }

  ngOnInit(): void {
    this.client = history.state.client;
    const date = new Date();
    this.user = this.tokenService.getCurrentDetail('_id');
    this.yearService.getAllYear().subscribe({
      next: (data) => {
        this.years = data;
        this.selectedYear = this.years.find(
          (y) => y.yearNum === date.getFullYear().toString()
        );
        this.createdYear = this.selectedYear;
        if (!this.selectedYear) {
          this.yearService
            .createYear({ id: '', yearNum: date.getFullYear().toString() })
            .subscribe({
              next: (data) => {
                this.years.push(data);
                this.selectedYear = this.years.find(
                  (y) => y.yearNum === date.getFullYear().toString()
                );
              },
              error: (error) => {
                console.log(error);
              },
            });
        }
        this.selectedMonth = date.getMonth() + 1;
        this.createdMonth = this.selectedMonth;
        if (this.currentRoute === 'allClientMonthlyReport') {
          this.getMonthlyReports();
        } else {
          this.getMonthlyReportsForClient();
          if (this.client.reports === 'מדווח חודשי') {
            if (
              !this.allMonthlyReports.find(
                (r) =>
                  r.reportDate.getFullYear().toString() ===
                    this.selectedYear.yearNum &&
                  r.reportDate.getMonth().toString() === this.selectedMonth
              )
            )
              this.createMonthlyReport();
          }
          if (this.client.reports === 'דו חודשי') {
            if (
              !this.allMonthlyReports.find(
                (r) =>
                  r.reportDate.getFullYear().toString() ===
                    this.selectedYear.yearNum &&
                  r.reportDate.getMonth().toString() === this.selectedMonth
              ) &&
              !this.allMonthlyReports.find(
                (r) =>
                  r.reportDate.getFullYear().toString() ===
                    this.selectedYear.yearNum &&
                  (r.reportDate.getMonth() - 1).toString() ===
                    this.selectedMonth
              )
            ) {
              this.createMonthlyReport();
            }
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showDialog() {
    this.visible = true;
    this.exist=false;
  }

  getMonthlyReportsForClient(): void {
    const clientId = String(this.client._id);
    this.monthlyReportService.getMonthlyReportForClient(clientId).subscribe({
      next: (reports: any) => {
        this.allMonthlyReports = reports;
        console.log(this.allMonthlyReports);
      },
      error: (error) => {
        console.error('Error fetching monthly reports for client', error);
      },
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

  changeDate() {
    this.myReport = this.getReportByMonth(
      this.allMonthlyReports,
      this.selectedYear,
      this.selectedMonth
    );
    this.myReport = this.getReportByMonth(
      this.allMonthlyReports,
      this.selectedYear,
      this.selectedMonth
    );
    if (this.myReport) {
      this.monthlyReportService.getAllTypes().subscribe((types) => {
        this.types = types;
      });
      this.organizedData = this.myReport.reduce((acc, report) => {
        Object.keys(report.monthlyReportFields).forEach((type) => {
          if (!acc[type]) {
            acc[type] = {};
          }
          if (!acc[type][report.idUser]) {
            acc[type][report.idUser] = {};
          }
          report.monthlyReportFields[type].forEach((step) => {
            acc[type][report.idUser][step.value] = step.content;
          });
        });
        return acc;
      }, {});
    }
  }

  getReportByMonth(data: any, year: Year, month: string) {
    return data.filter(
      (m) =>
        new Date(m.reportDate).getMonth() + 1 === Number(month) &&
        new Date(m.reportDate).getFullYear() === Number(year.yearNum)
    );
  }
  onSubmit() {
    if (
      !this.allMonthlyReports.find(
        (r) =>
          r.reportDate.getFullYear().toString() === this.selectedYear.yearNum &&
          r.reportDate.getMonth().toString() === this.selectedMonth
      )
    ){
      this.createMonthlyReport();
    }
    else{
      this.exist=!this.exist
    }
  }
  createMonthlyReport() {
    this.monthlyReportService
      .createMonthlyReport({
        reportDate: new Date(
          `${this.createdYear.yearNum}-${this.createdMonth}-01`
        ),
        idUser: this.client._id,
        idEmploye: this.user,
        monthlyReportFields: [],
        status: [],
      })
      .subscribe({
        next: (data) => {
          console.log('Monthly report created successfully', data);
          this.allMonthlyReports.push(data);
          this.selectedYear = this.createdYear;
          this.selectedMonth = this.createdMonth;
          this.changeDate();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  saveChanges(type: string) {
    if (Object.keys(this.changes).length === 0) {
      return;
    }

    const reportToUpdate = this.myReport.find(
      (report) =>
        report.monthlyReportFields[type] &&
        report.monthlyReportFields[type].length > 0
    );

    if (!reportToUpdate) {
      console.error('No report found for the type:', type);
      return;
    }

    const updatedSteps = { ...reportToUpdate.monthlyReportFields };
    console.log(updatedSteps);

    Object.keys(this.changes[type]).forEach((clientId) => {
      console.log(clientId);

      Object.keys(this.changes[type][clientId]).forEach((value) => {
        const stepIndex = updatedSteps[type].findIndex(
          (step) => step.clientId === clientId && step.value === value
        );

        if (stepIndex !== -1) {
          updatedSteps[type][stepIndex].content =
            this.changes[type][clientId][value];
        } else {
          updatedSteps[type].push({
            clientId,
            value,
            content: this.changes[type][clientId][value],
          });
        }
      });
    });

    const updatedReport = {
      ...reportToUpdate,
      monthlyReportFields: updatedSteps,
    };

    this.monthlyReportService
      .updateMonthlyReport(reportToUpdate._id, updatedReport)
      .subscribe({
        next: (response) => {
          console.log('Report updated successfully:', response);
          this.changes[type] = {}; // Reset changes for this type after successful update
        },
        error: (error) => {
          console.error('Error updating report:', error);
        },
      });
  }

  updateValue(clientId: string, type: string, value: string, newValue: string) {
    if (!this.changes[type]) {
      this.changes[type] = {};
    }
    if (!this.changes[type][clientId]) {
      this.changes[type][clientId] = {};
    }
    this.changes[type][clientId][value] = newValue;
  }

  getClients(reportData: any) {
    return Object.keys(reportData).map((clientId) => ({
      clientId,
      values: reportData[clientId],
    }));
  }

  handleCheckboxChange(
    type: string,
    clientId: string,
    value: string,
    event: any
  ) {
    const newValue = event.target.checked ? 'בוצע' : 'לא בוצע';
    this.updateValue(clientId, type, value, newValue);
  }

  handleInputChange(type: string, clientId: string, value: string, event: any) {
    const newValue = event.target.value;
    this.updateValue(clientId, type, value, newValue);
  }

  getClientData(type: string, clientId: string, value: string) {
    return this.organizedData[type] && this.organizedData[type][clientId]
      ? this.organizedData[type][clientId][value]
      : '';
  }

  getClientsForType(type: string): string[] {
    if (!this.organizedData[type]) return [];
    return Object.keys(this.organizedData[type]);
  }

  getValuesForType(type: string): string[] {
    const values = new Set<string>();
    const clients = this.getClientsForType(type);

    clients.forEach((clientId) => {
      Object.keys(this.organizedData[type][clientId] || {}).forEach((value) =>
        values.add(value)
      );
    });

    return Array.from(values);
  }
}
