import { Component } from '@angular/core';
import {
  DatePipe,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
} from '@angular/common';
import {
  ConfirmationService,
  Footer,
  MessageService,
  PrimeTemplate,
} from 'primeng/api';
import { Tag } from '../_models/tag.module';
import { Task } from '../_models/task.module';
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
import { Button, ButtonDirective } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';
import { RepeatableTaskService } from '../_services/repeatable.service';
import { RepeatableTask } from '../_models/repeatable.module';
import { Frequency } from '../_models/frequency.module';
import { FrequencyService } from '../_services/frequency.service';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { ProgressBarModule } from 'primeng/progressbar';

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
    TooltipModule,
    AvatarModule,
    ProgressBarModule,
  ],
  templateUrl: './task-repeatable-list.component.html',
  styleUrl: './task-repeatable-list.component.css',
})
export class TaskRepeatableListComponent {
  frequencies: Frequency[] = [];

  tasks: RepeatableTask[] = [];
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  filteredTasks: RepeatableTask[] = [];
  selectedTask!: RepeatableTask;
  progressValue: number = 0;

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
    tags: [],
  };

  clientSuggestions: Client[] = [];
  userSuggestions: User[] = [];
  taskSuggestions: any[] = [];
  tagSuggestions: Tag[] = [];
  display: any;
  filterFirstStatus = true;

  constructor(
    private taskService: RepeatableTaskService,
    private userService: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private frequencyService: FrequencyService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags;
    });
    this.frequencyService.getAllFrequencys().subscribe((data) => {
      this.frequencies = data;
      console.log(this.frequencies);
    });
  }

  getTasks(): void {
    this.taskService
      .getAllRepeatableTasks()
      .subscribe((allTasks: RepeatableTask[]) => {
        this.tasks = allTasks;
        console.log(this.tasks);
        this.progressValue = (this.progressDueDate() / this.tasks.length) * 100;
        console.log(this.progressValue);
      });
  }

  categorizeTasks(f: Frequency): RepeatableTask[] {
    console.log(this.tasks);
    console.log(this.filteredTasks);

    if (this.filteredTasks.length > 0) {
      return this.filteredTasks.filter((task) => {
        {
          return task.frequency && task.frequency.name === f.name;
        }
      });
    } else {
      return this.tasks.filter((task) => {
        {
          return task.frequency && task.frequency.name === f.name;
        }
      });
    }
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

  showConfirmation(task: RepeatableTask): void {
    this.selectedTask = task;
    this.confirmationService.confirm({
      message: '?אתה בטוח רוצה למחוק את המשימה',
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
  confirmDelete(task: RepeatableTask): void {
    this.deleteTask(task);
  }

  deleteTask(task: RepeatableTask): void {
    this.taskService.deleteRepeatableTask(task._id!).subscribe({
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
      this.clientSuggestions = clients.filter(
        (client) =>
          client.firstName &&
          client['firstName'].toLowerCase().includes(event.query.toLowerCase())
      );
    });
  }

  searchUsers(event: any): void {
    console.log(event.query);

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
    this.display = false;
    this.filteredTasks = this.tasks.filter((task) => {
      this.filterFirstStatus = false;

      const deadlineMatch =
        !this.filter.deadlineRange ||
        (new Date(task.dueDate) >= this.filter.deadlineRange[0] &&
          new Date(task.dueDate) <= this.filter.deadlineRange[1]);

      // const clientMatch = !this.filter.client || task.client.firstName.includes(this.filter.client.firstName);
      const clientMatch =
        !this.filter.client ||
        (task.client &&
          task.client.firstName.includes(this.filter.client.firstName));

      // const userMatch = !this.filter.user || task.assignedTo[0].userName.includes(this.filter.user.userName);
      const userMatch =
        !this.filter.user ||
        (task.assignedTo[0] &&
          task.assignedTo[0].userName &&
          task.assignedTo[0].userName.includes(this.filter.user.userName));

      console.log(userMatch);
      console.log(this.filter.user);
      console.log(task.assignedTo[0].userName);

      const taskNameMatch =
        !this.filter.task || task.taskName.includes(this.filter.task.taskName);
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
    console.log(this.filteredTasks);
  }
  // sort
  sortTasks(field: string, list: Task[], reverse: boolean) {
    if (this.filteredTasks.length > 0) list = this.filteredTasks;
    else list = this.tasks;
    list.sort((a, b) => {
      if (field === 'taskName') {
        return reverse
          ? b.taskName.localeCompare(a.taskName)
          : a.taskName.localeCompare(b.taskName);
      }
      if (field === 'assignedTo') {
        const nameA = a.assignedTo.map((user) => user.userName).join(', ');
        const nameB = b.assignedTo.map((user) => user.userName).join(', ');
        return reverse
          ? nameB.localeCompare(nameA)
          : nameA.localeCompare(nameB);
      }
      if (field === 'dueDate') {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return reverse ? dateB - dateA : dateA - dateB;
      }
      if (field === 'tags') {
        const tagsA = a.tags.map((tag) => tag.text).join(', ');
        const tagsB = b.tags.map((tag) => tag.text).join(', ');
        return reverse
          ? tagsB.localeCompare(tagsA)
          : tagsA.localeCompare(tagsB);
      }
      return 0;
    });
  }

  progressDueDate() {
    // const today = new Date();
    // const tasksDueToday = this.tasks.filter(task => new Date(task.dueDate) >= today);
    // return tasksDueToday.length;
    const today = new Date();
    const t = this.tasks.filter((obj) => {
      const objDate = new Date(obj.dueDate);
      return objDate < today;
    });
    return t.length;
  }
  //
  currentTask: RepeatableTask;
  selectCurrentTask(task: RepeatableTask) {
    debugger;
    this.currentTask = task;
  }
}
