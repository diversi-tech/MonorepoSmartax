// import { Component, OnInit } from '@angular/core';
// import { PrimeNGConfig } from 'primeng/api';
// import { ClientType } from '../../../_models/clientType.module';
// import {  FormsModule } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';
// import { ClientTypeService } from '../../../_services/clientType.service';
// import { NgForOf, NgIf } from '@angular/common';
// import { TaskService } from '../../../_services/task.service';
// import { Task } from '../../../_models/task.module';
// @Component({
//   selector: 'app-client-type',
//   templateUrl: './client-type.component.html',
//   styleUrls: ['./client-type.component.css'],
//   standalone:true,
//   imports:[DropdownModule,FormsModule,NgIf,NgForOf],
   
// })
// export class ClientTypeComponent implements OnInit {
  
//   clientTypes: ClientType[] = [];
//   selectedClientType: ClientType ;
//   tasks: Task[] = [];
//   selectedTasks: Task[];
  
//   constructor(
//     private clientTypeService: ClientTypeService,
//     private primengConfig: PrimeNGConfig,
//     private taskService:TaskService
//   ) {}

//   ngOnInit(): void {
//     this.primengConfig.ripple = true; 
//     this.loadAllClientTypes();
//     this.loadAllTasks();
//   }  

//   loadAllClientTypes(): void {
//     this.clientTypeService.getAllClientTypes().subscribe(clientTypes => {
//       this.clientTypes = clientTypes;
//     });
//   }
//   loadAllTasks(): void {
//     this.taskService.getAllTasks().subscribe(tasks => {
//       this.tasks = tasks;
//     });
//   }
//   filterTask(value: string): void {
   
//     if (value !== "") {
//       const query = value;
//       if (!this.selectedTasks) {
//         this.selectedTasks = [];
//       }
//       const task = this.tasks.find(task => task._id === query);
//       if (task) {
//         this.selectedTasks.push(task);
//       }
//     }
//   }

  
//   showDetails(): void {
//     console.log(this.selectedTasks+"&"+JSON.stringify(this.selectedClientType)+"&"+JSON.stringify(this.selectedClientType.fields))
//     this.selectedTasks = []; 
//     if (this.selectedClientType && this.selectedClientType.tasks) {
//       for (const taskId of this.selectedClientType.tasks) {
//         this.filterTask(taskId);
//       }
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ClientType } from '../../../_models/clientType.module';
import { ClientTypeService } from '../../../_services/clientType.service';
import { TaskService } from '../../../_services/task.service';
import { Task } from '../../../_models/task.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';import { FieldManagementComponent } from '../../fieldManagement/fieldManagement.component';

@Component({
  selector: 'app-client-type',
  templateUrl: './client-type.component.html',
  styleUrls: ['./client-type.component.css'],
  standalone:true,
  imports:[DropdownModule,FormsModule,FieldManagementComponent,NgIf,NgForOf],
})
export class ClientTypeComponent implements OnInit {
  
  clientTypes: ClientType[] = [];
  selectedClientType: ClientType; // No need to initialize here
  tasks: Task[] = [];
  selectedTasks: Task[] = [];

  constructor(
    private clientTypeService: ClientTypeService,
    private primengConfig: PrimeNGConfig,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true; // Enable Ripple effect globally
    this.loadAllClientTypes();
    this.loadAllTasks();
  }  

  loadAllClientTypes(): void {
    this.clientTypeService.getAllClientTypes().subscribe(clientTypes => {
      this.clientTypes = clientTypes;
    });
    
  }

  loadAllTasks(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      console.log(JSON.stringify(this.tasks))
    });
  }

  filterTask(value: string): void {
    const task = this.tasks.find(task => task._id === value);
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
    console.log(JSON.stringify(this.selectedTasks))
  }
  
}
