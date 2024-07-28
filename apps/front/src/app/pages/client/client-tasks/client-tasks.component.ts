import { Component, NgModule, NgModuleRef, OnInit } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Client } from '../../../_models/client.module';
import { TaskService } from '../../../_services/task.service';
import { Task } from '../../../_models/task.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { User } from '../../../_models/user.module';
import { Tag } from '../../../_models/tag.module';
import { UserService } from '../../../_services/user.service';
import { ClientService } from '../../../_services/client.service';
import { TagService } from '../../../_services/tag.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StatusService } from '../../../_services/status.service';
import { Status } from '../../../_models/status.module';
import { FormsModule, } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-tasks',
  standalone: true,
  templateUrl: './client-tasks.component.html',
  styleUrl: './client-tasks.component.css',
  imports: [
    CommonModule,
    ConfirmDialogModule,
    SidebarModule,
    FormsModule,
    ButtonModule,
    PanelModule,
    TableModule,
    NgTemplateOutlet,
  ],
})
export class ClientTasksComponent implements OnInit {

  statuses: Status[] = [];
  tasks: Task[] = [];
  client: Client | null = null;
  displayDialog: boolean = false;
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedTask!: Task;
  searchTerm: string = '';
  showFilter: boolean = false;
  clientSuggestions: Client[] = [];
  userSuggestions: User[] = [];
  taskSuggestions: any[] = [];
  tagSuggestions: Tag[] = [];
  display: any;
  filterFirstStatus = true;
  currentTask: Task;


  filter: {
    deadline: Date | null;
    client: Client | null;
    user: User | null;
    task: Task | null;
    tags: Tag[];
  } = {
      deadline: null,
      client: null,
      user: null,
      task: null,
      tags: []
    };



  constructor(
    private router: Router,
    private taskService: TaskService,
    private userService: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.getTasks();
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags;
    });
    this.statusService.getAllStatuses().subscribe((data) => {
      this.statuses = data;
      console.log(this.statuses);
    });
  }


editTask(){
  debugger
  this.router.navigate(['/taskSpe', this.currentTask._id]);
}

createTask(){
  this.router.navigate(['/taskSpe', 'create']);
}


  getTasks(): void {
    debugger
    console.log(this.client._id)
    this.taskService.getTasksByClientId(this.client._id).subscribe(
      (data) => {
        console.log(data);
        this.tasks = data;
        console.log("gettasks", this.tasks);
      },
      (error) => {
        console.log('Failed to fetch users:', error);
      })
    //   this.filteredTasks = this.tasks;
  }


  categorizeTasks(status: Status): Task[] {
    console.log(status.name)
    console.log('Tasks before filtering:', this.tasks); // דוגמה להדפסה לצורך בדיקה
    return this.tasks.filter((task) => {
      console.log('Task status:', task.status); // הדפסת המצב של המשימה
      return task.status && task.status.name === status.name;
    });
  }

  searchTask(): void {
    console.log(typeof this.searchTerm);

    if (this.searchTerm.trim() === '') {
      this.filteredTasks = [];
    } else {
      this.filteredTasks = this.tasks.filter((task) =>
        task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log('filter: ', this.filteredTasks);
    }
  }

  showConfirmation(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete start');
        this.deleteTask();
      },
      reject: () => {
        console.log('cancel start');
        // Add the code to close the pop-up here
      },
    });
  }
  confirmDelete(): void {
    this.deleteTask();
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.currentTask._id!).subscribe({
      next: () => {
        this.reloadPage();
      },
      error: (err) => console.error('Error deleting task: ', err),
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  cancelDelete(): void {
    this.confirmationService.close();
  }

  toggleFilter(): void {
    debugger
    this.showFilter = true;
  }

  searchClients(event: any): void {
    this.clientService.getAllClients().subscribe((clients: Client[]) => {
      this.clientSuggestions = clients.filter(client => client.firstName && client["firstName"].toLowerCase().includes(event.query.toLowerCase()));
    });
  }

  searchUsers(event: any): void {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.userSuggestions = users.filter(
        (user) =>
          user.userName &&
          user['userName'].toLowerCase().includes(event.query.toLowerCase())
      );
    });
  }

  searchTasks(event: any): void {
    const query = event.query.toLowerCase().toLowerCase();
    this.taskSuggestions = this.tasks
      .filter((task) =>
        task.taskName.toLowerCase().includes(query.toLowerCase())
      )
      .map((task) => ({ taskName: task.taskName }));
  }

  searchTags(event: any): void {
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags.filter((tag) =>
        tag['text'].toLowerCase().includes(event.query.toLowerCase())
      );
      // this.filter.tags = tags;
    });
  }

  applyFilter() {
    this.filteredTasks = this.tasks.filter((task) => {
      this.filterFirstStatus = false;

      const deadlineMatch = !this.filter.deadline || new Date(task.deadline) <= new Date(this.filter.deadline);

      const clientMatch = !this.filter.client || (task.client && task.client.firstName && task.client.firstName.includes(this.filter.client.firstName));

      const userMatch = !this.filter.user || task.assignedTo[0].userName.includes(this.filter.user.userName);

      const taskNameMatch = !this.filter.task || task.taskName.includes(this.filter.task.taskName);
      let tagsMatch = true;
      if (this.filter.tags && this.filter.tags.length > 0) {
        tagsMatch = this.filter.tags.every((filterTag) => {
          return task.tags.some((taskTag) =>
            taskTag.text.includes(filterTag.text)
          );
        });
      }

      console.log(deadlineMatch, clientMatch, userMatch, taskNameMatch, tagsMatch);

      return (
        deadlineMatch && clientMatch && userMatch && taskNameMatch && tagsMatch
      );
    });
  }
  // sort
  // בקומפוננטה שלך
  // sortTasks(field: string, list: Task[], reverse: boolean) {
  //   // debugger
  //   console.log(this.filteredTasks);

  //   list.sort((a, b) => {
  //     // כאן אתה יכול להוסיף לוגיקה למיון על פי השדה שנבחר
  //     if (field === 'taskName') {
  //       if (reverse) {
  //         return b.taskName.localeCompare(a.taskName);
  //       }
  //       return a.taskName.localeCompare(b.taskName); // מיון לפי שם המשימה
  //     }
  //     if (field === 'assignedTo') {
  //       if (reverse) {
  //         return b.assignedTo.length - a.assignedTo.length;
  //       }
  //       return a.assignedTo.length - b.assignedTo.length; 
  //     }
  //     if (field === 'dueDate') {
  //       if (reverse) {
  //         return new Date(b.dueDate).getDate() - new Date(a.dueDate).getDate();
  //       }
  //       return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate(); // מיון לפי תאריך יעד
  //     }
  //     if (field === 'tags') {
  //       if (reverse) {
  //         return b.tags.length - a.tags.length;
  //       }
  //       return a.tags.length - b.tags.length; // מיון לפי מספר התגיות של המשימה
  //     }
  //     return 0; // במקרה שלא נמצא שדה תואם
  //   });
  // }

  sortTasks(field: string, list: Task[], reverse: boolean) {
    list.sort((a, b) => {
      if (field === 'taskName') {
        return reverse ? b.taskName.localeCompare(a.taskName) : a.taskName.localeCompare(b.taskName);
      }
      if (field === 'assignedTo') {
        const nameA = a.assignedTo.map(user => user.userName).join(', ');
        const nameB = b.assignedTo.map(user => user.userName).join(', ');
        return reverse ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
      }
      if (field === 'dueDate') {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return reverse ? dateB - dateA : dateA - dateB;
      }
      if (field === 'tags') {
        const tagsA = a.tags.map(tag => tag.text).join(', ');
        const tagsB = b.tags.map(tag => tag.text).join(', ');
        return reverse ? tagsB.localeCompare(tagsA) : tagsA.localeCompare(tagsB);
      }
      return 0;
    });
  }

  selectCurrentTask(task: Task) {
    debugger
    this.currentTask = task;
  }
}
