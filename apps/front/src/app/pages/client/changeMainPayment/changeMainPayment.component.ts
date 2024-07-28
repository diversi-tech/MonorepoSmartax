import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Frequency } from '../../../_models/frequency.module';
import { Router } from '@angular/router';
import { FrequencyService } from '../../../_services/frequency.service';
import { PaymentService } from '../../../_services/payment.service';
import { Payment } from '../../../_models/payment.module';

@Component({
  selector: 'app-change-main-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './changeMainPayment.component.html',
  styleUrl: './changeMainPayment.component.css',
})
export class ChangeMainPaymentComponent implements OnInit{
  
  allFrequaccies: Frequency[] = [];
  thisPayment: Payment;
  paymentDetails: any = {
    sumForMonth: '',
    maxHours: '',
    frequancy: '',
    dateStart: '',
    dateFinish:'',
    description:'',
  }
  constructor(private router: Router,private frequancyService: FrequencyService,private paymentService: PaymentService) {}
  ngOnInit(): void {
    this.paymentService.getPayment(history.state.client.payment).subscribe(
      s => {
        this.thisPayment = s,
          console.log(this.thisPayment);
        this.frequancyService.getAllFrequencys().subscribe(
          suc => {
            this.allFrequaccies = suc;
          },
          err => console.log(err)
        )
      },
      f => {
        console.log(f),
          console.log('נפל בחיפוש החשבונית');
      }
    )
  }

  onSubmit(){
    
  }
}
