import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Footer, PrimeTemplate } from 'primeng/api';
import { Button, ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaymentDetails } from '../../../_models/paymentDetails.module';
import { Payment } from '../../../_models/payment.module';
import { PaymentService } from '../../../_services/payment.service';

@Component({
  selector: 'app-payment-details-history',
  standalone: true,
  imports: [DatePipe,CommonModule, ConfirmDialogModule, Footer, ButtonDirective, TableModule, PrimeTemplate, Button],
  templateUrl: './paymentDetailsHistory.component.html',
  styleUrl: './paymentDetailsHistory.component.css',
})
export class PaymentDetailsHistoryComponent implements OnInit{
  allpaymentDetails: PaymentDetails[]=[];
  payment:Payment;
  constructor(private paymentService:PaymentService) { }
  ngOnInit(): void {
    this.paymentService.getPayment(history.state.client.payment).subscribe(
      s => {
        this.payment = s,
        console.log(this.payment._id);
        
        console.log(this.payment);
        console.log('arr: ');
        console.log(this.payment.paymentHistory);
        this.allpaymentDetails = this.payment.paymentHistory

      },
      f => {
        console.log(f),
        console.log('נפל בחיפוש החשבונית');
      }
    )

    
  }



}
