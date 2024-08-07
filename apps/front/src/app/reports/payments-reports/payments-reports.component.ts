import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SplitterModule } from 'primeng/splitter';
import { Payment } from '../../_models/payment.module';
import { PaymentService } from '../../_services/payment.service';
import { Client } from '../../_models/client.module';
import { ClientService } from '../../_services/client.service';
import { Billing } from '../../_models/billing.module';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payments-reports',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    SplitterModule,
    PanelModule
  ],
  templateUrl: './payments-reports.component.html',
  styleUrl: './payments-reports.component.css',
})

export class PaymentsReportsComponent implements OnInit {

  constructor(
    private router: Router,
    private paymentServise: PaymentService,
    private clientService: ClientService
  ) { }

  clients: Client[] = [];
  payments: { client: Client, payment: Payment }[] = [];

  async getClients() {
    // get clients
    await this.clientService.getAllClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.getPayments()
      },
    })
  }

  async getPayments() {
    for (const c of this.clients!) {
      if (c.payment && c.payment !== "") {
        await this.paymentServise.getPayment(c.payment).toPromise().then((data) => {
          this.payments.push({ client: c, payment: data });
          if (this.clients!.indexOf(c) === this.clients!.length - 1) {
            this.sortByPayments();
          }
        }).catch((error) => {
          console.log(error);
        });
      } else {
        if (this.clients!.indexOf(c) === this.clients!.length - 1) {
          this.sortByPayments();
        }
      }
    }
  }

  async sortByPayments() {
    //sort by payment type
    if (this.payments != undefined) {
      this.clientsWithoutHOC = this.payments!.filter(c => c.payment.paymentMethod!.name != "Credit Card")
        .map(c => ({ _id: c.client._id, name: c.client.firstName, serviceStartDate: c.payment.mainPaymentDetails.dateStart, totalDebtAmount: c.payment.totalPayment }));
      this.clientsWithReturnedHOC = this.payments!.filter
        (c => c.payment.paymentMethod!.name == "Credit Card"
          && (this.returnedHOC(c.payment.billingHistory).res))
        .map(c => ({ _id: c.client._id, name: c.client.firstName, returnedHOCNumber: this.returnedHOC(c.payment.billingHistory).count, totalDebtAmount: c.payment.totalPayment }))
    }
  }

  async start() {
    await this.getClients();
  }

  ngOnInit(): void {
    try {
      this.start()
    } catch (err) {
      console.log(err);
    }
  }

  clientsWithoutHOC: any[] = [];

  clientsWithReturnedHOC: any[] = [];

  returnedHOC(billingHistory: Billing[]) {
    let res = false
    let count = 0
    billingHistory.forEach(b => {
      if (b.ifRreturn == true) {
        res = true
        count++
      }
    })
    return { res, count }
  }

  openClientPayment(_id: string) {
    this.router.navigate(['clientSearch/clientManagement/clientNavbar/payments'], { state: { client: this.clients.find(c => c._id == _id) } });
  }

  openClientPaymentHistory(_id: string) {
  }
}

