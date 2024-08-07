import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Payment } from '../_models/payment.module';
import { PAYMENT_ENDPOINT } from '../api-urls';
import { PaymentDetails } from '../_models/paymentDetails.module';
import { PaymentMethod } from '../_models/paymentMethod.module';
import { Billing } from '../_models/billing.module';
import { User } from '../../../../../server/src/Models/user.model';
import { Frequency } from '../_models/frequency.module';
import { Client } from '../_models/client.module';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiUrl = PAYMENT_ENDPOINT;
  private clientSource = new BehaviorSubject<Client>(null); currentClient = this.clientSource.asObservable(); changeClient(client: Client) { this.clientSource.next(client); }


  constructor(private http: HttpClient) { }
  searchPayment(id: string): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/searchPayment`, { id }, this.httpOptions);
  }

  getPayment(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}`);
  }

  createPayment(mainPaymentDetails, totalPayment, paymentMethod): Observable<Payment> {
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
    return this.http.post(this.apiUrl + "/update", payment);
  }

  addBilling(_id: string, date: Date, amount: number, paymentMethod: PaymentMethod, assignedTo: User) {
    const newBilling = {
      "date": date,
      "amount": amount,
      "paymentMethod": paymentMethod,
      "assignedTo": assignedTo
    }

    return this.http.post(this.apiUrl + "/" + _id + "/billing", newBilling)
  }
  changeMainPayment(_id: string, sumForMonth: number, maxHours: number, frequency: Frequency, description: string) {
    const newPaymentDetails = {
      "sumForMonth": sumForMonth,
      "maxHours": maxHours,
      "frequency": frequency,
      "dateStart": new Date,
      "description": description
    }
    return this.http.put(this.apiUrl + '/' + _id + '/paymentDetails', newPaymentDetails)
  }

  updateBillingStatus(paymentId: string, billingId: string, status: boolean): Observable<Billing> {
    try {
      const body = { paymentId, billingId, status };
      return this.http.post<Billing>(`${this.apiUrl}/updateBillingStatus`, body);
    } catch (err) {
      console.log(err);
    }

  } addMorePaymentDetails(paymentId: string,
    sumForMonth: number,
    maxHours: number,
    frequancy: Frequency,
    dateFinish: Date,
    description: string): Observable<Payment> {
    const newMorePaymentDetails = {
      "sumForMonth": sumForMonth,
      "maxHours": maxHours,
      "frequency": frequancy,
      "dateStart": new Date,
      "dateFinish": dateFinish,
      "description": description
    }
    return this.http.post<Payment>(`${this.apiUrl}/${paymentId}/morePaymentDetails`, newMorePaymentDetails);

  }
  stopPaymentDetails(paymentId: string, paymentDetailsId: string): Observable<Payment> {
    const body = { paymentId, paymentDetailsId };
    return this.http.post<Payment>(`${this.apiUrl}/stopPaymentDetails`, body);
  }
}
