import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TABLE_ENDPOINT } from '../api-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  url: string = TABLE_ENDPOINT;

  constructor(private http: HttpClient) {}

  getAllTables(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getData(selectedValues: any):Observable<any> {
    return this.http.post<any>(this.url, selectedValues);
  }
}
