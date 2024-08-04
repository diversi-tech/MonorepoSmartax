import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { ClientService } from '../../../_services/client.service';
import { PaymentService } from '../../../_services/payment.service';
import { Payment } from '../../../_models/payment.module';
import { TabViewModule } from 'primeng/tabview';
import { Param } from '@nestjs/common';
import { BillingHistoryComponent } from "../billing-history/billingHistory.component";
import { PaymentDetailsHistoryComponent } from "../payment-details-history/paymentDetailsHistory.component";
import { AddBillingComponent } from "../addBilling/addBilling.component";
import { AddMorePaymentDetailsComponent } from "../addMorePaymentDetails/addMorePaymentDetails.component";
import { ChangeMainPaymentComponent } from "../changeMainPayment/changeMainPayment.component";


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, 
            DataViewModule, 
            TabViewModule, 
            RouterLinkActive, 
            RouterOutlet, 
            RouterModule, 
            BillingHistoryComponent, 
            PaymentDetailsHistoryComponent, 
            AddBillingComponent, 
            AddMorePaymentDetailsComponent, 
            ChangeMainPaymentComponent
          ],
  providers: [PaymentService, ClientService, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {

  thisClient: Client;
  thisPayment: Payment;
  show: boolean = false;


  constructor(
    public ar: ActivatedRoute,
    private paymentService: PaymentService,
    public clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.thisClient = history.state.client

    this.paymentService.searchPayment(this.thisClient.payment).subscribe(
      s => {
        this.thisPayment = s[0]
      },
      f => {
        console.log('נפל בחיפוש החשבונית');
      }
    )
  }
  moveToBillingHistory(client: Client) {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/billingHistory'], { state: { client } });
  }
  moveToPaymentDetailsHistory(client: Client) {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/paymentDetailsHistory'], { state: { client } });
  }
  addBilling(client: Client) {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/addBilling'], { state: { client: this.thisClient } });
  }
  changeMainPayment(client: Client) {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/changeMainPayment'], { state: { client: this.thisClient } });
  }
  addMorePaymentDetails(client: Client) {
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/addMorePaymentDetails'], { state: { client: this.thisClient } });
  }
  setShow() {
    this.show = !this.show
  }
  handle() {
    this.show = false;
    this.paymentService.getPayment(history.state.client.payment).subscribe(
      (s) => {
        this.thisPayment = s;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
