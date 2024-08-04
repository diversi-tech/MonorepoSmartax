import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FrequencyService } from '../../../_services/frequency.service';
import { Frequency } from '../../../_models/frequency.module';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentMethodService } from '../../../_services/payment-method.service';
import { PaymentMethod } from '../../../_models/paymentMethod.module';
import { PaymentService } from '../../../_services/payment.service';
import { Payment } from '../../../_models/payment.module';
import { PaymentDetailsService } from '../../../_services/payment-details.service';
import { PaymentDetails } from '../../../_models/paymentDetails.module';

@Component({
  selector: 'app-create-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './createPayment.component.html',
  styleUrl: './createPayment.component.css',
})
export class CreatePaymentComponent implements OnInit {

  type: string = "";
  thisPayment: Payment;
  newPayment: Payment;
  newPaymentDetails: PaymentDetails

  payment: any = {
    paymentDetails: {
      sumForMonth: '',
      maxHours: '',
      frequency: '',
      dateStart: '',
      dateFinish: '',
      description: ''
    },
    totalPayment: '',
    paymentMethod: ''
  }

  allFrequencies: Frequency[] = []
  allpaymentMethod: PaymentMethod[] = []

  constructor(
    public ar: ActivatedRoute,
    private frequancyService: FrequencyService,
    private paymentMethodService: PaymentMethodService,
    private paymentService: PaymentService,
    private paymentDetailsService: PaymentDetailsService

  ) { }

  setForm() {
    if (this.type === 'edit' && history.state.client.payment) {
      this.paymentService.searchPayment(history.state.client.payment).subscribe(
        suc => {
          this.thisPayment = suc;
          this.payment.paymentDetails.sumForMonth = this.thisPayment.mainPaymentDetails.sumForMonth;
          this.payment.paymentDetails.maxHours = this.thisPayment.mainPaymentDetails.maxHours;
          this.setFrequancy(this.thisPayment.mainPaymentDetails.frequency.name);
          this.payment.paymentDetails.dateStart = this.thisPayment.mainPaymentDetails.dateStart;
          this.payment.paymentDetails.dateFinish = this.thisPayment.mainPaymentDetails.dateFinish;
          this.payment.paymentDetails.description = this.thisPayment.mainPaymentDetails.description;
          this.payment.totalPayment = this.thisPayment.totalPayment;
          this.payment.paymentMethod = this.thisPayment.paymentMethod;
        },
        err => console.log(err)
      )
    }
    else {
      this.payment.paymentDetails.sumForMonth = '';
      this.payment.paymentDetails.maxHours = '';
      this.payment.paymentDetails.frequency.option = this.allFrequencies;
      this.payment.paymentDetails.dateStart = '';
      this.payment.paymentDetails.dateFinish = '';
      this.payment.paymentDetails.description = '';
      this.payment.totalPayment = '';
      this.payment.paymentMethod = '';
    }
  }

  setFrequancy(frequencyName: string) {
    this.payment.paymentDetails.frequency = this.allFrequencies.find(frequency => frequency.name === frequencyName) || null;
  }

  ngOnInit(): void {
    this.ar.params.subscribe(
      data => {
        this.type = data['type'];
        this.frequancyService.getAllFrequencys().subscribe(
          suc => {
            this.allFrequencies = suc;
            this.paymentMethodService.getAllPaymentMethod().subscribe(
              suc => {
                this.allpaymentMethod = suc;
                this.setForm()
              },
              err => console.log(err)
            );
            this.setForm()
          },
          err => console.log(err)
        );

      }
    );
  }

  onSubmit() {
    if (this.type === 'create') {
      this.paymentDetailsService.createPaymentDetails(
        this.thisPayment.mainPaymentDetails.sumForMonth,
        this.thisPayment.mainPaymentDetails.maxHours,
        this.thisPayment.mainPaymentDetails.frequency,
        this.thisPayment.mainPaymentDetails.dateStart,
        this.thisPayment.mainPaymentDetails.dateFinish,
        this.thisPayment.mainPaymentDetails.description
      ).subscribe(
        suc => {
          this.newPaymentDetails = suc
          this.paymentService.createPayment(
            this.newPaymentDetails,
            this.payment.totalPayment,
            this.payment.paymentMethod
          ).subscribe(
            sucs => {
              this.newPayment = sucs
            },
            erro => console.log(erro)
          )
        },
        err => console.log(err)
      )
    }
  }
}
