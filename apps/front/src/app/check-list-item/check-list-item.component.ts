import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { CheckListItem } from '../_models/checkListItem.model';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-list-item',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgClass, CheckboxModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './check-list-item.component.html',
  styleUrls: ['./check-list-item.component.css'],
})
export class CheckListItemComponent implements OnInit {

  ngOnInit(): void {
    this.prevItem = {_id:this.item._id, isDone:this.item.isDone, description:this.item.description}
    if (this.newItem) {
      this.edit = true
    }
  }

  edit = false

  @Output() delete = new EventEmitter<any>()

  @Output() update = new EventEmitter<CheckListItem>()

  @Input()
  item: CheckListItem = { description: 'משימה חדשה', isDone: false }

  @Input()
  newItem: boolean = false

  prevItem: CheckListItem | null

  saveItem() {
    try {
      this.update.emit(this.item)
      this.edit = false
    } catch (err) {
      console.log(err);
      alert("העדכון נכשל")
    }
  }

  deleteItem() {
    try {
      this.delete.emit(null);
    } catch (err) {
      console.log(err);
      alert("המחיקה נכשלה")
    }
  }

  saveDone() {
    this.saveItem()
  }

  editDescription(): void {
    this.edit = !this.edit
  }

  saveDescription(): void {
    if (this.item.description.length != 0) {
      this.saveItem()
      this.edit = false
    }
    else {
      alert("יש להזין תיאור")
    }
  }

  cencelDescription(): void {
    if (this.item._id === "1234") {
      try { this.delete.emit("1234") }
      catch (err) {
        console.log(err);
      }
    } else {
      this.item.description = this.prevItem.description
      this.editDescription()
    }
  }

}