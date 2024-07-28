import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../../_models/payment.module';
import { Billing } from '../../../_models/billing.module';
import { PaymentMethod } from '../../../_models/paymentMethod.module';
import { PaymentMethodService } from '../../../_services/payment-method.service';
import { PaymentService } from '../../../_services/payment.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { User } from '../../../_models/user.module';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './addBilling.component.html',
  styleUrl: './addBilling.component.css',
})
export class AddBillingComponent implements OnInit {
  thisPayment: Payment;
  allUsers: User[] = [];
  billing: any = {
    date: '',
    amount: '',
    paymentMethod: '',
    assignedTo: ''
  }
  allpaymentMethod: PaymentMethod[] = []



  constructor(private router: Router, private paymentService: PaymentService, private paymentMethodService: PaymentMethodService, private userService: UserService) { }
  ngOnInit(): void {
    this.paymentService.getPayment(history.state.client.payment).subscribe(
      s => {
        this.thisPayment = s,
          console.log(this.thisPayment);
        this.paymentMethodService.getAllPaymentMethod().subscribe(
          suc => {
            this.allpaymentMethod = suc;
            this.billing.date = new Date();
            this.userService.getAllUsers().subscribe(
              d => {
                this.allUsers = d;

              },
              err => console.log(err)
            )

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
  onSubmit() {
    this.paymentService.addBilling(this.thisPayment._id,
      this.billing.date,
      this.billing.amount,
      this.billing.paymentMethod,
      this.billing.assignedTo).subscribe(
       s  =>{ 
        history.state.client.payment=this.thisPayment._id
        this.router.navigate(['/clientSearch/clientManagement/clientNavbar/payments'], { state: { client: history.state.client } });

      },
      err=> console.log(err)
      )
  }
}
