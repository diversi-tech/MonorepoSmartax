import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ClientType } from '../../../_models/clientType.module';
import { ClientTypeService } from '../../../_services/clientType.service';
import { TaskService } from '../../../_services/task.service';
import { Task } from '../../../_models/task.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TypeClientCreateComponent } from '../type-client-edit-create/type-client-create.component';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-type',
  templateUrl: './client-type.component.html',
  styleUrls: ['./client-type.component.css'],
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    NgIf,
    NgForOf,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TypeClientCreateComponent,
    AvatarModule,
    RouterLink,
    TooltipModule,
  ],
})
export class ClientTypeComponent implements OnInit {
  clientTypes: ClientType[] = [];
  selectedClientType: ClientType; // No need to initialize here
  tasks: Task[] = [];
  selectedTasks: Task[] = [];

  constructor(
    private clientTypeService: ClientTypeService,
    private primengConfig: PrimeNGConfig,
    private taskService: TaskService,
    private confirmationService: ConfirmationService // private location:Location
  ) {}

  displayDialog: boolean = false;
  selectedType: ClientType | null = null;
  displayDeleteDialog: boolean = false;
  selectedDeleteType: ClientType | null = null;
  // newClient: ClientType;
  newC: boolean = false;
  create : boolean = false;

  showDialog(type: ClientType) {
    this.selectedType = type;
    console.log(this.selectedType);
    this.newC = !type;
    this.displayDialog = true;
  }

  confirmDelete(type: ClientType) {
    this.selectedDeleteType = type;
    this.displayDeleteDialog = true;
  }

  deleteType() {
    if (this.selectedDeleteType) {
      this.clientTypeService
        .deleteClientType(this.selectedDeleteType?._id)
        .subscribe({
          next: (data) => {
            console.log(data);
            Swal.fire('הסוג נמחק בהצלחה', '', 'success');
          },
          error: (err) => {
            console.log(err);
          },
        });
      // this.loadAllClientTypes();
      const index = this.clientTypes.indexOf(this.selectedDeleteType);
      if (index !== -1) {
        this.clientTypes.splice(index, 1);
      }
    }
    this.cancelDelete();
  }

  cancelDelete() {
    this.displayDeleteDialog = false;
    this.selectedDeleteType = null;
  }
  ngOnInit(): void {
    this.primengConfig.ripple = true; // Enable Ripple effect globally
    this.loadAllClientTypes();
    this.loadAllTasks();
    //init new client
    // this.newClient.name = '';
    // this.newClient.tasks = [];
    // this.newClient.fields = [];
  }

  loadAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe((clientTypes) => {
      this.clientTypes = clientTypes;
    });
    
  }

  loadAllTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(JSON.stringify(this.tasks));
    });
  }

  filterTask(value: string): void {
    const task = this.tasks.find((task) => task._id === value);
    if (task) {
      this.selectedTasks.push(task);
    }
  }

  showDetails(): void {
    this.selectedTasks = []; // Clear existing tasks
    if (this.selectedClientType && this.selectedClientType.tasks) {
      for (const taskId of this.selectedClientType.tasks) {
        this.filterTask(taskId);
      }
    }
    console.log(JSON.stringify(this.selectedTasks));
  }

  onAvatarClick() {
    console.log('Avatar clicked');
    // כאן תוכל להוסיף את הפעולה הרצויה בעת לחיצה על ה-avatar
    this.newC = true;
    // this.create = true;
    this.displayDialog = true;
  }

  handleCloseDialog() {
    this.displayDialog = false;
  }

  handleDataUpdated() {
    this.loadAllClientTypes();
  }
  
}
