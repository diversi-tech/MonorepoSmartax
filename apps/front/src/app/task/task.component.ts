import { GoogleTaskService } from './../_services/google-task.service';
import { PriorityService } from './../_services/priority.service';
import { Priority } from './../_models/priority.module';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClientService } from '../_services/client.service';
import { Client } from '../_models/client.module';
import { TagService } from '../_services/tag.service';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task.module';
import { Tag } from '../_models/tag.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { Status } from '../_models/status.module';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ColorPickerModule } from 'primeng/colorpicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipsModule } from 'primeng/chips';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
// import { UploadDocComponent } from '../pages/client/upload-doc/upload-doc.component';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '../editor/editor.component';
import { UploadDocTaskComponent } from '../upload-doc-task/upload-doc-task.component';
import { DocumentService } from '../_services/document.service';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { StatusService } from '../_services/status.service';
import { GoogleAuthService } from '../_services/google-calendar.service';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { MenuItem } from 'primeng/api';
import { TaskCheckListComponent } from '../task-check-list/task-check-list.component';
import { TabViewModule } from 'primeng/tabview';
import { SubTaskComponent } from '../sub-task/sub-task.component';
import { TimerComponent } from '../timer/timer.component';  // וודא שהנתיב נכון

import { SocketService } from '../_services/socket.service';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { CheckList } from '../_models/checkList.model';
import { CheckListService } from '../_services/checkList.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardModule,
    PanelModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    TagModule,
    ListboxModule,
    MenuModule,
    CalendarModule,
    ChipsModule,
    InputGroupAddonModule,
    InputGroupModule,
    CheckboxModule,
    RadioButtonModule,
    EditorModule,
    FileUploadModule,
    ToastModule,
    ColorPickerModule,
    AutoCompleteModule,
    IconProfileComponent,
    TabMenuModule,
    EditorComponent,
    UploadDocTaskComponent,
    MultiSelectModule,
    DividerModule,
    TaskCheckListComponent,
    TabViewModule,
    SubTaskComponent,
    DialogModule,
    TimerComponent,
  ],
  providers: [DocumentService],
})
export class TaskComponent implements OnInit {
  users: User[] = [];
  clients: Client[] = [];
  listStatus: Status[] = [];
  listPriority: Priority[] = [];
  items: any[] = []; //list of status
  currentTask: Task | undefined;
  newTask: Task | undefined;
  taskName!: string;
  rangeDates: Date[] = [];
  dueDate: Date | undefined;
  id: string | undefined;
  checked: boolean = false;
  text: string | undefined; //description of task
  buttonText: string = '';
  buttons: { color: string; text: string; id: string }[] = [];
  htmlContent: string = '';
  images: string[] = [];
  tags: Tag[] = [];
  checkList: CheckList[] = [];

  //
  additionTask: MenuItem[] = [
    { id: '1', label: 'Check List' },
    { id: '2', label: 'SubTask' },
  ];
  activeItem: MenuItem | undefined;
  taskNotAssigned: any = null;
  checkedDialog: boolean = false;
  visible: boolean = false;
  // service
  private eventDataSubscription: Subscription;
  public eventId: string;

  //
  showStatus: boolean = false;
  showAssignees: boolean = false;
  showClients: boolean = false;
  showTags: boolean = false;
  showDescription: boolean = false;
  showPriority: boolean = false;
  showDoc: boolean = false;
  showTagsList: boolean = false;
  //
  selectedCity!: any;
  selectedClient!: any;
  selectedUser!: any;
  selectStatus!: Status;
  selectedColor: string = '#1976d2'; // default color
  selectedTags: Tag[] = [];
  selectedPriority!: Priority;
  // array
  selectedClients: Client[] = [];
  selectedUsers: User[] = [];
  //
  formGroupClient!: FormGroup;
  formGroupUser!: FormGroup;
  formGroupStatus!: FormGroup;
  formGroupTags!: FormGroup;
  //
  @Input() taskId: string | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  //
  constructor(
    private userSErvice: UserService,
    private clientService: ClientService,
    private tagService: TagService,
    private tasksService: TaskService,
    private statusService: StatusService,
    private priorityService: PriorityService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private googleCalendarService: GoogleAuthService,
    private socketService: SocketService,
    private googleTask: GoogleTaskService,
    private checkListServise: CheckListService
  ) {}

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.taskId) this.id = this.taskId;
    console.log(this.id);
    if (this.id != 'create') {
      this.tasksService.searchTask(this.id!).subscribe({
        next: (data) => {
          console.log('tasks: ', data);
          this.currentTask = data;
          this.selectStatus = this.currentTask.status;
          this.selectedPriority = this.currentTask.priority;
          // this.selectedClient = this.currentTask.client;
          // this.selectedUser = this.currentTask.assignedTo;
          this.selectedUsers = this.currentTask.assignedTo;
          this.selectedClient = this.currentTask.client;
          this.rangeDates = [new Date(), new Date()];
          this.rangeDates![0] = new Date(this.currentTask.startDate);
          this.rangeDates![1] = new Date(this.currentTask.deadline);
          this.htmlContent = this.currentTask.description;
          this.dueDate = new Date(this.currentTask.dueDate);
          console.log(this.rangeDates);

          this.images = this.currentTask.images;
          this.taskName = this.currentTask.taskName;
          this.buttons = this.currentTask.tags?.map((tag: Tag) => ({
            color: tag.color,
            text: tag.text,
            id: tag._id!,
          }));
          this.selectedTags = this.currentTask.tags;
          this.eventId = this.currentTask.googleId;
          console.log("checkList", this.currentTask.checkList);
          this.currentTask.checkList?.forEach((listId: string) => {
            console.log("listId", listId);
            
            this.checkListServise.getCheckLists(listId).subscribe((data: CheckList) => {
              this.checkList.push(data);
            });
          })
          
        },
        error: (err) => {
          console.log(err);
        },
      });
      console.log("checkList in task comp");
    
      this.checkList.forEach((check) => {
        console.log("check", check);
        console.log("*");
      })
    }
    //users
    this.userSErvice.getAllUsers().subscribe({
      next: (data) => {
        console.log('users: ', data);
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //clients
    this.clientService.getAllClients().subscribe({
      next: (dataClients) => {
        console.log(dataClients);
        this.clients = dataClients;
      },
      error: (errClients) => {
        console.log(errClients);
      },
    });
    // status
    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        console.log(data);
        this.listStatus = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // priority
    this.priorityService.getAllPrioritys().subscribe({
      next: (data) => {
        console.log(data);
        this.listPriority = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // tags
    this.tagService.getAllTags().subscribe({
      next: (data) => {
        console.log(data);
        this.tags = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //from group
    this.formGroupClient = new FormGroup({
      selectedClient: new FormControl<any | null>(null),
    });
    this.formGroupUser = new FormGroup({
      selectedUser: new FormControl<any | null>(null),
    });
    this.formGroupStatus = new FormGroup({
      selectStatus: new FormControl<any | null>(null),
    });
    // socket
    // Listen for tasks that are not assigned to anyone
    this.socketService.onTaskNotAssigned().subscribe((task) => {
      this.taskNotAssigned = task;
    });

    // Listen for tasks assigned to the current client
    this.socketService.onTaskAssignedToYou().subscribe((task) => {
      // Show notification or handle task assignment to the current user
      console.log('Task assigned to you:', task);
    });

    // Listen for tasks assigned to someone else
    this.socketService.onTaskAssigned().subscribe((data) => {
      const { taskId, assignedTo } = data;
      // Handle UI updates or notifications for tasks assigned to others
      console.log(`Task ${taskId} assigned to ${assignedTo}`);
    });
  }

  showDialog() {
    if (this.id == 'create') {
      this.visible = true;
    } else {
      this.save();
    }
  }

  cancelDialog() {
    this.visible = false;
    this.save();
  }

  // createGoogleTask() {
  //   this.visible = false;
  //   // if (!this.taskTitle.trim()) {
  //   //   alert('Please enter a task title');
  //   //   return;
  //   // }
  //   const taskDetails = {
  //     title: 'Task Tzipi2',
  //     notes: 'Task Notes',
  //     dueTime: '2024-07-18T10:00:00Z', // תאריך ושעה בפורמט ISO 8601
  //   };

  //   this.googleTask.createSimpleTask(taskDetails);

  //   this.subscribeToEventData();
  //   console.log(this.eventId);

  //   this.save();
  // }

  // createGoogleTask() {
  //   this.visible = false;

  //   const taskDetails = {
  //     title: this.taskName,
  //     notes: 'Task Notes',
  //     dueTime: this.rangeDates[1], // תאריך ושעה בפורמט ISO 8601
  //   };

  //   // Create Google event and return a promise
  //   const createTaskPromise =
  //     this.googleTask.createSimpleTask(taskDetails);

  //   // After creating event, save the meeting
  //   createTaskPromise
  //     .then(() => {
  //       // debugger;
  //       // alert('הפגישה נוספה בהצלחה');
  //       this.subscribeToEventData();
  //       console.log(this.eventId);
  //       setTimeout(() => {
  //         this.save();
  //       }, 1000); // המתנה 1 שניות, כדי לוודא שההרשמות הושלמו בצורה נכונה

  //       // this.save(); // Save meeting details
  //     })
  //     .catch((error) => {
  //       console.error('Error creating Google event:', error);
  //     });

  //   // this.googleTask
  //   //   .createSimpleTask(taskDetails)
  //   //   .then(() => {
  //   //     this.subscribeToEventData();
  //   //     console.log(this.eventId);
  //   //     this.save();
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('Error creating task:', error);
  //   //   });
  // }

  // createGoogleTask() {
  //   this.visible = false;

  //   const taskDetails = {
  //     title: this.taskName,
  //     notes: 'Task Notes',
  //     dueTime: this.rangeDates[1], // תאריך ושעה בפורמט ISO 8601
  //   };

  //   // Create Google task and return a promise
  //   this.googleTask.createSimpleTask(taskDetails)
  //     .then(() => {
  //       return this.subscribeToEventData(); // wait for this to finish
  //     })
  //     .then(() => {
  //       console.log(this.eventId);
  //       this.save(); // call save after everything is done
  //     })
  //     .catch((error) => {
  //       console.error('Error creating Google event:', error);
  //     });
  // }

  // 2
  createGoogleTask() {
    this.visible = false;

    const taskDetails = {
      title: this.taskName,
      notes: 'Task Notes',
      dueTime: this.rangeDates[1], // תאריך ושעה בפורמט ISO 8601
    };

    // this.googleTask.createSimpleTask(taskDetails)
    //   .then(() => {
    //     return this.subscribeToEventData();
    //     alert('1')
    //   })
    //   .then(() => {
    //     console.log(this.eventId);
    //     alert('2')
    //     this.save();
    //   })
    //   .catch((error) => {
    //     console.error('Error creating Google event:', error);
    //   });

    const createEventPromise = this.googleTask.createSimpleTask(taskDetails);

    // After creating event, save the meeting
    createEventPromise
      .then(() => {
        debugger;
        // alert('הפגישה נוספה בהצלחה');
        this.subscribeToEventData();
        setTimeout(() => {
          this.save();
        }, 1000); // המתנה 1 שניות, כדי לוודא שההרשמות הושלמו בצורה נכונה

        // this.save(); // Save meeting details
      })
      .catch((error) => {
        console.error('Error creating Google event:', error);
      });
  }

  //functions
  save() {
    //create task
    const newTask: Task = {
      // client: this.selectedClient,
      // client: this.selectedClients,
      // description: this.htmlContent,
      // status: this.selectStatus,
      // tags: this.buttons,
      // // assignedTo: this.selectedUser,
      // assignedTo: this.selectedUsers,
      // taskName: this.taskName,
      // deadline: this.rangeDates[1]!,
      // startDate: this.rangeDates[0]!,
      // images: this.images,
      // priority: this.selectedPriority,
      // dueDate: this.currentTask.dueDate!,
    };

    if (this.selectedClient) newTask.client = this.selectedClient;
    if (this.htmlContent) newTask.description = this.htmlContent;
    if (this.selectStatus) newTask.status = this.selectStatus;
    if (this.buttons) newTask.tags = this.buttons;
    if (this.selectedUsers) newTask.assignedTo = this.selectedUsers;
    if (this.taskName) newTask.taskName = this.taskName;
    if (this.rangeDates[1]) newTask.deadline = this.rangeDates[1];
    if (this.rangeDates[0]) newTask.startDate = this.rangeDates[0];
    if (this.images) newTask.images = this.images;
    if (this.selectedPriority) newTask.priority = this.selectedPriority;
    if (this.dueDate) newTask.dueDate = this.dueDate;
    if (this.eventId) newTask.googleId = this.eventId;
    console.log(this.eventId);

    if (this.id == 'create') {
      this.tasksService.createTask(newTask).subscribe({
        next: (dataClients) => {
          console.log(dataClients);
          if ((this.selectedUsers = [])) {
            // Task not assigned, notify all clients
            this.socketService.addTask(newTask);
          }
        },
        error: (errClients) => {
          console.log(errClients);
        },
      });
    } else if (this.id != 'create') {
      this.tasksService.updateTask(this.id!, newTask).subscribe({
        next: (dataClients) => {
          console.log(dataClients);
          // Task updated
          if (this.eventId) this.updateTask();
          if (this.taskId) this.closeModal.emit();
        },
        error: (errClients) => {
          console.log(errClients);
        },
      });
    }
  }

  updateTask() {
    const taskDetails = {
      title: this.taskName,
      notes: 'Task Notes',
      dueDate: this.rangeDates[1],
      id: this.eventId, // תאריך ושעה בפורמט ISO 8601
    };

    this.googleTask.updateGoogleTask(taskDetails);
  }
  //
  cancel() {
    //return to last page
    window.history.back();
  }
  //
  changeStatus() {
    for (let i = 0; i < this.listStatus.length; i++) {
      if (this.listStatus[i].name === 'COMPLETE') {
        this.selectStatus = this.listStatus[i];
        this.dueDate = new Date();
      }
    }
  }
  //
  createTag() {
    this.showTags = !this.showTags;
    if (this.buttonText && this.selectedColor) {
      this.tagService
        .createTag({ color: this.selectedColor, text: this.buttonText })
        .subscribe({
          next: (dataTag) => {
            console.log(dataTag);
            this.selectedTags.push({
              color: dataTag.color,
              text: dataTag.text,
              _id: dataTag._id!,
            });
            this.buttons.push({
              color: this.selectedColor,
              text: this.buttonText,
              id: dataTag._id!,
            });
            this.buttonText = '';
          },
          error: (errTag) => {
            console.log(errTag);
          },
        });
    }
  }
  //
  removeButton(button: any) {
    const index = this.buttons.indexOf(button);
    if (index !== -1) {
      this.buttons.splice(index, 1);
    }
  }

  status(s: Status) {
    if (s.name === 'COMPLETE') this.dueDate = new Date();
    this.selectStatus = s;
    console.log(this.selectStatus);
    console.log(this.dueDate);
  }

  priority(s: Priority) {
    this.selectedPriority = s;
    console.log(this.selectedPriority);
  }
  tag(s: Tag) {
    this.selectedTags.push(s);
    this.buttons.push({ color: s.color, text: s.text, id: s._id! });
    this.showTagsList = !this.showTagsList;
  }
  // date
  onDateSelect(event: any) {
    if (event.data) {
      this.rangeDates[0] = event.data[0];
      this.rangeDates[1] = event.data[1];
    }
    console.log(this.rangeDates);
    console.log(event.data);
  }
  // images
  // ===================================================
  download() {
    const imageUrl = `http://localhost:8080/uploads/ttt.png`;
    FileSaver.saveAs(imageUrl, 'ttt.png');
  }
  //description
  response: any;
  handleResponse(event: any) {
    this.response = event;
    console.log(this.response);
    this.images.push(this.response.viewLink);
    console.log(this.images);
  }
  onContentChange(content: string) {
    this.htmlContent = content;
    console.log(this.htmlContent); // או כל פעולה אחרת שתרצה לבצע עם התוכן
  }
  @ViewChild(EditorComponent) editorComponent!: EditorComponent;

  updateEditorContent(newContent: string) {
    this.editorComponent.initialContent = newContent;
  }

  try() {
    console.log(this.activeItem);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
  // google task
  subscribeToEventData() {
    alert('se1');
    this.eventDataSubscription = this.googleTask.eventData$.subscribe(
      (eventData) => {
        if (eventData) {
          alert('se2');
          console.log(eventData);
          this.eventId = eventData.eventId;
          console.log('this.eventId' + this.eventId);
        }
      }
    );
  }

  // subscribeToEventData(): Promise<void> {
  //   return new Promise((resolve) => {
  //     // some async operations
  //     setTimeout(() => {
  //       // this.eventId = 'someEventId'; // example assignment
  //       this.googleCalendarService.eventData$.subscribe((eventData) => {
  //         if (eventData) {
  //           // alert('se2')
  //           console.log(eventData);
  //           this.eventId = eventData.eventId;
  //         }
  //       });
  //       resolve();
  //     }, 1000); // simulate async operation
  //   });
  // }

  // subscribeToEventData(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     // נרשם לאירועים מהשירות
  //     const subscription = this.googleCalendarService.eventData$.subscribe(
  //       (eventData) => {
  //         if (eventData) {
  //           console.log(eventData);
  //           this.eventId = eventData.eventId;
  //           subscription.unsubscribe(); // לבטל את ההרשמה לאחר קבלת הנתונים
  //           resolve();
  //         } else {
  //           reject('No event data received');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error subscribing to event data:', error);
  //         reject(error);
  //       }
  //     );

  //     // אם אנחנו רוצים לוודא שהפונקציה לא נתקעת לנצח, אפשר להוסיף timeout
  //     setTimeout(() => {
  //       reject('Timeout waiting for event data');
  //     }, 5000); // 5 שניות המתנה לדוגמה
  //   });
  // }

  unsubscribeFromEventData() {
    if (this.eventDataSubscription) {
      this.eventDataSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribeFromEventData();
  }
}
