import { Component, Input, NgModule } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CheckList } from '../_models/checkList.model';
import { CheckListItem } from '../_models/checkListItem.model';
import { CheckboxModule } from 'primeng/checkbox';

interface Todo {
  id: number;
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-task-check-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgClass,CheckboxModule,ReactiveFormsModule],
  templateUrl: './task-check-list.component.html',
  styleUrl: './task-check-list.component.css',
})
export class TaskCheckListComponent {
  formGroup: FormGroup;
  @Input()
  checkList: CheckList | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [this.checkList.name],
      item: this.formBuilder.group({})
    });
    for (let item of this.checkList.items) {
      (this.formGroup.get('item') as FormGroup).addControl(item.description, new FormControl(item.isDone));
    }
  }

}
