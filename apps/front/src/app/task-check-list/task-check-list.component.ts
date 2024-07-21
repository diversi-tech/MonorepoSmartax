import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckList } from '../_models/checkList.model';
import { CheckListItem } from '../_models/checkListItem.model';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-check-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgClass, CheckboxModule, ReactiveFormsModule, FormsModule, ButtonModule],
  templateUrl: './task-check-list.component.html',
  styleUrls: ['./task-check-list.component.css'],
})
export class TaskCheckListComponent implements OnInit {
  formGroup: FormGroup;
  editingItemIndex: number | null = null;

  @Input()
  checkList: CheckList | undefined;

  constructor(private formBuilder: FormBuilder) { }

ngOnInit(): void {
    // const {name, items} = this.checkList;
}

  editItem(index: number): void {
    if (this.editingItemIndex === null) {
      this.editingItemIndex = index;
    } else {
      // If another item is already being edited, cancel editing of that item
      this.editingItemIndex = null;
    }
  }

  deleteItem(index: number): void {
    // Implement the logic to delete the item at the specified index
  }

  addItem(): void {
    // Implement the logic to add a new item to the checkList.items array
  }
}