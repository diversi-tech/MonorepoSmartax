import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { StorageService } from '../../_services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../_services/token.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrl: './restart-password.component.css',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ]
})

export class RestartPasswordComponent {
  form: any = {
    password: null,
    passwordAuthentication: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  email: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.email = this.routeActive.snapshot.paramMap.get('email')!;
  }

  onSubmit(): void {
    if (this.form.password !== this.form.passwordAuthentication) {
      this.isLoginFailed = true;
      this.errorMessage = "הסיסמאות אינן תואמות";
    }
    else {
      this.userService.changPassword(this.form.password, this.email).subscribe(
        success => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'success to change password',
            timer: 4000,
            showConfirmButton: false,
          });
          this.router.navigate(['/home']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'error to change password, please try again',
            timer: 4000,
            showConfirmButton: false,
          });
          this.router.navigate(['/home']);
        }
      )
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}