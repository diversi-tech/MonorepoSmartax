import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Client } from '../../../_models/client.module';
import { TaxRefundsService } from '../../../_services/taxRefunds.service';
import { TaxRefunds } from '../../../_models/taxRefunds.module';
import { User } from '../../../_models/user.module';
import { UserService } from '../../../_services/user.service';
import { TableModule } from 'primeng/table';
import { StepperModule } from 'primeng/stepper';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tax-refunds',
  standalone: true,
  imports: [
    CommonModule,
    StepperModule,
    ButtonModule,
    StepperModule,
    StepsModule,
    TableModule,
  ],
  templateUrl: './tax-refunds.component.html',
  styleUrl: './tax-refunds.component.css',
})
export class TaxRefundsComponent {
  constructor(
    private taxRefundsService: TaxRefundsService,
    private userService: UserService,
    private router: Router
  ) { }

  client: Client;
  allTaxRefunds: TaxRefunds[] | null;
  allEmploye: User[];
  currentTaxRefunds: TaxRefunds;


  ngOnInit(): void {
    this.client = history.state.client;
    this.getTaxRefundsForClient();
    this.userService.getAllUsers().subscribe(
      (Employes) => {
        this.allEmploye = Employes;
      },
      (error) => {
        console.error('Error ', error);
      }
    );
  }
  getTaxRefundsForClient(): void {
    const clientId = this.client._id;
    this.taxRefundsService.getTaxRefundsForClient(clientId).subscribe(
      (reports) => {
        this.allTaxRefunds = reports;
      },
      (error) => {
        console.error('Error fetching yearly reports for client', error);
      }
    );
  }
  getEmployeName(idEmploye: string): any {
    return this.allEmploye.find((x) => x._id == idEmploye);
  }

  goToSteps(task: any) {
    this.router.navigate(['clientSearch/clientManagement/clientNavbar/taxrefundsteps', this.router], { state: { data: task, client: this.client } });
  }

  selectTaxRefunds(taxRefunds: TaxRefunds) {
    this.currentTaxRefunds = taxRefunds;
  }
}
