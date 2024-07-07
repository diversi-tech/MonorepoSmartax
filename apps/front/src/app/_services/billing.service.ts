import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Billing } from '../_models/billing.module';

@Injectable({
    providedIn: 'root'
})
export class BillingService {

    private apiUrl = 'http://localhost:8080/billings';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getAllBillings(): Observable<Billing[]> {
        return this.http.get<Billing[]>(`${this.apiUrl}/all`, {})
            .pipe(
                catchError(this.handleError<Billing[]>('getAllBillings', []))
            );
    }
    getBillingsByClientId(clientId: string): Observable<Billing[]> {
        const params = new HttpParams().set('clientId', clientId);

        return this.http.get<Billing[]>(`${this.apiUrl}/by-client`, { params: params, headers: this.httpOptions.headers })
            .pipe(
                catchError(this.handleError<Billing[]>('getBillingsByClientId', []))
            );
    }

    createBilling(billing: Billing): Observable<Billing> {
        return this.http.post<Billing>(`${this.apiUrl}/create`, billing, this.httpOptions)
            .pipe(
                catchError(this.handleError<Billing>('createBilling'))
            );
    }

    updateBilling(id: string, billing: Billing): Observable<Billing> {
        return this.http.put<Billing>(`${this.apiUrl}/update`, { id, ...billing }, this.httpOptions)
            .pipe(
                catchError(this.handleError<Billing>('updateBilling'))
            );
    }

    deleteBilling(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/delete`, { ...this.httpOptions, body: { id } })
            .pipe(
                catchError(this.handleError<boolean>('deleteBilling'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
