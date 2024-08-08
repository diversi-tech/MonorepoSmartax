import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageServise: StorageService,private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authType = next.data['authType'];
    if (authType === 10) {
      return true;
    }
    return this.authService.checkTokenAndPolicyValidity(authType).pipe(
      map(isAuthorized => {
        return true;
      }),
      catchError(error => {
        if (error.status === 401) {
          console.log(error);
          this.router.navigate(['/home']);
          // this.reloadPage();
          
          return of(false);
        } else if (error.status === 403) {
          console.log(error);
          this.router.navigate(['/home']);
          return of(false);
        } else {
          console.log(error);
          this.router.navigate(['/home']);
          return of(false);
        } 
      })
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}