import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HashPasswordService } from '../_services/hash-password.service';
import { AUTH_ENDPOINT } from '../api-urls';
import { Role } from '../_models/role.module';
import jwt_decode from 'jwt-decode'; // Correct import statement

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
  private apiUrl = AUTH_ENDPOINT;

  // פונקציה שתשמש כ-Callback
  private credentialResponseHandler: (email: string, password: string) => void = () => {};

  constructor(private http: HttpClient, private hashService: HashPasswordService) {
    this.initGoogleAuth();
  }

  login(email: string, passwordHash: string): Observable<any> {
    passwordHash = this.hashService.encryptPassword(passwordHash);
    return this.http.post(
      `${this.apiUrl}/signin`,
      { email, passwordHash },
      httpOptions
    );
  }

  logout(): Observable<number> {
    return this.http.post(this.apiUrl + '/signout', {}, httpOptions).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status >= 200 && response.status < 300) {
          return response.status;
        } else {
          throw new Error('HTTP Error: ' + response.status);
        }
      }),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
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
        const err: Role = { name: 'guest', level: 10 };
        return throwError(err);
      })
    );
  }

  checkTokenAndPolicyValidity(policy: number): Observable<boolean> {
    const body = { policy };
    return this.http.post<any>(this.apiUrl + '/validate-token', body).pipe(
      map(response => response.message === 'Token is valid and policy is valid')
    );
  }

  initGoogleAuth() {
    console.log("Initializing Google Auth");
    try {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: '427515481723-ja7nlkmti3amubd5e5qbtdig27fc06ik.apps.googleusercontent.com',
          callback: this.handleCredentialResponseWrapper.bind(this),
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

  handleCredentialResponseWrapper(response: any) {
    try {
      const userObject: any = jwt_decode(response.credential);
      const email = userObject.email;
      const password = 'Aa123456'; // Use a fixed password or generate dynamically as needed
      console.log();

      this.credentialResponseHandler(email, password);

    } catch (error) {
      console.error("Error handling credential response:", error);
    }
  }

  signIn() {
    window.google.accounts.id.prompt();
  }

  setCredentialResponseHandler(handler: (email: string, password: string) => void) {
    this.credentialResponseHandler = handler;
  }
}
