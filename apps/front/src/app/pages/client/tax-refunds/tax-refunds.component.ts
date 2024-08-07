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
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../_services/client.service';
import { TooltipModule } from 'primeng/tooltip';

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
    TooltipModule
  ],
  templateUrl: './tax-refunds.component.html',
  styleUrl: './tax-refunds.component.css',
})
export class TaxRefundsComponent {
  constructor(
    private taxRefundsService: TaxRefundsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService

  ) {
    this.currentRoute = this.route.snapshot.url.join('/');
    console.log('Current route path:', this.currentRoute);
  }
  client: Client;
  allTaxRefunds: TaxRefunds[] | null;
  allEmploye: User[];
  currentTaxRefunds: TaxRefunds;
  currentRoute: string;
  allClients: Client[] = [];

  ngOnInit(): void {
    this.client = history.state.client;
    if (this.currentRoute === 'allClientTaxRefunds') {
      this.getAllClients();
      this.getTaxRefunds()
    }
    else {
      this.getTaxRefundsForClient();
    }
    console.log('report after', this.allTaxRefunds);
    debugger
    this.userService.getAllUsers().subscribe(

      (Employes) => {
        this.allEmploye = Employes;
      },
      (error) => {
        console.error('Error ', error);
      }
    );
  }
  getTaxRefunds(): void {
    this.taxRefundsService.getAllTaxRefunds().subscribe(
      (reports) => {
        this.allTaxRefunds = reports;
        console.log('report', this.allTaxRefunds);
      },
      (error) => {
        console.error('Error fetching tax refunds', error);
      }
    );
  }
  getTaxRefundsForClient(): void {
    debugger
    const clientId = this.client._id;
    this.taxRefundsService.getTaxRefundsForClient(clientId).subscribe(
      (reports) => {
        this.allTaxRefunds = reports;
        console.log('report', this.allTaxRefunds);
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
    debugger
    if (this, this.currentRoute === 'allClientTaxRefunds') {
      this.router.navigate(['clientSearch/clientManagement/clientNavbar/taxrefundsteps'], { state: { data: task, client: this.getClientName(task.idClient) } });

    }
    else {
      this.router.navigate(['clientSearch/clientManagement/clientNavbar/taxrefundsteps', this.router], { state: { data: task, client: this.client } });

    }
  }
  getAllClients(): void {
    this.clientService.getAllClients().subscribe(
      (clients) => (this.allClients = clients),
      (error) => console.error('Error ', error)
    );
  }
  getClientName(idClient: string): Client | undefined {
    debugger
    console.log(this.allClients.find((x) => x._id === idClient), 'client');

    return this.allClients.find((x) => x._id === idClient);
  }
  createReprtTag(): void {
      this.router.navigate(['/clientSearch/clientManagement/clientNavbar/createTaxRefunds'], { state: { client: this.client } });
  }
  

  selectTaxRefunds(taxRefunds: TaxRefunds) {
    this.currentTaxRefunds = taxRefunds;
  }
}
