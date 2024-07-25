import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HashPasswordService } from '../_services/hash-password.service';
import { AUTH_ENDPOINT } from '../api-urls';
import { Role } from '../_models/role.module';
const jwt_decode = require('jwt-decode');

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private hashSevice: HashPasswordService, private hash: HashPasswordService) {
    this.initGoogleAuth();
   }

  private apiUrl = AUTH_ENDPOINT;

  login(email: string, passwordHash: string): Observable<any> {
    passwordHash = this.hashSevice.encryptPassword(passwordHash)
    return this.http.post(
      this.apiUrl + '/signin',
      {
        email,
        passwordHash
      },
      httpOptions
    );
  }

  
  logout(): Observable<number> {
    try {
      return this.http.post(this.apiUrl + '/signout', {}, httpOptions).pipe(
        
        map((response: HttpResponse<any>) => {
          console.log(response);        
          if (response.status >= 200 && response.status < 300) {
            return response.status;
          } else {
            throw new Error('HTTP Error: ' + response.status);
          }
        })
      );

    }catch(error){
      debugger
      console.log(error)
      return throwError(error);
    }
  }

   getCurrentRole(): Observable<Role> {
    const token = JSON.parse(sessionStorage.getItem('auth-user') + '')?.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<Role>(this.apiUrl + '/current-role', { headers }).pipe(
      map(role => role),
      
      catchError(error => {
        console.error('An error occurred:', error);
        const err:Role = {name:'guest', level:10};
        return throwError(err);
      })
    );

  }


  checkTokenAndPolicyValidity(policy: number): Observable<boolean> {


    const body = { policy };

    return this.http.post<any>(this.apiUrl + '/validate-token', body).pipe(
      // map(response => {
      //   if (response.message !== 'Token is valid and policy is valid') {
      //     return false;
      //   }

      //   return true;
      // })
    );
  }
  initGoogleAuth() {
    console.log("Initializing Google Auth");
    try {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: '450626878965-7r8nl14gj5eh5h4lfb1qs2d4kfkvq15l.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { theme: 'outline', size: 'large' }
        );
      } else {
        console.error("Google accounts library is not loaded.");
      }
    } catch (error) {
      console.error("Error initializing Google Auth:", error);
    }
  }
  
  
  handleCredentialResponse(response: any) {
    try {
      const userObject: any = jwt_decode(response.credential);
      console.log(userObject);
      // כאן אפשר לשלוח את ה-token לשרת שלך לאימות נוסף או לבצע פעולות נוספות
    } catch (error) {
      console.error("Error handling credential response:", error);
    }
  }
  

  signIn() {
    window.google.accounts.id.prompt();
  }
}