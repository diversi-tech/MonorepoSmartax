import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientType } from '../../../_models/clientType.module';
import { TaskService } from '../../../_services/task.service';
import { Task } from '../../../_models/task.module';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { Field } from '../../../_models/field.module';
import { FieldService } from '../../../_services/field.service';
import { Router, RouterLink } from '@angular/router';
import { ClientTypeService } from '../../../_services/clientType.service';

@Component({
  selector: 'app-type-client-create',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    AvatarModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule,
    DividerModule,
    RouterLink,
  ],
  templateUrl: './type-client-create.component.html',
  styleUrl: './type-client-create.component.css',
})
export class TypeClientCreateComponent implements OnInit, OnChanges {

  @Input() type: ClientType | undefined;
  @Input() isNew: boolean = false;
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() dataUpdated = new EventEmitter<void>();

  tasks: Task[] = [];
  selectedTask: Task[] = [];
  selectedField: Field[] = [];
  fields: Field[] = [];
  value: string;
  tasksId: string[] = [];

  constructor(
    private taskService: TaskService,
    private fieldService: FieldService,
    private r: Router,
    private clientTypeService: ClientTypeService
  ) { }

  updateSelectedType(): void {
    if (this.type) {
      this.value = this.type.name;
      this.selectedField = [];
      this.selectedTask = [];
      if (this.type.fields) {
        for (const fieldId of this.type.fields) {
          this.selectedField.push(fieldId);
        }
      }
      if (this.type.tasks) {
        for (const taskId of this.type.tasks) {
          this.taskService.searchTask(taskId).subscribe({
            next: (data) => {
              this.selectedTask.push(data);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && changes['type'].currentValue) {
      this.initializeFormWithType();
    }
    if (this.isNew) {
      this.initializeFormForNewType();
    }
  }

  private initializeFormWithType(): void {
    if (this.type) {
      this.value = this.type.name;
      this.selectedTask = [];
      this.selectedField = [...this.type.fields];
      if (this.type.tasks) {
        this.type.tasks.forEach((taskId) => {
          this.taskService.searchTask(taskId).subscribe({
            next: (task) => this.selectedTask.push(task),
            error: (err) => console.error(err),
          });
        });
      }
    }
  }

  private initializeFormForNewType(): void {
    this.value = '';
    this.selectedTask = [];
    this.selectedField = [];
  }
  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //
    this.fieldService.getAllField().subscribe({
      next: (data) => {
        this.fields = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  save() {
    this.selectedTask.forEach((element) => {
      this.tasksId.push(element._id);
    });
    const c: ClientType = {
      name: this.value,
      tasks: this.tasksId,
      fields: this.selectedField,
    };

    if (this.isNew) {
      this.clientTypeService.createClientType(c).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      const c: ClientType = {
        name: this.value,
        tasks: this.tasksId,
        fields: this.selectedField,
        _id: this.type._id,
      };
      this.clientTypeService.updateClientType(c).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.dataUpdated.emit();
    this.closeDialog.emit();
  }

  closeDialogInner() {
    this.closeDialog.emit();
  }
}
