import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../_services/task.service';
import { Task } from '../../_models/task.module';
import { UserService } from '../../_services/user.service';
import { ClientService } from '../../_services/client.service';
import { TagService } from '../../_services/tag.service';
import { User } from '../../_models/user.module';
import { Client } from '../../_models/client.module';
import { Tag } from '../../_models/tag.module';
import { ConfirmationService, Footer, PrimeTemplate, } from 'primeng/api';
import { Status } from '../../_models/status.module';
import { StatusService } from '../../_services/status.service';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconProfileComponent } from '../../share/icon-profile/icon-profile.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { NgIf, NgFor, NgStyle, NgClass, DatePipe } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonDirective, Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  currentTask: Task;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private statusService: StatusService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags;
    });
    this.statusService.getAllStatuses().subscribe((data) => {
      this.statuses = data;
    });
  }

  getTasks(): void {
    this.taskService.getAllTasks().subscribe((allTasks: Task[]) => {
      this.tasks = allTasks;
    });
  }

  categorizeTasks(status: Status): Task[] {
    return this.tasks.filter((task) => {
      { return task.status && task.status.name === status.name; }
    });
  }

  searchTask(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredTasks = [];
    } else {
      this.filteredTasks = this.tasks.filter((task) => {
        task!.taskName != undefined ?
          task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())
          : false
      });
    }
  }

  showConfirmation(): void {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח שברצונך למחוק משימה זו?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask();
      },
      reject: () => {
        console.log('cancel start');
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

  editTask() {
    this.router.navigate(['/taskSpe', this.currentTask._id]);
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
      ).map((task) => ({ taskName: task.taskName }));
  }

  searchTags(event: any): void {
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags.filter((tag) =>
        tag['text'].toLowerCase().includes(event.query.toLowerCase())
      );
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
      return (
        deadlineMatch && clientMatch && userMatch && taskNameMatch && tagsMatch
      );
    });
  }

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
        const dateA = new Date(a.deadline).getTime();
        const dateB = new Date(b.deadline).getTime();
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
    this.currentTask = task;
  }
}
