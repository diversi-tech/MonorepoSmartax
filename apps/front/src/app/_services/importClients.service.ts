import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMPORTCLIENTS_ENDPOIMT } from '../api-urls';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImportClientsService {

  constructor(private http: HttpClient) { }
   upload(formData:FormData): Observable<any>{
    return this.http.post(`${IMPORTCLIENTS_ENDPOIMT}/upload`, formData)
  }
  download(): Observable<any>{
    return this.http.get(`${IMPORTCLIENTS_ENDPOIMT}/download-template`, { responseType: 'blob' })
  }
}
