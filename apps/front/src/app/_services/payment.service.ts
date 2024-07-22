import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../_models/payment.module';
import { PAYMENT_ENDPOINT } from '../api-urls';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
private apiUrl = PAYMENT_ENDPOINT;


  constructor(private http: HttpClient) { }
  searchPayment(id: string): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/searchPayment`, { id }, this.httpOptions);
  }
}
