import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../_services/task.service';
import { Task } from '../../_models/task.module';
import { UserService } from '../../_services/user.service';
import { ClientService } from '../../_services/client.service';
import { TagService } from '../../_services/tag.service';
import { User } from '../../_models/user.module';
import { Client } from '../../_models/client.module';
import { Tag } from '../../_models/tag.module';
import {
  Confirmation,
  ConfirmationService,
  MessageService,
  Footer,
  PrimeTemplate,
} from 'primeng/api';
import { Status } from '../../_models/status.module';
import { StatusService } from '../../_services/status.service';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconProfileComponent } from '../../share/icon-profile/icon-profile.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NgIf, NgFor, NgStyle, NgClass, DatePipe } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonDirective, Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
  standalone: true,
  imports: [
    ConfirmDialogModule,
    Footer,
    ButtonDirective,
    SidebarModule,
    NgIf,
    CalendarModule,
    FormsModule,
    AutoCompleteModule,
    PrimeTemplate,
    IconProfileComponent,
    MultiSelectModule,
    Button,
    RouterLink,
    InputTextModule,
    NgFor,
    PanelModule,
    TableModule,
    NgStyle,
    NgClass,
    ToastModule,
    DatePipe,
  ],
})
export class TaskManagementComponent implements OnInit {
  statuses: Status[] = [];

  tasks: Task[] = [];
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedTask!: Task;

  searchTerm: string = '';

  showFilter: boolean = false;

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

  clientSuggestions: Client[] = [];
  userSuggestions: User[] = [];
  taskSuggestions: any[] = [];
  tagSuggestions: Tag[] = [];
  display: any;
  filterFirstStatus = true;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags;
    });
    this.statusService.getAllStatuses().subscribe((data) => {
      this.statuses = data;
      console.log(this.statuses);
    });
  }

  getTasks(): void {
    this.taskService.getAllTasks().subscribe((allTasks: Task[]) => {
      this.tasks = allTasks;
      console.log(this.tasks);
    });
  }

  categorizeTasks(status: Status): Task[] {
    // console.log('Tasks before filtering:', this.tasks); // דוגמה להדפסה לצורך בדיקה
    return this.tasks.filter((task) => {
      // console.log('Task status:', task.status); // הדפסת המצב של המשימה
      { return task.status && task.status.name === status.name; }
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

  showConfirmation(task: Task): void {
    this.selectedTask = task;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete start');
        this.deleteTask(this.selectedTask);
      },
      reject: () => {
        console.log('cancel start');
        // Add the code to close the pop-up here
      },
    });
  }
  confirmDelete(task: Task): void {
    this.deleteTask(task);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id!).subscribe({
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
    this.showFilter = !this.showFilter;
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

      const clientMatch = !this.filter.client || (task.client && task.client.name && task.client.name.includes(this.filter.client.name));

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

      console.log(
        deadlineMatch,
        clientMatch,
        userMatch,
        taskNameMatch,
        tagsMatch
      );

      return (
        deadlineMatch && clientMatch && userMatch && taskNameMatch && tagsMatch
      );
    });
  }
  // sort
  // בקומפוננטה שלך
  sortTasks(field: string, list: Task[], reverse: boolean) {
    // debugger
    console.log(this.filteredTasks);

    list.sort((a, b) => {
      // כאן אתה יכול להוסיף לוגיקה למיון על פי השדה שנבחר
      if (field === 'taskName') {
        if (reverse) {
          return b.taskName.localeCompare(a.taskName);
        }
        return a.taskName.localeCompare(b.taskName); // מיון לפי שם המשימה
      }
      if (field === 'assignedTo') {
        if (reverse) {
          return b.assignedTo.length - a.assignedTo.length;
        }
        return a.assignedTo.length - b.assignedTo.length; 
      }
      if (field === 'dueDate') {
        if (reverse) {
          return new Date(b.dueDate).getDate() - new Date(a.dueDate).getDate();
        }
        return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate(); // מיון לפי תאריך יעד
      }
      if (field === 'tags') {
        if (reverse) {
          return b.tags.length - a.tags.length;
        }
        return a.tags.length - b.tags.length; // מיון לפי מספר התגיות של המשימה
      }
      return 0; // במקרה שלא נמצא שדה תואם
    });
  }
}
