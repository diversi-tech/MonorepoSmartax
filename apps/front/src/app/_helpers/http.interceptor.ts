import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { TokenService } from '../_services/token.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthAndCredentialsInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken()?.access_token;
    if (token) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    req = req.clone({
      withCredentials: true
    });

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Handle successful responses
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          try {
            this.authService.logout()
            window.location.reload()
            this.router.navigate(["/login"]);

          } catch (err) {

          }
        }
      })
    );
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthAndCredentialsInterceptor, multi: true },
];