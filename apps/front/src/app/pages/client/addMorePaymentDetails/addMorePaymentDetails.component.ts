import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Frequency } from '../../../_models/frequency.module';
import { Payment } from '../../../_models/payment.module';
import { Router } from '@angular/router';
import { FrequencyService } from '../../../_services/frequency.service';
import { PaymentService } from '../../../_services/payment.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-more-payment-details',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './addMorePaymentDetails.component.html',
  styleUrl: './addMorePaymentDetails.component.css',
})
export class AddMorePaymentDetailsComponent implements OnInit {
  allFrequaccies: Frequency[] = [];
  thisPayment: Payment;
  paymentDetails: any = {
    sumForMonth: '',
    maxHours: '',
    frequancy: '',
    dateStart: '',
    dateFinish: '',
    description: '',
  }
  @Output() submitEvent = new EventEmitter<void>();

  constructor(private router: Router, private frequancyService: FrequencyService, private paymentService: PaymentService) { }
  ngOnInit(): void {
    this.paymentService.getPayment(history.state.client.payment).subscribe(
      s => {
        this.thisPayment = s,
          this.frequancyService.getAllFrequencys().subscribe(
            suc => {
              this.allFrequaccies = suc;
            },
            err => console.log(err)
          )
      },
      f => {
        console.log('נפל בחיפוש החשבונית');
      }
    )
  }

  onSubmit() {
    this.paymentService.addMorePaymentDetails(this.thisPayment._id,
      this.paymentDetails.sumForMonth,
      this.paymentDetails.maxHours,
      this.paymentDetails.frequancy,
      this.paymentDetails.dateFinish,
      this.paymentDetails.description).subscribe(data => {
        this.submitEvent.emit();
      }),
      error => {
        console.log(error);
      }
  }
}
