import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Client } from '../../../_models/client.module';
import { ClientService } from '../../../_services/client.service';
import { PaymentService } from '../../../_services/payment.service';
import { Payment } from '../../../_models/payment.module';
import { TabViewModule } from 'primeng/tabview';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, DataViewModule, TabViewModule, RouterLinkActive, RouterOutlet,RouterModule],
  providers: [PaymentService, ClientService,RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {

  thisClient: Client
  thisPayment: Payment


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
        this.thisPayment = s[0],
        console.log(this.thisPayment);
        console.log('arr: ');
        console.log(this.thisPayment.morePaymentDetails);
      },
      f => {
        console.log(f),
        console.log('נפל בחיפוש החשבונית');
      }
    )
  }
  moveToBillingHistory(client:Client){
    console.log("click");
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/billingHistory'], { state: { client } });
  }
  moveToPaymentDetailsHistory(client:Client){
    console.log("click");
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/paymentDetailsHistory'], { state: { client } });
  }
  addBilling(client:Client){
    console.log("click");
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/addBilling'], { state: { client: this.thisClient } });
  }
  changeMainPayment(client:Client){ 
    console.log("click");
    this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments/changeMainPayment'], { state: { client: this.thisClient } });
  }
}
