import { Component } from '@angular/core';
import { Billing } from '../../../_models/billing.module';
import { BillingService } from '../../../_services/billing.service';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-client-billings',
    templateUrl: './client-billings.component.html',
    styleUrl: './client-billings.component.css',
    standalone: true,
    imports: [TableModule, PrimeTemplate]
})
export class ClientBillingsComponent {
  listBillings: Billing[] = [];

  constructor(private billingService: BillingService) { }

  ngOnInit() {
    // this.billingService.getBillingsByClientId('667368ad9f9f5b132becf6a5').subscribe(data => this.listBillings = data);
  }
}
