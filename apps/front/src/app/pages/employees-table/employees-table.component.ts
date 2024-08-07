import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user.module';
import { Role } from '../../_models/role.module';
import { RoleServiceService } from '../../_services/role-service.service';
import { ConfirmationService, MessageService, Footer, PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';

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
  imports: [
    ConfirmDialogModule,
    Footer,
    ButtonDirective,
    TableModule,
    PrimeTemplate,
    Button,
    NgIf,
    NgClass
  ]
})

export class EmployeesTableComponent implements OnInit {

  users: User[] = [];
  allRoles: Role[] = [];
  selectedUser!: User;
  confirmationKey: string = 'deleteConfirmation';
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
      message: 'האם אתה בטוח שברצונך למחוק משתמש זה?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser()
      },
      reject: () => {
        console.log('cancel start');
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