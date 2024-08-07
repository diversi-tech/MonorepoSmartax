import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyReport } from '../../_models/yearlyReport.module';
import { Client } from '../../_models/client.module';
import { User } from '../../_models/user.module';
import { YearlyReportService } from '../../_services/yearlyReport.service';
import { UserService } from '../../_services/user.service';
import { ClientService } from '../../_services/client.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IconProfileComponent } from '../../share/icon-profile/icon-profile.component';
import { Location } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterOutlet } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-report-client-yearly-report',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterOutlet,
    TableModule,
    IconProfileComponent,
    InputTextModule,
    TooltipModule
  ],
  templateUrl: './report-client-yearly-report.component.html',
  styleUrls: ['./report-client-yearly-report.component.css'],
})

export class ReportClientYearlyReportComponent implements OnInit {
  allYearlyReport: YearlyReport[] = [];
  client: Client | null = null;
  employeName: User | undefined;
  allEmployes: User[] = [];
  allClient: Client[] = [];
  sortedReports: YearlyReport[] = [];
  currentYearlyReport: YearlyReport;
  isSelected: number = 5;
  selectedStatus: string = "";
  filterstatus: string = "";
  is: number = 2
  filterallYearlyReport: YearlyReport[];


  constructor(
    private yearlyReportService: YearlyReportService,
    private router: Router,
    private employeService: UserService,
    private clientService: ClientService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAllYearlyReport();
    this.getAllClients();
    this.getAllEmployes();
  }

  getAllEmployes(): void {
    this.employeService.getAllUsers().subscribe(
      (employes) => (this.allEmployes = employes),
      (error) => console.error('Error ', error)
    );
  }

  getAllClients(): void {
    this.clientService.getAllClients().subscribe(
      (clients) => (this.allClient = clients),
      (error) => console.error('Error ', error)
    );
  }

  getAllYearlyReport(): void {
    this.yearlyReportService.getAllYearlyReports().subscribe(
      (reports) => {
        this.allYearlyReport = reports.filter(Boolean); // remove any falsy values
        this.sortReportsByClientName(); // Sort after fetching data
      },
      (error) => console.error('Error fetching yearly reports for client', error)
    );
  }

  goToSteps(idClient: string, task: YearlyReport): void {
    this.router.navigate(['steps'], { state: { data: task, client: this.getClient(idClient) } });
  }

  getEmployeName(idEmploye: string): User | undefined {
    return this.allEmployes.find((x) => x._id === idEmploye);
  }

  getClientName(idClient: string): string | undefined {
    const client = this.allClient.find((x) => x._id === idClient);
    return client?.firstName + ' ' + client?.lastName;
  }

  getClient(idClient: string): Client | undefined {
    return this.allClient.find((x) => x._id === idClient);
  }

  goBack(): void {
    this.location.back();
  }

  filterByClient(name: string): void {
    this.sortedReports = this.allYearlyReport.filter((task) =>
      (this.getClientName(task.idClient)).toLowerCase().includes(name.toLowerCase())
    );
  }

  sortReports(): void {
    this.sortedReports = [...this.allYearlyReport].sort((a, b) => {
      const nameA = this.getClientName(a.idClient) || '';
      const nameB = this.getClientName(b.idClient) || '';
      return nameA.localeCompare(nameB);
    });
  }

  sortReportsByClientName(): void {
    this.sortedReports = [...this.allYearlyReport].sort((a, b) => {
      const clientNameA = this.getClientName(a.idClient) || '';
      const clientNameB = this.getClientName(b.idClient) || '';
      return clientNameA.localeCompare(clientNameB);
    });
  }

  selectYearlyReport(yearlyReport: YearlyReport) {
    this.currentYearlyReport = yearlyReport;
  }
}


