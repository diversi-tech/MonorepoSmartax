import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { TokenService } from '../../_services/token.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-restart-password',
    templateUrl: './restart-password.component.html',
    styleUrl: './restart-password.component.css',
    standalone: true,
    imports: [FormsModule, NgClass]
})
export class RestartPasswordComponent {
  form: any = {
    password: null,
    passwordAuthentication: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // roles: string[] = [];


  constructor(private storageService: StorageService, private userService: UserService, private router: Router, private tokenService:TokenService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getToken().roles;
    }
  }

  onSubmit(): void {


    if (this.form.password !== this.form.passwordAuthentication) {
      this.isLoginFailed = true;
      this.errorMessage = "Passwords do not match";
    }
    else {

      this.userService.changPassword(this.form.password).subscribe(
        newToken => {
          if (newToken && newToken.token) {
            this.tokenService.saveToken(newToken.token);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.router.navigate(['/home'])
          }
        },
        error => {
          alert('Failed to change password');

        }
      )
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
