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
import { DropdownModule } from 'primeng/dropdown';
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
import { CommonModule, NgFor } from '@angular/common';
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
import { MenuItem, SelectItem, SelectItemGroup } from 'primeng/api';
import { TaskCheckListComponent } from '../task-check-list/task-check-list.component';
import { TabViewModule } from 'primeng/tabview';
import { SubTaskComponent } from '../sub-task/sub-task.component';
import { TimerComponent } from '../timer/timer.component'; // וודא שהנתיב נכון

import { SocketService } from '../_services/socket.service';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { CheckList } from '../_models/checkList.model';
import { CheckListService } from '../_services/checkList.service';
import { EmptyDatePipe } from '../_pipes/EmptyDatePipe';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [
    CommonModule,
    NgFor,
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
    DropdownModule,
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
    TagModule,
    EmptyDatePipe,
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
  dueDate: Date | null = null;
  id: string | undefined;
  checked: boolean = false;
  text: string | undefined; //description of task
  buttonText: string = '';
  buttons: { color: string; text: string; id: string }[] = [];
  htmlContent: string = '';
  images: string[] = [];
  tags: Tag[] = [];
  checkList: CheckList[] = [];
  checkListId: string[] | undefined;
  subTasks: string[] = [];
  tags2: Tag[] = [];
  color: string | undefined;
  value: string;

  //
  additionTask: MenuItem[] = [
    { id: '1', label: 'Check List' },
    { id: '2', label: 'SubTask' },
  ];
  activeItem: MenuItem | undefined;
  taskNotAssigned: any = null;
  checkedDialog: boolean = false;
  visible: boolean = false;
  visiblePopup: boolean = false;
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
  showTag2: boolean = false;
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
  @Input() create:boolean|null = null;
  @Input() parent: string | null = null;
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

  newTaskCreated: boolean = false;
  newTaskCreated: boolean = false;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.taskId)
      this.id = this.taskId;
    if (this.id != 'create'||(this.create==null||(this.create&&!this.create))) {

      this.tasksService.searchTask(this.id!).subscribe({
        next: (data) => {
          this.currentTask = data;
          this.subTasks = this.currentTask.subTasks
          this.selectStatus = this.currentTask.status;
          console.log(this.currentTask.priority);

          this.selectedPriority = this.currentTask.priority;
          console.log(this.selectedPriority);

          // this.selectedClient = this.currentTask.client;
          // this.selectedUser = this.currentTask.assignedTo;
          this.selectedUsers = this.currentTask.assignedTo;
          this.selectedClient = this.currentTask.client;
          this.rangeDates = [new Date(), new Date()];
          this.rangeDates![0] = new Date(this.currentTask.startDate);
          this.rangeDates![1] = new Date(this.currentTask.deadline);
          this.htmlContent = this.currentTask.description;
          this.dueDate = new Date(this.currentTask.dueDate || null);
          this.images = this.currentTask.images;
          this.taskName = this.currentTask.taskName;
          this.buttons = this.currentTask.tags?.map((tag: Tag) => ({
            color: tag.color,
            text: tag.text,
            id: tag._id!,
          }));
          this.selectedTags = this.currentTask.tags;
          this.tags2 = this.currentTask.tags;
          this.eventId = this.currentTask.googleId;
          this.currentTask.checkList?.forEach((listId: string) => {
            this.checkListServise
              .getCheckLists(listId)
              .subscribe((data: CheckList) => {
                this.checkList.push(data);
              });
          });

          this.clientService.searchClient(this.selectedClient).subscribe({
            next: (dataClients) => {
              this.selectedClient = dataClients;
            },
            error: (errClients) => {
              console.log(errClients);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });

    }
    else {
      this.newTaskCreated = true
    }
    //users
    this.userSErvice.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //clients
    this.clientService.getAllClients().subscribe({
      next: (dataClients) => {
        this.clients = dataClients;
      },
      error: (errClients) => {
        console.log(errClients);
      },
    });
    // status
    this.statusService.getAllStatuses().subscribe({
      next: (data) => {
        this.listStatus = data;
        this.selectStatus = this.listStatus.find(
          (status) => status.name === this.currentTask.status.name
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
    // priority
    this.priorityService.getAllPrioritys().subscribe({
      next: (data) => {
        this.listPriority = data;
        this.selectedPriority = this.listPriority.find(
          (priority) => priority.name === this.currentTask.priority.name
        );
        console.log(this.selectedPriority);
      },
      error: (err) => {
        console.log(err);
      },
    });
    // tags
    this.tagService.getAllTags().subscribe({
      next: (data) => {
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

    //checklist
    let checklists: SelectItem<any>[] = [];
    this.checkListServise.getAllCheckLists().subscribe({
      next: (lists) => {
        if (!lists) {
          this.groupedLists = [
            {
              label: 'חדש',
              value: 'צור רשימה חדשה',
              items: [{ label: 'רשימה חדשה', value: 'new' }],
            },
            {
              label: 'בחר מתוך רשימות',
              value: 'old',
              items: [],
            },
          ];
          console.log('No checklist data');
          return;
        }

        const checklists = lists
          .filter((item) => this.notInThisTask(item._id))
          .map((list) => ({ label: list.name, value: list._id }));
        this.groupedLists = [
          {
            label: 'חדש',
            value: 'צור רשימה חדשה',
            items: [{ label: 'רשימה חדשה', value: 'new' }],
          },
          {
            label: 'בחר מתוך רשימות',
            value: 'old',
            items: checklists,
          },
        ];
      },
      error: (err) => {
        console.log('Error getting checklist data:', err);
      },
    });

    // socket
    // Listen for tasks that are not assigned to anyone
    // this.socketService.onTaskNotAssigned().subscribe((task) => {
    //   this.taskNotAssigned = task;
    // });

    // // Listen for tasks assigned to the current client
    // this.socketService.onTaskAssignedToYou().subscribe((task) => {
    //   // Show notification or handle task assignment to the current user
    //   console.log('Task assigned to you:', task);
    // });

    // Listen for tasks assigned to someone else
    // this.socketService.onTaskAssigned().subscribe((data) => {
    //   const { taskId, assignedTo } = data;
    //   // Handle UI updates or notifications for tasks assigned to others
    //   console.log(`Task ${taskId} assigned to ${assignedTo}`);
    // });

    // alert(this.id)
  }

  notInThisTask(id: string) {
    this.currentTask.checkList.forEach((item) => {
      if (item === id) return false;
    });
    return true;
  }

  showDialog() {
    debugger
    if (this.id == 'create'||this.parent) {
      this.visible = true;
    }
    else {
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

    const createEventPromise = this.googleTask.createSimpleTask(taskDetails);

    // After creating event, save the meeting
    createEventPromise
      .then(() => {
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
    // debugger
    // בדוק אם המשימה אינה משויכת לאף משתמש
    // if (!this.selectedUsers || this.selectedUsers.length === 0) {
    //   this.visiblePopup = true;
    //   return;
    // }
    //create task
    const newTask: Task = {};

    if (this.selectedClient) newTask.client = this.selectedClient;
    if (this.htmlContent) newTask.description = this.htmlContent;
    if (this.selectStatus) newTask.status = this.selectStatus;
    if (this.buttons) newTask.tags = this.buttons;
    //
    if (this.tags2) newTask.tags = this.tags2;
    //
    if (this.selectedUsers) newTask.assignedTo = this.selectedUsers;
    if (this.taskName) newTask.taskName = this.taskName;
    if (this.rangeDates[1]) newTask.deadline = this.rangeDates[1];
    if (this.rangeDates[0]) newTask.startDate = this.rangeDates[0];
    if (this.images) newTask.images = this.images;
    if (this.selectedPriority) newTask.priority = this.selectedPriority;
    if (this.dueDate) newTask.dueDate = this.dueDate;
    if (this.eventId) newTask.googleId = this.eventId;
    if (this.parent) newTask.parent = this.parent;
    // newTask.checkList = this.currentTask.checkList;
    console.log(this.eventId);

    if (this.id == 'create'||(this.create==null||this.create==true)) {
      this.tasksService.createTask(newTask).subscribe({
        next: (task) => {
          console.log(task);
          if (this.parent) {
            this.tasksService.searchTask(this.parent).subscribe({
              next: (parentTask) => {
                parentTask.subTasks.push(task._id);
                this.tasksService.updateTask(this.parent, parentTask).subscribe({
                  next: (data) => {
                  },
                  error: (err) => {
                    console.log(err);
                    alert("ההוספה נכשלה, נא נסה שנית")
                  }
                })

              },
              error: (err) => {
                console.log(err);
              }
            })
          }
          if (!this.selectedUsers || this.selectedUsers.length === 0) {
            this.socketService.addTask(task);
          }
        },
        error: (errClients) => {
          console.log(errClients);
        },
      });
    } else
      if (this.id != 'create') {
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
    window.history.back();
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
  // createTag() {
  //   this.showTags = !this.showTags;
  //   if (this.buttonText && this.selectedColor) {
  //     this.tagService
  //       .createTag({ color: this.selectedColor, text: this.buttonText })
  //       .subscribe({
  //         next: (dataTag) => {
  //           console.log(dataTag);
  //           this.selectedTags.push({
  //             color: dataTag.color,
  //             text: dataTag.text,
  //             _id: dataTag._id!,
  //           });
  //           this.buttons.push({
  //             color: this.selectedColor,
  //             text: this.buttonText,
  //             id: dataTag._id!,
  //           });
  //           this.tags2.push({
  //             color: dataTag.color,
  //             text: dataTag.text,
  //             _id: dataTag._id!,
  //           });
  //           this.buttonText = '';
  //         },
  //         error: (errTag) => {
  //           console.log(errTag);
  //         },
  //       });
  //   }
  // }

  createTag() {
    this.showTag2 = !this.showTag2;
    if (this.color && this.value) {
      this.tagService
        .createTag({ color: this.color, text: this.value })
        .subscribe({
          next: (dataTag) => {
            console.log(dataTag);
            // this.selectedTags.push({
            //   color: dataTag.color,
            //   text: dataTag.text,
            //   _id: dataTag._id!,
            // });
            // this.buttons.push({
            //   color: this.selectedColor,
            //   text: this.buttonText,
            //   id: dataTag._id!,
            // });
            this.tags2.push({
              color: dataTag.color,
              text: dataTag.text,
              _id: dataTag._id!,
            });
            this.value = '';
          },
          error: (errTag) => {
            console.log(errTag);
          },
        });
    }
  }
  //
  // removeButton(button: any) {
  //   const index = this.buttons.indexOf(button);
  //   if (index !== -1) {
  //     console.log("tags2",this.tags2);

  //     this.buttons.splice(index, 1);
  //     this.tags2.splice(index, 1);
  //   }
  // }

  removeButton(index: number, event?: MouseEvent) {
    if (event) {
      event.stopPropagation(); // מונע את הפצת האירוע לכפתור הראשי
    }
    if (index !== -1) {
      console.log('tags2', this.tags2);
      this.tags2.splice(index, 1);
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

  //checkList
  newList: boolean = false;
  selectedList: string | undefined;
  groupedLists: SelectItemGroup[] = [];
  newListName: string | null;

  selectPlaceholder = 'בחר רשימה';

  addNewList() {
    this.newList = false;
    if (this.newListName) {
      let l: CheckList = { name: this.newListName, items: [] };
      this.checkListServise.createCheckList(l).subscribe({
        next: (newList) => {
          this.currentTask.checkList.push(newList._id);
          this.checkList.push(newList);
          this.save();
        },
        error: (err) => {
          console.log(err);
          alert('ההוספה נכשלה, אנא נסה שנית');
        },
      });
    } else {
      alert('יש להזין שם');
    }
  }

  // create new list
  createList(i: any) {
    this.selectedList = i.value;
    if (this.selectedList && this.selectedList != 'new') {
      this.checkListServise.getCheckLists(this.selectedList).subscribe({
        next: (copylist) => {
          let l: CheckList = { name: copylist.name, items: copylist.items };
          this.checkListServise.createCheckList(l).subscribe({
            next: (newList) => {
              this.currentTask.checkList.push(newList._id);
              this.checkList.push(newList);
              this.save();
            },
            error: (err) => {
              console.log(err);
              alert('ההוספה נכשלה, אנא נסה שנית');
            },
          });
        },
      });
    } else {
      this.newList = true;
    }
    this.selectedList = undefined;
  }

  //update list
  updateList(list: CheckList) {
    if (list._id) {
      this.checkListServise.updateCheckList(list).subscribe({
        next: (newList) => {
          console.log(newList);
          let prev = this.checkList.findIndex((c) => c._id === newList._id);
          this.checkList[prev] = newList;
        },
        error: (err) => {
          console.log(err);
          alert('העדכון נכשל, אנא נסה שנית');
        },
      });
    }
  }

  deleteList(_id: string) {
    if (_id != '1234') {
      let i = this.currentTask.checkList.findIndex((item) => item === _id);
      const a = this.currentTask.checkList.splice(i, 1); //delete from current-task.checklist
      const b = this.checkList.splice(i, 1); //delete from checklist
      const c = this.groupedLists[1].items!.splice(i, 1); //delete from group options
      this.save();
      this.checkListServise.deleteCheckList(_id).subscribe({
        next: (data) => {},
        error: (err) => {
          console.log(err);
          this.currentTask.checkList.push(a[0]); //delete from current-task.checklist
          this.checkList.push(b[0]); //delete from checklist
          this.groupedLists[1].items.push(c[0]);
          alert('המחיקה נכשלה, אנא נסה שנית');
        },
      });
    }
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
