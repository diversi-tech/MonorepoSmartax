import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError } from 'rxjs';
import { Role } from '../_models/role.module';
import { ROLE_ENDPOINT } from '../api-urls';


@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  url = ROLE_ENDPOINT
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Define headers for HTTP requests
  };

  constructor(private http: HttpClient) { }

  getRoleById(id: string): Observable<Role> {
    return this.http.post<Role>(`${this.url}/searchClient`, { id }, this.httpOptions)
  }

  getAllRolies(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}`)
      
  }
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.url, role, this.httpOptions)
  }

  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.url}`, role, this.httpOptions)
  }

  deleteRole(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}`, { ...this.httpOptions, body: { id } })
  }

}
