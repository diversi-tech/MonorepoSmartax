// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { StorageService } from '../_services/storage.service';
import { TokenService } from '../_services/token.service';

// @Injectable()
// export class AuthAndCredentialsInterceptor implements HttpInterceptor {

//   constructor(private tokenService:TokenService){}
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     const token = this.tokenService.getToken()?.access_token;
//     if (token) {

//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     req = req.clone({
//       withCredentials: true
//     });

//     return next.handle(req);
//   }
// }

// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthAndCredentialsInterceptor, multi: true },
// ];

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthAndCredentialsInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken()?.access_token;
    let headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (req.body) {
      headers['Content-Type'] = 'application/json';
    }

    const clonedReq = req.clone({
      setHeaders: headers,
      withCredentials: true,
    });

    console.log('Intercepted request method:', req.method); // הדפס את סוג הבקשה
    console.log('Intercepted request headers:', clonedReq.headers); // הדפס את ה-Headers
    console.log('Intercepted request body:', req.body); // הדפס את ה-body של הבקשה

    return next.handle(clonedReq);
  }
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthAndCredentialsInterceptor,
    multi: true,
  },
];
