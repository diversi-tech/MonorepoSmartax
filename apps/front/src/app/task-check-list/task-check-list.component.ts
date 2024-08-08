import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { CheckList } from '../_models/checkList.model';
import { CheckListItem } from '../_models/checkListItem.model';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckListItemComponent } from '../check-list-item/check-list-item.component';
import { CheckListService } from '../_services/checkList.service';
import { CheckListItemService } from '../_services/checkListItem.service';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-check-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgClass, DividerModule, PanelModule, CardModule, CheckListItemComponent, CheckboxModule, ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './task-check-list.component.html',
  styleUrls: ['./task-check-list.component.css'],
})
export class TaskCheckListComponent implements OnInit {

  // formGroup: FormGroup;
  editingItemIndex: number | null = null;

  @Input()
  checkList: CheckList | null = {
    name: 'רשימת המשימות שלך',
    items: [],
  };

  @Output()
  save = new EventEmitter<CheckList>();

  @Output()
  delete = new EventEmitter<string>();


  constructor(private checkListService: CheckListService) { }

  ngOnInit(): void {
    if (this.checkList == null) {
      this.checkList = {
        name: 'רשימת המשימות שלך',
        items: []
      }
      this.editNewItem = true
    }
  }

  deleteList(): void {
    this.delete.emit(this.checkList._id)
  }

  updateItem(item: CheckListItem | null): void {
    // this.editNameInput = true
    this.editNewItem = false
    let res1: any | null
    let copy: any | null
    if (item._id != "1234") {
      try {
        let prev = this.checkList.items.find(item => item._id === item._id)
        if (prev) {
          copy = prev
          prev = item;
          res1 = this.checkListService.updateCheckList(this.checkList);
        }
        else {
          alert("ארעה שגיאה, אנא נסה שוב")
          // this.checkList.items.push(item);
          // res2 = this.checkListService.updateCheckList(this.checkList);
        }
      } catch (err) {
        console.log(err);
        if (!res1) {
          let prev = this.checkList.items.find(item => item._id === item._id)
          prev = copy
        }
        // if (!res2) {
        //   this.checkList.items.pop()
        // }
        // alert("העדכון נכשל, אנא נסה שוב")
      }
    }
    else {
      this.saveItem(item)
    }
  }

  deleteItem(_id: string): void {
    try {
      if (_id != "1234") {
        const index = this.checkList.items.findIndex(item => item._id === _id)
        if (index || index == 0) {
          this.checkList.items.splice(index, 1);
          this.checkListService.updateCheckList(this.checkList);
        }
        else {
          this.editNewItem = false;
        }

      }
      else {
        this.editNewItem = false
      }
    } catch (err) {
      console.log(err);
      alert("ארעה שגיאה בתהליך המחיקה, אנא נסה שוב")
    }
  }

  editNewItem = false
  newItem: CheckListItem = { _id: "1234", description: 'משימה חדשה', isDone: false }
  addItem(): void {
    this.editNewItem = true;
    this.newItem = { _id: "1234", description: 'משימה חדשה', isDone: false }
  }

  deleteName(): boolean {
    return true;
  }

  editNameInput: boolean = true;
  editName(): void {
    this.editNameInput = !this.editNameInput;
  }

  saveName() {
    this.save.emit(this.checkList)
  }

  saveItem(item: CheckListItem): void {
    try {
      this.newItem = { _id: "1234", description: 'משימה חדשה', isDone: false }
      if (this.checkList.items.length > 0) {
        {
          const maxId: string = this.checkList.items!.reduce((max, item) => (item._id > max ? item._id : max), this.checkList.items[0]._id);
          if (maxId) { item._id = (parseInt(maxId) + 1).toString() }
          else item._id = "0"
        }
      }
      else item._id = "0";
      this.checkList.items.push(item);
      this.checkListService.updateCheckList(this.checkList);
      this.editNewItem = false
    }
    catch (err) {
      alert("ההוספה נכשלה, אנא נסה שוב");
    }
  }

}