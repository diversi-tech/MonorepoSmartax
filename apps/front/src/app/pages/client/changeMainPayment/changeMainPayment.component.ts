import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Frequency } from '../../../_models/frequency.module';
import { FrequencyService } from '../../../_services/frequency.service';
import { PaymentService } from '../../../_services/payment.service';
import { Payment } from '../../../_models/payment.module';
import { Router } from '@angular/router';
import { EventEmitter,Output} from '@angular/core';


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
  @Output() submitEvent = new EventEmitter<void>();

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
    this.paymentService.changeMainPayment(this.thisPayment._id,
      this.paymentDetails.sumForMonth,
      this.paymentDetails.maxHours,
      this.paymentDetails.frequancy,
      this.paymentDetails.description).subscribe(data => {
        console.log(data);
        this.submitEvent.emit();
      },
      error => {
        console.log(error);
      });
  }
}
