import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../_models/payment.module';
import { PAYMENT_ENDPOINT } from '../api-urls';
import { PaymentDetails } from '../_models/paymentDetails.module';
import { PaymentMethod } from '../_models/paymentMethod.module';
import { Billing } from '../_models/billing.module';
import { User } from '../../../../../server/src/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
private apiUrl = PAYMENT_ENDPOINT;


  constructor(private http: HttpClient) { }
  searchPayment(id: string): Observable<Payment[]> {
    return this.http.post<Payment[]>(`${this.apiUrl}/searchPayment`, { id }, this.httpOptions);
  }

  getPayment(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${ id }`);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}`);
  }

  createPayment(mainPaymentDetails,totalPayment,paymentMethod): Observable<Payment> {

    const newPayment = {
      "mainPaymentDetails": mainPaymentDetails,
      "morePaymentDetails": [],
      "totalPayment": totalPayment,
      "paymentMethod": paymentMethod,
      "paymentHistory": [],
      "billingHistory": []
    }
    return this.http.post<Payment>(this.apiUrl, newPayment);
  }

  updatePayment(_id: string,
    mainPaymentDetails: PaymentDetails,
    morePaymentDetails: PaymentDetails[],
    totalPayment: number,
    paymentMethod: PaymentMethod,
    paymentHistory: PaymentDetails[],
    billingHistory: Billing) {
    const payment = {
      "_id": _id,
      "mainPaymentDetails": mainPaymentDetails,
      "morePaymentDetails": morePaymentDetails,
      "totalPayment": totalPayment,
      "paymentMethod": paymentMethod,
      "paymentHistory": paymentHistory,
      "billingHistory": billingHistory
    }
    console.log(payment);

    return this.http.post(this.apiUrl + "/update", payment);
  }

  addBilling(_id: string,date:Date,amount:number,paymentMethod:PaymentMethod,assignedTo:User){

    const newBilling={
      "date":date,
      "amount":amount,
      "paymentMethod":paymentMethod,
      "assignedTo":assignedTo
    }

    return this.http.post(this.apiUrl+"/"+ _id ,newBilling)
  }
}
