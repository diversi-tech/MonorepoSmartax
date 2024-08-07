import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { HashPasswordService } from './hash-password.service';
import { RoleServiceService } from './role-service.service';
import { Role } from '../_models/role.module';
import { USER_ENDPOINT, USER_ENDPOINT2 } from '../api-urls';
import { Client } from '../_models/client.module';
import { User } from '../_models/user.module';

const API_URL = USER_ENDPOINT2;
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // register(username: string, email: string, role: Role): Observable<User> {
  //   const passwordHash = this.hashService.encryptPassword('Aa123456');
  //   // const newUser: User = {
  //   //   userName: username,
  //   //   passwordHash: passwordHash,
  //   //   role: role._id,
  //   //   email: email,
  //   // };
  //   // return this.http.put<User>(
  //   //   this.apiUrl + '/create',
  //   //   { newUser },
  //   //   {
  //   //     headers: new HttpHeaders({
  //   //       'Content-Type': 'application/json',
  //   //     }),
  //   //   }
  //   // );
  //   const newUser = {
  //     newUser: {
  //       userName: username,
  //       passwordHash: passwordHash,
  //       role: role._id,
  //       email: email,
  //     },
  //   };

  //  return this.http
  //     .put<User>('https://monoreposmartax-n13o.onrender.com/users/create', newUser,
  //       httpOptions,
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log('Response:', response);
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );

  //   // return this.http.put(this.apiUrl + '/create', newUser, httpOptions);
  // }

  register(username: string, email: string, role: Role): Observable<User> {
    const passwordHash = this.hashService.encryptPassword('Aa123456');
    const newUser: User = {
      userName: username,
      passwordHash: passwordHash,
      role: role._id,
      email: email,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<User>(
      'https://monoreposmartax-n13o.onrender.com/users/create',
      newUser,
      httpOptions
    );
  }

  // update(
  //   id: string,
  //   userName: string,
  //   email: string,
  //   passwordHash: string,
  //   role: string,
  //   favoritesClient: Client[]
  // ) {
  //   const user = {
  //     id: id,
  //     userName: userName,
  //     passwordHash: passwordHash,
  //     role: role,
  //     email: email,
  //     favoritesClient: favoritesClient,
  //   };
  //   console.log(user);

  //   return this.http.post(this.apiUrl + '/update', { user }, this.httpOptions);
  // }

  update(
    id: string,
    userName: string,
    email: string,
    passwordHash: string,
    role: string,
    favoritesClient: Client[]
  ): Observable<User> {
    const user = {
      "id": id,
      "userName": userName,
      "passwordHash": passwordHash,
      "role": role,
      "email": email,
      "favoritesClient":favoritesClient
    }
    return this.http
      .post<User>(`${this.apiUrl}/update`, { user }, this.httpOptions)
      .pipe(catchError(this.handleError<User>('update')));
  }
    
  getPublicContent(): Observable<any> {
    return this.http.get(this.apiUrl + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'admin', { responseType: 'text' });
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
    return this.http.delete<any>(this.apiUrl + '/delete?id=' + id)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
