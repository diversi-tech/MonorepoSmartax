import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaxRefunds } from '../_models/taxRefunds.module';
import { USER_ENDPOINT, TAX_REFUNDS } from '../api-urls';
import { catchError, map, Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class TaxRefundsService {
  constructor(
    private http: HttpClient,) { }

  private apiUrl = TAX_REFUNDS;

 createTaxRefunds(taxRefunds: TaxRefunds): Observable<TaxRefunds> {
    return this.http.post<TaxRefunds>(`${this.apiUrl}/create`, taxRefunds)
      .pipe(
        catchError(this.handleError<TaxRefunds>('createTaxRefunds'))
      );
  }

  getAllTaxRefunds(): Observable<TaxRefunds[]> {
    return this.http.get<TaxRefunds[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError<TaxRefunds[]>('getAllTaxRefunds', []))
      );
  }

   getTaxRefundsForClient(clientId: string): Observable<TaxRefunds[]> {
    return this.getAllTaxRefunds().pipe(
      map(reports => reports.filter(report => report.idUser === clientId)),
      catchError(this.handleError<TaxRefunds[]>('getTaxRefundsForClient', []))
    );
  }

  
 

async updateTaxRefunds(id: string, taxRefunds: TaxRefunds): Promise<TaxRefunds> {
  try {
      const response = await this.http.post<TaxRefunds>(`${this.apiUrl}/update/${id}`, taxRefunds).toPromise();
      return response;
  } catch (error) {
      this.handleError<TaxRefunds>('updateTaxRefunds', error);
      throw error; 
  }
}

  deleteTaxRefunds(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}`, {  body: { id } })
      .pipe(
        catchError(this.handleError<boolean>('deleteTaxRefunds', false))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); 
      return of(result as T); 
    };
  }
  
  
}
