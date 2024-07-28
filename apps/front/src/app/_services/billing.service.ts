import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Billing } from '../_models/billing.module';
import { BILLING_ENDPOINT } from '../api-urls';

@Injectable({
    providedIn: 'root'
})
export class BillingService {

    private apiUrl = BILLING_ENDPOINT;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getAllBillings(): Observable<Billing[]> {
        return this.http.get<Billing[]>(`${this.apiUrl}/all`, {});
    }
    // getBillingsByClientId(clientId: string): Observable<Billing[]> {
    //     const params = new HttpParams().set('clientId', clientId);

    //     return this.http.get<Billing[]>(`${this.apiUrl}/by-client`, { params: params, headers: this.httpOptions.headers })
    //         .pipe(
    //             catchError(this.handleError<Billing[]>('getBillingsByClientId', []))
    //         );
    // }

    createBilling(billing: Billing): Observable<Billing> {
        return this.http.post<Billing>(`${this.apiUrl}/create`, billing, this.httpOptions);
    }

    updateBilling(id: string, billing: Billing): Observable<Billing> {
        return this.http.put<Billing>(`${this.apiUrl}/update`, { id, ...billing }, this.httpOptions);
    }

    deleteBilling(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/delete`, { ...this.httpOptions, body: { id } });
    }
    getBilling(id: string): Observable<Billing> {
        return this.http.get<Billing>(`${this.apiUrl}/${id}`);
    }
    updateBillingStatus(id: string, status: boolean): Observable<Billing> {
        console.log("updateBillingStatus in service front ", id, status);
        
        return this.http.put<Billing>(`${this.apiUrl}/update-status`, { id, status }, this.httpOptions);
    }


}
