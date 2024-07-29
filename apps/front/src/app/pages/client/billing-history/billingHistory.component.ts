import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Footer, PrimeTemplate } from 'primeng/api';
import { Button, ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Billing } from '../../../_models/billing.module';
import { BillingService } from '../../../_services/billing.service';
import { Payment } from '../../../_models/payment.module';
import { PaymentService } from '../../../_services/payment.service';

@Component({
  selector: 'app-billing-history',
  standalone: true,
  imports: [DatePipe, CommonModule, ConfirmDialogModule, Footer, ButtonDirective, TableModule, PrimeTemplate, Button],
  templateUrl: './billingHistory.component.html',
  styleUrl: './billingHistory.component.css',
})
export class BillingHistoryComponent implements OnInit {
  allBillings: Billing[] = [];
  payment: Payment;
  constructor(private paymentService: PaymentService, private billingService: BillingService) { }
  ngOnInit(): void {
    console.log("paymentId " + history.state.client.payment);


    this.paymentService.getPayment(history.state.client.payment).subscribe(
      s => {
        this.payment = s,
          console.log(this.payment._id);

        console.log(this.payment);
        console.log('arr: ');
        console.log(this.payment.billingHistory);
        this.allBillings = this.payment.billingHistory

      },
      f => {
        console.log(f),
          console.log('נפל בחיפוש החשבונית');
      }
    )


  }
  changeIsReturned(billing: Billing) {
    console.log("click on changeIsReturned ");
    
    console.log("start changeIsReturned "+ billing._id);
    
    this.paymentService.updateBillingStatus(this.payment._id, billing._id, !billing.ifRreturn).subscribe(
      s =>{ console.log(s);
        this.ngOnInit() 

      },
      f => console.log(f))
  }

}
