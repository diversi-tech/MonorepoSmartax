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
import { log } from 'util';
declare global {
  interface Window {
    google: any;
  }
}

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
  imports: [FormsModule, NgClass, NgIf, RouterOutlet, NgClass]
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

        // this.router.navigate(['/home'])
      },
      error: err => {
        if (err.status === 404||err.status === 401) {
          this.errorMessage = "אחד מהנתונים שהזנת שגוי, אנא נסה שנית";

        } else {
          
          this.errorMessage = "שגיאת מערכת, אנא נסה שנית";

        }

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


// loadGoogleApi(): void {
//   const script = document.createElement('script');
//   script.src = 'https://accounts.google.com/gsi/client';
//   script.async = true;
//   script.defer = true;
//   script.onload = () => this.initGoogleOneTap();
//   script.onerror = (error) => console.error('Failed to load Google API script:', error);
//   document.body.appendChild(script);
// }

// initGoogleOneTap(): void {
//   console.log("Checking Google API availability...");
//   if (window.google && window.google.accounts && window.google.accounts.id) {
//     console.log("Google API is available.");
//     window.google.accounts.id.initialize({
//       client_id: "450626878965-7r8nl14gj5eh5h4lfb1qs2d4kfkvq15l.apps.googleusercontent.com",
//       callback: (response: any) => this.handleCredentialResponse(response)
//     });
//     window.google.accounts.id.prompt();
//     console.log("Prompt should be displayed.");
//   } else {
//     console.error("Google accounts.id API not loaded.");
//   }
// }



// handleCredentialResponse(response: any): void {
//   console.log("handleCredentialResponse called");
//   if (response && response.credential) {
//     const idToken = response.credential;
//     console.log("ID Token:", idToken);
//     const decodedToken = this.parseJwt(idToken);
//     console.log("Decoded Token:", decodedToken);
//     const email = decodedToken.email;
//     const userName = decodedToken.name;
//     console.log("Email:", email);
//     console.log("UserName:", userName);
//   } else {
//     console.error("No credential found in response or response is invalid");
//   }
// }


// parseJwt(token: string) {
//   console.log("parseJwt called");
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
//   } catch (e) {
//     console.error("Error parsing JWT:", e);
//     return {};
//   }
// }
// }



signInWithGoogle(): void {
  this.authService.signIn();
}


}