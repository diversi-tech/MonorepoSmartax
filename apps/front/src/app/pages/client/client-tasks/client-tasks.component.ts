import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
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
import { ConfirmationService, Footer, PrimeTemplate } from 'primeng/api';
import { StatusService } from '../../../_services/status.service';
import { Status } from '../../../_models/status.module';
import { Button, ButtonDirective, ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IconProfileComponent } from '../../../share/icon-profile/icon-profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-client-tasks',
  standalone: true,
  templateUrl: './client-tasks.component.html',
  styleUrl: './client-tasks.component.css',
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
    ButtonModule,
  ],
})

export class ClientTasksComponent implements OnInit {

  // statuses: Status[] = [];
  // tasks: Task[] = [];
  // client: Client | null = null;
  // displayDialog: boolean = false;
  // toDoTasks: Task[] = [];
  // inProgressTasks: Task[] = [];
  // doneTasks: Task[] = [];
  // filteredTasks: Task[] = [];
  // selectedTask!: Task;
  // searchTerm: string = '';
  // showFilter: boolean = false;
  // clientSuggestions: Client[] = [];
  // userSuggestions: User[] = [];
  // taskSuggestions: any[] = [];
  // tagSuggestions: Tag[] = [];
  // display: any;
  // filterFirstStatus = true;
  // currentTask: Task;


  // filter: {
  //   deadline: Date | null;
  //   client: Client | null;
  //   user: User | null;
  //   task: Task | null;
  //   tags: Tag[];
  // } = {
  //     deadline: null,
  //     client: null,
  //     user: null,
  //     task: null,
  //     tags: []
  //   };



  // constructor(
  //   private router: Router,
  //   private taskService: TaskService,
  //   private userService: UserService,
  //   private clientService: ClientService,
  //   private tagService: TagService,
  //   private confirmationService: ConfirmationService,
  //   private statusService: StatusService
  // ) { }

  // ngOnInit(): void {
  //   this.client = history.state.client;
  //   this.getTasks();
  //   this.tagService.getAllTags().subscribe((tags: Tag[]) => {
  //     this.tagSuggestions = tags;
  //   });
  //   this.statusService.getAllStatuses().subscribe((data) => {
  //     this.statuses = data;
  //   });
  // }


  // editTask() {
  //   this.router.navigate(['/taskSpe', this.currentTask._id]);
  // }

  createTask() {
    this.router.navigate(['/taskSpe', 'create'],{ queryParams: { client: this.client._id } });
  }

  // client: Client | null = null;
  // getTasksByClientId(): void {
  //   this.taskService.getTasksByClientId(this.client._id).subscribe(
  //     (data) => {
  //       this.tasks = data;
  //     },
  //     (error) => {
  //       console.log('Failed to fetch users:', error);
  //     })
  // }


  // categorizeTasks(status: Status): Task[] {
  //   return this.tasks.filter((task) => {
  //     return task.status && task.status.name === status.name;
  //   });
  // }

  // searchTask(): void {
  //   if (this.searchTerm.trim() === '') {
  //     this.filteredTasks = [];
  //   } else {
  //     this.filteredTasks = this.tasks.filter((task) =>
  //       task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  // }

  // showConfirmation(): void {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete this task?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.deleteTask();
  //     },
  //     reject: () => {
  //     },
  //   });
  // }
  // confirmDelete(): void {
  //   this.deleteTask();
  // }

  // deleteTask(): void {
  //   this.taskService.deleteTask(this.currentTask._id!).subscribe({
  //     next: () => {
  //       this.reloadPage();
  //     },
  //     error: (err) => console.error('Error deleting task: ', err),
  //   });
  // }

  // reloadPage(): void {
  //   window.location.reload();
  // }

  // cancelDelete(): void {
  //   this.confirmationService.close();
  // }

  // toggleFilter(): void {
  //   this.showFilter = true;
  // }

  // searchClients(event: any): void {
  //   this.clientService.getAllClients().subscribe((clients: Client[]) => {
  //     this.clientSuggestions = clients.filter(client => client.firstName && client["firstName"].toLowerCase().includes(event.query.toLowerCase()));
  //   });
  // }

  // searchUsers(event: any): void {
  //   this.userService.getAllUsers().subscribe((users: any[]) => {
  //     this.userSuggestions = users.filter(
  //       (user) =>
  //         user.userName &&
  //         user['userName'].toLowerCase().includes(event.query.toLowerCase())
  //     );
  //   });
  // }

  // searchTasks(event: any): void {
  //   const query = event.query.toLowerCase().toLowerCase();
  //   this.taskSuggestions = this.tasks
  //     .filter((task) =>
  //       task.taskName.toLowerCase().includes(query.toLowerCase())
  //     ).map((task) => ({ taskName: task.taskName }));
  // }

  // searchTags(event: any): void {
  //   this.tagService.getAllTags().subscribe((tags: Tag[]) => {
  //     this.tagSuggestions = tags.filter((tag) =>
  //       tag['text'].toLowerCase().includes(event.query.toLowerCase())
  //     );
  //   });
  // }

  // applyFilter() {
  //   this.filteredTasks = this.tasks.filter((task) => {
  //     this.filterFirstStatus = false;

  //     const deadlineMatch = !this.filter.deadline || new Date(task.deadline) <= new Date(this.filter.deadline);

  //     const clientMatch = !this.filter.client || (task.client && task.client.firstName && task.client.firstName.includes(this.filter.client.firstName));

  //     const userMatch = !this.filter.user || task.assignedTo[0].userName.includes(this.filter.user.userName);

  //     const taskNameMatch = !this.filter.task || task.taskName.includes(this.filter.task.taskName);
  //     let tagsMatch = true;
  //     if (this.filter.tags && this.filter.tags.length > 0) {
  //       tagsMatch = this.filter.tags.every((filterTag) => {
  //         return task.tags.some((taskTag) =>
  //           taskTag.text.includes(filterTag.text)
  //         );
  //       });
  //     }
  //     return (
  //       deadlineMatch && clientMatch && userMatch && taskNameMatch && tagsMatch
  //     );
  //   });
  // }

  // sortTasks(field: string, list: Task[], reverse: boolean) {
  //   list.sort((a, b) => {
  //     if (field === 'taskName') {
  //       return reverse ? b.taskName.localeCompare(a.taskName) : a.taskName.localeCompare(b.taskName);
  //     }
  //     if (field === 'assignedTo') {
  //       const nameA = a.assignedTo.map(user => user.userName).join(', ');
  //       const nameB = b.assignedTo.map(user => user.userName).join(', ');
  //       return reverse ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
  //     }
  //     if (field === 'dueDate') {
  //       const dateA = new Date(a.dueDate).getTime();
  //       const dateB = new Date(b.dueDate).getTime();
  //       return reverse ? dateB - dateA : dateA - dateB;
  //     }
  //     if (field === 'tags') {
  //       const tagsA = a.tags.map(tag => tag.text).join(', ');
  //       const tagsB = b.tags.map(tag => tag.text).join(', ');
  //       return reverse ? tagsB.localeCompare(tagsA) : tagsA.localeCompare(tagsB);
  //     }
  //     return 0;
  //   });
  // }

  // selectCurrentTask(task: Task) {
  //   this.currentTask = task;
  // }

  // 2
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

  client: Client | null = null;
  

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private statusService: StatusService,
    private router: Router,
  ) {  }

  ngOnInit(): void {
    this.client = history.state.client;
    this.getTasksByClientId();
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tagSuggestions = tags;
    });
    this.statusService.getAllStatuses().subscribe((data) => {
      this.statuses = data;
    });
  }

  // getTasks(): void {
  //   this.taskService.getAllTasks().subscribe((allTasks: Task[]) => {
  //     this.tasks = allTasks;
  //   });
  // }

  getTasksByClientId(): void {
    this.taskService.getTasksByClientId(this.client._id).subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.log('Failed to fetch users:', error);
      })
  }

  categorizeTasks(status: Status): Task[] {
    return this.tasks.filter((task) => {
      { return task.status && task.status.name === status.name; }
    });
  }

  searchTask(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredTasks = [];
      alert("לחיפוש משימה אנא הקלידו את שם המשימה")
    } else {
      this.filteredTasks = [];
      this.searchTerm.trim()
      this.searchTerm.toLowerCase()
      this.tasks.forEach(t => {
        if (t.taskName! && t.taskName.toLowerCase()?.includes(this.searchTerm))
          this.filteredTasks.push(t);
      });
      if (this.filteredTasks.length == 0) {
        alert("לא נמצאות משימות בשם זה")
      }
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
    const query = event.query.toLowerCase();
    this.taskSuggestions = this.tasks!
      .filter((task) =>
        (task.taskName?.toLowerCase())?.includes(query.toLowerCase())
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
    this.tasks.forEach((task) => {
      this.filterFirstStatus = false;

      const deadlineMatch = !this.filter.deadline || new Date(task.deadline) <= new Date(this.filter.deadline);

      const clientMatch = !this.filter.client || (task.client && task.client.firstName && task.client.firstName.includes(this.filter.client.firstName));

      const userMatch = !this.filter.user || task.assignedTo[0].userName.includes(this.filter.user.userName);
      const taskNameMatch = !this.filter.task || task.taskName!.toLowerCase()!.includes(this.filter.task.taskName.trim().toLowerCase());
      let tagsMatch = true;

      if (this.filter.tags && this.filter.tags.length > 0) {
        tagsMatch = this.filter.tags.every((filterTag) => {
          return task.tags.some((taskTag) =>
            taskTag.text.includes(filterTag.text)
          );
        });
      }

      if (deadlineMatch && clientMatch && userMatch && taskNameMatch && tagsMatch)
        this.filteredTasks.push(task);
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
