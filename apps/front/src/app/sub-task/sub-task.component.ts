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
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-sub-task',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    RouterLink,
    RouterOutlet,
    DialogModule,
    Footer,
    ButtonDirective,
    SidebarModule,
    NgIf,
    ButtonModule,
    RouterLink,
    InputTextModule,
    NgFor,
    PanelModule,
    TableModule,
    NgStyle,
    NgClass,
    ToastModule,
    DatePipe,
    CommonModule,
    CalendarModule,
    FormsModule,
    AutoCompleteModule,
    PrimeTemplate,
    IconProfileComponent,
    MultiSelectModule
  ],
  templateUrl: './sub-task.component.html',
  styleUrl: './sub-task.component.css',
})

export class SubTaskComponent implements OnInit {

  marginStyles = { 'margin-right': '10%' };
  newList: boolean = false;
  tagSuggestions: Tag[] = [];
  tasks: Task[] = [];
  statuses: Status[] = []

  @Input()
  subTasks: string[] = [];

  @Input()
  parentId: string | null = null;

  @Input()
  task: Task | null

  constructor(
    private tagService: TagService,
    private taskService: TaskService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    if (this.parentId)
      //get subTasks id
      this.taskService.searchTask(this.parentId).subscribe({
        next: (task) => {
          this.task = task;
          this.subTasks = task.subTasks
          //get subTasks items
          this.getTasks().then((data) => {
            //get tags
            this.tagService.getAllTags().subscribe({
              next: (tags) => {
                this.tagSuggestions = tags;
              }
            })
            //get statuses
            this.statusService.getAllStatuses().subscribe({
              next: (data) => {
                this.statuses = data;
              }
            })
          })
        },
        error: (err) => {
          alert(err)
        }
      })
  }

  confirmDelete(task: Task) {
    //delete from parent
    const i = this.task.subTasks.findIndex(sub => sub == task._id)
    this.task.subTasks.slice(i, i + 1)
    this.taskService.updateTask(this.task._id, this.task).subscribe({
      next: (data) => {
        //delete task
        this.taskService.deleteTask(task._id).subscribe({
          next: (d) => {
            window.location.reload();
          }
        });
      },
      error: (err) => {
        alert("המחיקה נכשלה")
      },
    })

  }

  getTasks(): any {
    return new Promise((resolve, reject) => {
      if (this.subTasks.length > 0)
        this.subTasks.forEach(st => {
          this.taskService.searchTask(st).subscribe({
            next: (task) => {
              this.tasks.push(task);
              resolve(true);
            },
            error: (err) => {
              resolve(false)
            }
          });
        })
    })
  }

  categorizeTasks(status: Status): Task[] {
    let currentTasks: Task[] = []
    if (this.tasks.length > 0) {
      try {
        this.tasks.forEach(task => {
          if (task.status && task.status.name == status.name) {
            currentTasks.push(task)
          }
        })
      } catch (err) {
      }
    }
    return currentTasks;
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
