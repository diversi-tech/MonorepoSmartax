import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
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


  constructor(private formBuilder: FormBuilder, private checkListService: CheckListService, private checkListItemService: CheckListItemService) { }

  ngOnInit(): void {
    if (this.checkList == null) {
      this.checkList = {
        name: 'רשימת המשימות שלך',
        items: []
      }
      this.editNewItem = true
    }
  }

  deleteList(): void { this.delete.emit(this.checkList._id) }

  updateItem(item: CheckListItem | null): void {
    this.editNameInput = false
    let res1: any | null
    let res2: any | null
    let copy: any | null
    if (item && item._id != "1234") {
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
      if (item) {
        this.saveItem(item)
      } else {
        this.save.emit(this.checkList)
      }
    }
  }

  deleteItem(_id: string): void {
    try {
      if (_id) {
        const index = this.checkList.items.findIndex(item => item._id === _id)
        if (index||index==0) {
          this.checkList.items.splice(index, 1);
          this.checkListService.updateCheckList(this.checkList);
        }
        else {
          this.editNewItem = false;
        }

      }
      else {
        throw new Error('Item not found');
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
  }

  deleteName(): boolean {
    return true;
  }

  editNameInput: boolean = true;
  editName(): void {

    this.editNameInput = !this.editNameInput;
  }

  saveItem(item: CheckListItem): void {
    try {
      const maxId: string = this.checkList.items.reduce((max, item) => (item._id > max ? item._id : max), this.checkList.items[0]._id);
      if (maxId) { item._id = (parseInt(maxId) + 1).toString() }
      else item._id = "0"
      this.checkList.items.push(item);
      this.checkListService.updateCheckList(this.checkList);
      this.newItem = { _id: "1234", description: 'משימה חדשה', isDone: false }
      this.editNewItem = false
    }
    catch (err) {
      console.log("ההוספה נכשלה, אנא נסה שוב");
      this.editNewItem = false
    }
  }

}