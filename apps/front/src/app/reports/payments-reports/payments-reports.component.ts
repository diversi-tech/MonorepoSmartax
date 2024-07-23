import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SplitterModule } from 'primeng/splitter';
import { Payment } from '../../_models/payment.module';
import { PaymentService } from '../../_services/payment.service';
import { Client } from '../../_models/client.module';
import { ClientService } from '../../_services/client.service';
import { catchError } from 'rxjs';
import { error } from 'console';
import { Billing } from '../../_models/billing.module';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-payments-reports',
  standalone: true,
  imports: [CommonModule, TableModule, SplitterModule, PanelModule],
  templateUrl: './payments-reports.component.html',
  styleUrl: './payments-reports.component.css',
})
export class PaymentsReportsComponent implements OnInit {

  constructor(private paymentServise: PaymentService, private clientService: ClientService) { }

  clients: Client[] = [];
  payments: { client: Client, payment: Payment }[] = [];

  async getClients() {
    console.log("get clients");

    // get clients
    await this.clientService.getAllClients().subscribe({
      next: (data: Client[]) => {
        console.log("clients", data);
        this.clients = data;
        console.log("call to getPayments");

        this.getPayments()
      },
    })
    console.log("finish get clients");
    console.log(this.clients);

  }

  async getPayments() {
    console.log("get payments");
    //get payments
    await this.clients!.forEach(c => {
      if (c.payment && c.payment != "") {
        this.paymentServise.getPayment(c.payment).subscribe({
          next: (data) => {
            console.log(`payments of ${c.firstName!}`, data);
            this.payments.push({ client: c, payment: data })
            console.log("payments: \n" + this.payments);
            if (this.clients.indexOf(c) == this.clients.length - 1) {
              this.sortByPayments()
            }
          },
          error: (error) => {
            console.log(error);
          }
        }
        )
      }
      else {
        console.log("there are'nt payments");

      }
    });
    console.log("finish get payments");
    console.log(this.payments);
  }

  async sortByPayments() {
    console.log("sort payments");
    //sort by payment type
    this.payments.forEach(p => {
      console.log(p.payment.paymentMethod.name);
    })

    if (this.payments != undefined) {
      this.clientsWithoutHOC = this.payments!.filter(c => c.payment.paymentMethod.name != "Credit Card")
        .map(c => ({ name: c.client.firstName, serviceStartDate: c.payment.mainPaymentDetails.dateStart.toString(), totalDebtAmount: c.payment.totalPayment }));
      console.log("clientsWithoutHOC", this.clientsWithoutHOC);


      this.clientsWithReturnedHOC = this.payments!.filter
        (c => c.payment.paymentMethod.name == "Credit Card"
          && (this.returnedHOC(c.payment.billingHistory).res))
        .map(c => ({ name: c.client.firstName, returnedHOCNumber: this.returnedHOC(c.payment.billingHistory).count, totalDebtAmount: c.payment.totalPayment }))
      console.log("clientsWithReturnedHOC", this.clientsWithReturnedHOC);
    }
    console.log("finish sort payments");
  }

  async start() {
    await this.getClients();
    // await this.getPayments();

  }

  ngOnInit(): void {
    try {
      this.start()
      // setTimeout(this.sortByPayments, 8000)

    } catch (err) {
      console.log(err);
    }
  }

  clientsWithoutHOC: any[] = [
    // { name: string|null, serviceStartDate: string|null, totalDebtAmount: number|null }
  ];

  clientsWithReturnedHOC: any[] = [
    //{ name: string|null, returnedHOCNumber: string|null, totalDebtAmount: number|null }
  ];

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

  openClientPayment() { }

}

