import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../_models/role.module';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { RoleServiceService } from '../../_services/role-service.service';
import { NgClass } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [FormsModule, DropdownModule, NgClass]
})
export class RegisterComponent implements OnInit {
  allRolies: Role[] = [];
  type: string = "";
  form: any = {
    username: '',
    email: '',
    role: ''
  };

  constructor(
    public ar: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private roleService: RoleServiceService
  ) { }

  ngOnInit(): void {
    this.ar.params.subscribe(
      data => {
        this.type = data['type'];
        this.roleService.getAllRolies().subscribe(
          suc => {
            this.allRolies = suc;
            this.setForm()

          },
          err => console.log(err)
        );
      }
    );
  }

  setRole(roleName: string) {

    this.form.role = this.allRolies.find(role => role.name === roleName) || null;
  }
  
  setForm() {
    if (this.type === 'edit' && history.state.user) {
      this.form.username = history.state.user.userName;
      this.form.email = history.state.user.email;
      this.setRole(history.state.user.role.name);
      console.log(history.state.user);
      console.log(this.form);
    }
    else {
      this.form.username = ''
      this.form.email = ''
      this.form.role.option = this.allRolies
    }
  }

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';



  onSubmit(): void {


    const { username, email, role } = this.form;
    console.log(username, email);
    if (this.type === 'register') {
      this.userService.register(username, email, role).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
    else {
      this.userService.update(history.state.user._id, this.form.username, this.form.email, history.state.user.passwordHash, this.form.role, history.state.user.favorites).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });

    }
  }
}
