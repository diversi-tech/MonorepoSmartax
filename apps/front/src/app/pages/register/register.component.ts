import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../_models/role.module';
import { UserService } from '../../_services/user.service';
import { RoleServiceService } from '../../_services/role-service.service';
import { NgClass } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    NgClass,
    ButtonModule
  ]
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
    private router: Router,
    public ar: ActivatedRoute,
    private userService: UserService,
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
    console.log(history.state.user);
    
    if (this.type === 'edit' && history.state.user) {
      this.form.username = history.state.user.userName;
      this.form.email = history.state.user.email;
      this.setRole(history.state.user.role.name);
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
    if (this.type === 'register') {
      this.userService.register(username, email, role).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
    else {
      this.userService.update(history.state.user._id, this.form.username, this.form.email, history.state.user.passwordHash, this.form.role, history.state.user.favorites).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/employeesTable']);

        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });

    }
  }
}
