import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Role } from '../../_models/role.module';
import { TokenService } from '../../_services/token.service';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { HashPasswordService } from '../../_services/hash-password.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { log } from 'util';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, RouterOutlet]
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
    
    // העברת פונקציית ההתחברות לשירות
    this.authService.setCredentialResponseHandler(this.handleCredentialResponse.bind(this));
    
    this.authService.initGoogleAuth();
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        if (data) {
          this.tokenService.saveToken(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = this.tokenService.getCurrentDetail("role").name;
          this.reloadPage();
        }
      },
      error: err => {
        this.errorMessage = err.status === 404 || err.status === 401 
          ? "אחד מהנתונים שהזנת שגוי, אנא נסה שנית" 
          : "שגיאת מערכת, אנא נסה שנית";
        this.isLoginFailed = true;
      }
    });
  }

  handleCredentialResponse(email: string, password: string): void {
    // קריאה לפונקציית ההתחברות עם פרטי המשתמש שהתקבלו מ-Google
    this.form.email = email;
    this.form.password = password;
    this.onSubmit();
  }

  forgotPassword() {
    this.forgot = true;
  }

  reloadPage(): void {
    window.location.reload();
  }

  signInWithGoogle(): void {
    this.authService.signIn();
  }
}
