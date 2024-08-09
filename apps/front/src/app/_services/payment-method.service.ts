import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PAYMENT_METHOD_ENDPOINT } from '../api-urls';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../_models/paymentMethod.module';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private apiUrl = PAYMENT_METHOD_ENDPOINT;


  constructor(private http: HttpClient) { }

  getAllPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.apiUrl}`);
  }
}
