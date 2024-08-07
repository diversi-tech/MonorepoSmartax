import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialStatement } from '../../../_models/financialStatement.module';
import { Client } from '../../../_models/client.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FinancialStatementService } from '../../../_services/financialStatement.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ClientService } from '../../../_services/client.service';
import { IconProfileComponent } from '../../../share/icon-profile/icon-profile.component';

@Component({
  selector: 'app-financial-statement',
  standalone: true,
  imports: [CommonModule,
    ButtonModule,
    TableModule,
    RouterModule,
    IconProfileComponent],
  templateUrl: './financial-statement.component.html',
  styleUrl: './financial-statement.component.css',
})

export class FinancialStatementComponent implements OnInit {
  steps: any[];
  allFinancialStatement: FinancialStatement[] | null;
  client: Client;
  allClient: Client[] = [];
  currentRoute: string;
  sortedStatement: FinancialStatement[] = [];

  constructor(
    private financialStatementService: FinancialStatementService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.currentRoute = this.route.snapshot.url.join('/');
  }

  ngOnInit(): void {
    this.client = history.state.client;
    if (this.currentRoute === 'allClientFinancialStatement') {
      this.getFinancialStatements();
      this.getAllClients();
    }
    else {
      this.getFinancialStatementsForClient();
    }
  }
  getFinancialStatements(): void {
    this.financialStatementService.getAllFinancialStatements().subscribe(
      (reports) => {
        this.allFinancialStatement = reports;
        // this.sortStatementsByClientName(); // Sort after fetching data
      },
      (error) => {
        console.error('Error fetching financial statements', error);
      }
    );
  }
  getFinancialStatementsForClient(): void {
    const clientId = this.client._id // Assuming the client ID is passed via the state
    this.financialStatementService.getFinancialStatementsForClient(clientId).subscribe(
      (reports) => {
        this.allFinancialStatement = reports;
      },
      (error) => {
        console.error('Error fetching financial statements for client', error);
      }
    );
  }
  getAllClients(): void {
    this.clientService.getAllClients().subscribe(
      (clients) => (this.allClient = clients),
      (error) => console.error('Error ', error)
    );
  }
  createStatement(): void {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/createFinancialStatement'], { state: { client: this.client } });
  }

  goToSteps(task: any) {
    if (this, this.currentRoute === 'allClientFinancialStatement') {
      this.router.navigate(['clientSearch/clientManagement/clientNavbar/stepsFS'], { state: { data: task, client: this.getClientName(task.client) } });
    }
    else {
      this.router.navigate(['clientSearch/clientManagement/clientNavbar/stepsFS', this.router], { state: { data: task, client: this.client } });
    }
  }

  goToUpdate(statement: FinancialStatement) {
    if (statement) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/financialStatement/createFinancialStatement'], { state: { client: this.client, report: statement } });
    }
  }
  getClientName(idClient: string): string | undefined {
    debugger
    const client = this.allClient.find((x) => x._id === idClient);
    debugger
    return client?.firstName + ' ' + client?.lastName;
  }
  // sortStatementsByClientName(): void {
  //   this.sortedStatement = [...this.allFinancialStatement].sort((a, b) => {
  //     const clientNameA = this.getClientName(a.client._id) || '';
  //     const clientNameB = this.getClientName(a.client._id) || '';
  //     return clientNameA.localeCompare(clientNameB);
  //   });
  // }
}
