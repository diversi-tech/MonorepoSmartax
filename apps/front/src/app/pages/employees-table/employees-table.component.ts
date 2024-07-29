import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.module';
import { Role } from '../../_models/role.module';
import { RoleServiceService } from '../../_services/role-service.service';
import { ConfirmationService, MessageService, Footer, PrimeTemplate } from 'primeng/api';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonDirective, Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgClass, NgIf } from '@angular/common';

interface Product {
  name: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css',
  standalone: true,
  imports: [ConfirmDialogModule, Footer, ButtonDirective, TableModule, PrimeTemplate, Button, NgIf, NgClass]
})
export class EmployeesTableComponent implements OnInit {

  users: User[] = [];
  allRoles: Role[] = [];
  selectedUser!: User;
  confirmationKey: string = 'deleteConfirmation'; // מפתח לאישור המחיקה
  currentUser: User;


  constructor(
    private userService: UserService,
    private roleService: RoleServiceService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log('Failed to fetch users:', error);
      }
    );
  }

  loadRoles(): void {
    this.roleService.getAllRolies().subscribe(
      (data) => {
        this.allRoles = data;
      },
      (error) => {
        console.log('Failed to fetch roles:', error);
      }
    );
  }

  showConfirmation(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete start');
        this.deleteUser()
      },
      reject: () => {
        console.log('cancel start');
        // Add the code to close the pop-up here
      }
    })
  }


  cancelDelete(): void {
    this.confirmationService.close()
  }

  confirmDelete(): void {
    this.deleteUser();
  }

  deleteUser(): void {
    console.log(this.currentUser);

    this.userService.deleteUser(this.currentUser._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully.' });
        this.loadUsers(); // Reload users after deletion
        this.confirmationService.close()

      },
      (error) => {
        console.log('Failed to delete user:', error);
      }
    );
  }

  editDetails(): void {
    const user = this.currentUser;
    this.router.navigate(['/register/edit'], { state: { user } });
  }

  addUser(): void {
    this.router.navigate(['/register/register']);
  }

  selectCurrentUser(user: User) {
    this.currentUser = user;
  }
}
