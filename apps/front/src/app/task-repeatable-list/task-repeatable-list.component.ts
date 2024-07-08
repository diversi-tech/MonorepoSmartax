import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ConfirmationService, Footer, MessageService, PrimeTemplate } from 'primeng/api';
import { Tag } from '../_models/tag.module';
import {Task} from '../_models/task.module'
import { Client } from '../_models/client.module';
import { Status } from '../_models/status.module';
import { User } from '../_models/user.module';
import { ClientService } from '../_services/client.service';
import { StatusService } from '../_services/status.service';
import { TagService } from '../_services/tag.service';
import { TaskService } from '../_services/task.service';
import { UserService } from '../_services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonDirective, Button } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';

@Component({
  selector: 'app-task-repeatable-list',
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
  templateUrl: './task-repeatable-list.component.html',
  styleUrl: './task-repeatable-list.component.css',
})
export class TaskRepeatableListComponent {
  statuses: Status[] = []

  tasks: Task[] = [];
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedTask!: Task;

  searchTerm: string = '';

  showFilter: boolean = false;

  filter: {
    deadlineRange: [Date, Date] | null;
    client: Client | null;
    user: User | null;
    task: Task | null;
    tags: Tag[];
  } = {
      deadlineRange: null,
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


  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private statusService: StatusService

  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags
    })
    this.statusService.getAllStatuses().subscribe(
      data => {
        this.statuses = data
        console.log(this.statuses);
      }
    )
  }

  getTasks(): void {
    this.taskService.getAllTasks().subscribe((allTasks: Task[]) => {
      this.tasks = allTasks;
      console.log(this.tasks);
    });
  }

  categorizeTasks(status: Status): Task[] {
    // console.log('Tasks before filtering:', this.tasks); // דוגמה להדפסה לצורך בדיקה
    return this.tasks.filter(task => {
      // console.log('Task status:', task.status); // הדפסת המצב של המשימה
     {return task.status && task.status.name === status.name;}
    });
  }

  searchTask(): void {
    console.log(typeof this.searchTerm);

    if (this.searchTerm.trim() === '') {
      this.filteredTasks = [];

    } else {
      this.filteredTasks = this.tasks.filter(task =>
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
        this.deleteTask(this.selectedTask)
      },
      reject: () => {
        console.log('cancel start');
        // Add the code to close the pop-up here
      }
    })
  }
  confirmDelete(task: Task): void {
    this.deleteTask(task);
  }


  deleteTask(task: Task): void {
    this.taskService.deleteTask(task._id!).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== task._id);
        // this.categorizeTasks();
        this.reloadPage();
      },
      error: err => console.error('Error deleting task: ', err)
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  cancelDelete(): void {
    this.confirmationService.close()
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  searchClients(event: any): void {
    this.clientService.getAllClients().subscribe((clients: Client[]) => {
      this.clientSuggestions = clients.filter(client => client["name"].toLowerCase().includes(event.query.toLowerCase()));
    });
  }

  searchUsers(event: any): void {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.userSuggestions = (users.filter(user => user["userName"].toLowerCase().includes(event.query.toLowerCase())))
    });
  }

  searchTasks(event: any): void {
    const query = event.query.toLowerCase().toLowerCase();
    this.taskSuggestions = this.tasks
      .filter(task => task.taskName.toLowerCase().includes(query.toLowerCase()))
      .map(task => ({ taskName: task.taskName }));
  }

  searchTags(event: any): void {
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags.filter(tag => tag['text'].toLowerCase().includes(event.query.toLowerCase()));
      // this.filter.tags = tags;
    });
  }

  applyFilter() {
    this.filteredTasks = this.tasks.filter(task => {
      const deadlineMatch = !this.filter.deadlineRange ||
        (task.dueDate >= this.filter.deadlineRange[0] && task.dueDate <= this.filter.deadlineRange[1]);

      const clientMatch = !this.filter.client || task.client.name.includes(this.filter.client.name);

      const userMatch = !this.filter.user || task.assignedTo.userName.includes(this.filter.user.userName);

      const taskNameMatch = !this.filter.task || task.taskName.includes(this.filter.task.taskName);

      let tagsMatch = true;
      if (this.filter.tags && this.filter.tags.length > 0) {
        tagsMatch = this.filter.tags.every(filterTag => {
          return task.tags.some(taskTag => taskTag.text.includes(filterTag.text));
        });
      }
      console.log(deadlineMatch, clientMatch, userMatch, taskNameMatch, tagsMatch);


      return deadlineMatch && clientMatch && userMatch && taskNameMatch && tagsMatch;
    });
  }
}
