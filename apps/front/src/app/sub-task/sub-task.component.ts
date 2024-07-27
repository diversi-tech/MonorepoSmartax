import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Status } from '../_models/status.module';
import { TagService } from '../_services/tag.service';
import { TaskService } from '../_services/task.service';
import { StatusService } from '../_services/status.service';
import { Tag } from '../_models/tag.module';
import { Task } from "../_models/task.module";
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer, PrimeTemplate } from 'primeng/api';
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
import { TaskComponent } from '../task/task.component';
import { DialogModule } from 'primeng/dialog';
import { setTimeout } from 'timers/promises';
import { error } from 'console';

@Component({
  selector: 'app-sub-task',
  standalone: true,
  imports: [ConfirmDialogModule, RouterLink, RouterOutlet,
    // TaskComponent,
    DialogModule,
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
  DatePipe],
  templateUrl: './sub-task.component.html',
  styleUrl: './sub-task.component.css',
})
export class SubTaskComponent implements OnInit {
  newList: boolean = false;
  tagSuggestions: Tag[] = [];
  tasks: Task[] = [];
  statuses: Status[] = []

  @Input()
  subTasks: string[] = [];

  @Input()
  parentId: string | null = null;

  constructor(private tagService: TagService, private taskService: TaskService, private statusService: StatusService) { }

  ngOnInit() {
    if (this.parentId)
      //get subTasks id
      this.taskService.searchTask(this.parentId).subscribe({
        next: (task) => {
          this.subTasks = task.subTasks
          //get subTasks items
          this.getTasks().then((data) => {
            //get tags
            this.tagService.getAllTags().subscribe({
              next: (tags) => {
                this.tagSuggestions = tags;
              },
              error: (err) => {
                console.log(err);
              }
            })
            //get statuses
            this.statusService.getAllStatuses().subscribe({
              next: (data) => {
                this.statuses = data;

              },
              error: (err) => {
                console.log(err);
              }
            })
            // }
          })

        },
        error: (err) => {
          console.log(err);
          alert(err)
        }
      })


  }

  confirmDelete(selectedTask: any) { return null }

    getTasks(): any {
      return new Promise((resolve, reject) => {
        this.subTasks.forEach(st => {
          this.taskService.searchTask(st).subscribe({
            next: (task) => {
              this.tasks.push(task);
              resolve(true);
            },
            error: (err) => {
              console.log(err);
              resolve(false)
            }
          }); 
        })
      })
    }

    categorizeTasks(status: Status): Task[] {
      let currentTasks:Task[]=[]
      this.tasks.forEach(task => {
        if(task.status&& task.status.name==status.name){
          currentTasks.push(task)
        }
      })
      return currentTasks
      // return this.tasks.filter((task) => {
      //   { return task.status && task.status.name === status.name; }
      // });
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
  }
