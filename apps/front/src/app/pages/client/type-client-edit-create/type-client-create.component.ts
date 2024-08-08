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
import { RepeatableTask } from '../../../_models/repeatable.module';
import { RepeatableTaskService } from '../../../_services/repeatable.service';

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

  // @Input() create: string | undefined;
  tasks: RepeatableTask[] = [];
  selectedTask: RepeatableTask[] = [];
  selectedField: Field[] = [];
  fields: Field[] = [];
  value: string;
  tasksId: string[] = [];

  constructor(
    private taskService: RepeatableTaskService,
    private fieldService: FieldService,
    private r: Router,
    private clientTypeService: ClientTypeService
  ) {}

  updateSelectedType(): void {
    if (this.type) {
      this.value = this.type.name;
      this.selectedField = []; // Make sure to create a new array
      this.selectedTask = []; // Clear the selectedTask array

      if (this.type.fields) {
        for (const fieldId of this.type.fields) {
          this.selectedField.push(fieldId);
        }
        console.log(this.selectedField);
      }
      if (this.type.tasks) {
        for (const taskId of this.type.tasks) {
          this.taskService.searchRepeatableTask(taskId._id).subscribe({
            next: (data) => {
              this.selectedTask.push(data);
              console.log(this.selectedTask);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
        console.log(this.selectedTask);
      }
    }
  }

  // createType() {
  //   this.value = '';
  //   this.selectedField = []; // Make sure to create a new array
  //   this.selectedTask = [];
  // }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['type'] && changes['type'].currentValue) {
    //   this.updateSelectedType();
    // }

    if (changes['type'] && changes['type'].currentValue) {
      this.initializeFormWithType();
    }

    if (this.isNew) {
      this.initializeFormForNewType();
    }

    // else
    //   this.createType();
  }

  private initializeFormWithType(): void {
    if (this.type) {
      this.value = this.type.name;
      this.selectedTask = [];
      this.selectedField = [...this.type.fields];

      if (this.type.tasks) {
        this.type.tasks.forEach((taskId) => {
          this.taskService.searchRepeatableTask(taskId._id).subscribe({
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
    console.log('client type', this.type);

    // if (this.type) {
    //   this.value = this.type.name;
    //   // this.selectedTask=this.type.tasks
    //   // this.selectedField=this.type.fields
    //   this.type.fields.forEach((element) => {
    //     this.selectedField.push(element);
    //   });
    //   console.log(this.type.fields);
    //   console.log(this.type.tasks);
    //   if (this.type.tasks) {
    //     for (const taskId of this.type.tasks) {
    //       this.taskService.searchTask(taskId).subscribe({
    //         next: (data) => {
    //           console.log(data);
    //           this.selectedTask.push(data);
    //           this.selectedTask = this.selectedTask;
    //         },
    //         error: (err) => {
    //           console.log(err);
    //         },
    //       });
    //     }
    //   }
    // }
    // else
    //   this.createType();

    this.taskService.getAllRepeatableTasks().subscribe({
      next: (data) => {
        console.log(data);
        this.tasks = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //
    this.fieldService.getAllField().subscribe({
      next: (data) => {
        console.log(data);
        this.fields = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    //
  }

  // addTask() {
  //   this.r.navigate(['taskSpe/create']);
  // }

  // addField() {
  //   this.r.navigate(['taskSpe/create']);
  // }

  save() {
    this.selectedTask.forEach((element) => {
      this.tasksId.push(element._id);
    });
    const c: ClientType = {
      name: this.value,
      tasks: this.selectedTask,
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
        tasks: this.selectedTask,
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
  // cancel() {
  //   this.closeDialogInner();
  // }

  closeDialogInner() {
    this.closeDialog.emit();
  }
}
