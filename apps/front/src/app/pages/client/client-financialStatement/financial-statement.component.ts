import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialStatement } from '../../../_models/financialStatement.module';
import { Client } from '../../../_models/client.module';
import { Router, RouterModule } from '@angular/router';
import { FinancialStatementService } from '../../../_services/financialStatement.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-financial-statement',
  standalone: true,
  imports: [CommonModule,
    ButtonModule,
    TableModule,
    RouterModule],
  templateUrl: './financial-statement.component.html',
  styleUrl: './financial-statement.component.css',
})

export class FinancialStatementComponent implements OnInit {
  steps: any[];
  allFinancialStatement: FinancialStatement[] | null;
  client: Client;

  constructor(
    private financialStatementService: FinancialStatementService,
    private router: Router,
    // private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.getFinancialStatementsForClient();
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

  createStatement(): void {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/createFinancialStatement'], { state: { client: this.client } });
  }

  goToSteps(task: any) {
    this.router.navigate(['clientSearch/clientManagement/clientNavbar/stepsFS', this.router], { state: { data: task, client: this.client } });
  }

  goToUpdate(statement: FinancialStatement) {
    if (statement) {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/financialStatement/createFinancialStatement'], { state: { client: this.client, report: statement } });
    }
  }
}
