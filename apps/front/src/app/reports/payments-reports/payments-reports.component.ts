import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SplitterModule } from 'primeng/splitter';
@Component({
  selector: 'app-payments-reports',
  standalone: true,
  imports: [CommonModule, TableModule,SplitterModule],
  templateUrl: './payments-reports.component.html',
  styleUrl: './payments-reports.component.css',
})
export class PaymentsReportsComponent implements OnInit {

  ngOnInit(): void {
  }
  clientsWithoutHOC: any[] = [
    { name: 'Client 1', serviceStartDate: '2022-01-01', totalDebtAmount: 100 },
    { name: 'Client 2', serviceStartDate: '2022-02-15', totalDebtAmount: 150 },
    // Add more clients without HOC as needed
  ];

  clientsWithReturnedHOC: any[] = [
    { name: 'Client A', returnedHOCNumber: '123ABC', totalDebtAmount: 200 },
    { name: 'Client B', returnedHOCNumber: '456DEF', totalDebtAmount: 250 },
    // Add more clients with returned HOC as needed
  ];

  constructor() { }

  openClientPayment() {
    // Function to handle opening the "client-payment" page
  }

  openClientPaymentHistory() {
    // Function to handle opening the "client-payment-history" page
  }
}