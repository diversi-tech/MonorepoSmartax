import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Role } from '../../_models/role.module';
import { TokenService } from '../../_services/token.service';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { HashPasswordService } from '../../_services/hash-password.service';
import { ForgotPasswordComponent } from '../forget-password/forget-password.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  // standalone:true,
  // imports:[CommonModule, ReactiveFormsModule, BrowserModule,
  //   BrowserModule,
  //   BrowserAnimationsModule,
  //   AppRoutingModule,
  //   FormsModule,
  //   HttpClientModule,
  //   CardModule,
  //   ButtonModule,
  //   ReactiveFormsModule,
  //   InputTextareaModule,
  // ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ForgotPasswordComponent, RouterOutlet]
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  forgot: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: Role | null = null;

  tokenPayload = null

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private hash: HashPasswordService) { }

  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.tokenService.getCurrentDetail("role").name;
      console.log(this.role);

    }

  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        if (data) {
          console.log("token: ", data);

          this.tokenService.saveToken(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = this.tokenService.getCurrentDetail("role").name;
          console.log("role", this.role);


          this.reloadPage();
        }

        // this.router.navigate(['/home'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(err);

        this.isLoginFailed = true;
      }
    });
  }
  forgotPassword() {
    this.forgot = true;
  }
  reloadPage(): void {
    window.location.reload();
  }
}
