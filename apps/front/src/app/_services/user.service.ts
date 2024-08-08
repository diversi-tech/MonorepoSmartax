import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HashPasswordService } from './hash-password.service';
import { RoleServiceService } from './role-service.service';
import { Role } from '../_models/role.module';
import { USER_ENDPOINT } from '../api-urls';
import { Client } from '../_models/client.module';

const API_URL = 'http://localhost:8080/api/test/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private hashService: HashPasswordService,
    private roleService: RoleServiceService
  ) {}

  private apiUrl = USER_ENDPOINT;

  // register(username: string, email: string, role: Role): Observable<any> {
  //   const passwordHash = this.hashService.encryptPassword('Aa123456');
  //   const newUser = {
  //     userName: username,
  //     passwordHash: passwordHash,
  //     role: role,
  //     email: email,
  //   };
  //   return this.http.put(this.apiUrl + '/create', newUser, httpOptions);
  // }

  register(
    username: string,
    email: string,
    role: Role,
    favoritesClient: Client[]
  ): Observable<any> {
    const passwordHash = this.hashService.encryptPassword('Aa123456'); // יצירת הסיסמה המוצפנת
    const newUser = {
      userName: username,
      email: email,
      passwordHash: String(passwordHash),
      // passwordHash: 'Aa123456',

      role: role,
      favoritesClient: favoritesClient, // הוספת רשימת הלקוחות המועדפים
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(`${this.apiUrl}/create`, newUser, httpOptions);
  }

  update(
    id: string,
    userName: string,
    email: string,
    passwordHash: string,
    role: string,
    favoritesClient: Client[]
  ) {
    const user = {
      id: id,
      userName: userName,
      passwordHash: passwordHash,
      role: role,
      email: email,
      favoritesClient: favoritesClient,
    };
    return this.http.post(this.apiUrl + '/update', user, httpOptions);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '/findAll');
  }

  findOne(userId: string): Observable<any> {
    return this.http.get(this.apiUrl + `/findOne?id=${userId}`);
  }

  changPassword(newPassword: string, email: string): Observable<any> {
    const body = {
      newPassword: this.hashService.encryptPassword(newPassword),
      emailFront: email,
    };
    return this.http.put<any>(this.apiUrl + '/changePassword', body);
  }
  deleteUser(id: string) {
    console.log('delete user in service');

    return this.http.delete<any>(this.apiUrl + '/delete?id=' + id);
  }
}
