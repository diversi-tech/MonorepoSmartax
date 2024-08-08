import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PAYMENT_DETAILS_ENDPOINT } from '../api-urls';
import { PaymentDetails } from '../_models/paymentDetails.module';
import { Observable } from 'rxjs';
import { Frequency } from '../_models/frequency.module';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  private apiUrl = PAYMENT_DETAILS_ENDPOINT;


  constructor(private http: HttpClient) { }

  createPaymentDetails(sumForMonth, maxHours, frequency, dateStart,description, dateFinish?): Observable<PaymentDetails> {
    const newPaymentDetails = {
      "sumForMonth": sumForMonth,
      "maxHours": maxHours,
      "frequency": frequency,
      "dateStart": dateStart,
      "dateFinish": dateFinish,
      "description": description
    }
    return this.http.post<PaymentDetails>(this.apiUrl, newPaymentDetails);
  }


  update(_id: string,
    sumForMonth: number,
    maxHours: number,
    frequency: Frequency,
    dateStart: Date,
    dateFinish: Date,
    description: string) {
    const paymentDetails = {
      "_id": _id,
      "sumForMonth": sumForMonth,
      "maxHours": maxHours,
      "frequency": frequency,
      "dateStart": dateStart,
      "dateFinish": dateFinish,
      "description": description
    }
    return this.http.post(this.apiUrl + "/update", paymentDetails);
  }


}
