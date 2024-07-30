import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FinancialStatement } from '../_models/financialStatement.module';
import { FINANCIAL_STATEMENT } from '../api-urls';
import { catchError, map, Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class FinancialStatementService {
    constructor(
        private http: HttpClient,) { }

    private apiUrl = FINANCIAL_STATEMENT;

    // Create a new financial statement
    createFinancialStatement(financialStatement: FinancialStatement): Observable<FinancialStatement> {
        return this.http.post<FinancialStatement>(`${this.apiUrl}/create`, financialStatement)
            .pipe(
                catchError(this.handleError<FinancialStatement>('createFinancialStatement'))
            );
    }

    // Get all financial statements
    getAllFinancialStatements(): Observable<FinancialStatement[]> {
        return this.http.get<FinancialStatement[]>(`${this.apiUrl}/all`)
            .pipe(
                catchError(this.handleError<FinancialStatement[]>('getAllFinancialStatements', []))
            );
    }

    // Get all financial statements for a specific client (filtered on the client side)
    getFinancialStatementsForClient(clientId: string): Observable<FinancialStatement[]> {
        return this.getAllFinancialStatements().pipe(
            map(statements => statements.filter(statement => statement.client.tz === clientId)),
            catchError(this.handleError<FinancialStatement[]>('getFinancialStatementsForClient', []))
        );
    }

    // Update an existing financial statement
    async updateFinancialStatement(id: string, financialStatement: FinancialStatement): Promise<FinancialStatement> {
        try {
            const response = await this.http.post<FinancialStatement>(`${this.apiUrl}/update/${id}`, financialStatement).toPromise();
            return response;
        } catch (error) {
            this.handleError<FinancialStatement>('updateFinancialStatement', error);
            throw error; // Re-throw the error if needed
        }
    }

    // Delete a financial statement by ID
    deleteFinancialStatement(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}`, { body: { id } })
            .pipe(
                catchError(this.handleError<boolean>('deleteFinancialStatement', false))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`); // Log error message to console
            return of(result as T); // Return default result to keep the app running
        };
    }
}