import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Todo {
  id: number;
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-task-check-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-check-list.component.html',
  styleUrl: './task-check-list.component.css',
})
export class TaskCheckListComponent {

  // title: string = new Date().toDateString();
  // data: Todo[] = [
  //   { id: -1, name: "Morning walk", completed: true },
  //   { id: -2, name: "Meeting with Holden Caulfield", completed: true },
  //   { id: -3, name: "Call Alper Kamu", completed: false },
  //   { id: -4, name: "Book flight to Hungary", completed: false },
  //   { id: -5, name: "Blog about CSS box model", completed: true }
  // ];
  // filteredData: Todo[] = this.data;
  // count: number = this.data.length;

  // filterTypes: { name: string; queryParam: string | null; queryValue: string | null; active: boolean }[] = [
  //   { name: "All", queryParam: null, queryValue: null, active: true },
  //   { name: "Active", queryParam: "completed", queryValue: "false", active: false },
  //   { name: "Completed", queryParam: "completed", queryValue: "true", active: false }
  // ];

  // constructor() {}

  // ngOnInit(): void {
  //   this.listUI(this.data);
  //   this.filterUI();
  // }

  // addTask({ id = new Date().getUTCMilliseconds(), name = `New task #${new Date().getUTCMilliseconds()}`, completed = false } = {}): void {
  //   const newTask: Todo = { id, name, completed };
  //   this.data.push(newTask);
  //   this.listUI(this.data);
  //   this.updateCount();
  //   this.filterData();
  // }

  // deleteTask(id: number): void {
  //   this.data = this.data.filter(task => task.id !== id);
  //   this.listUI(this.data);
  //   this.updateCount();
  //   this.filterData();
  // }

  // toggleStatus(id: number): void {
  //   this.data = this.data.map(task => {
  //     if (task.id === id) task.completed = !task.completed;
  //     return task;
  //   });
  //   this.listUI(this.data);
  //   this.filterData();
  // }

  // filterData(queryParam: string | null = null, queryValue: string | null = null): void {
  //   this.filteredData =
  //     !queryValue && !queryParam
  //       ? this.data
  //       : this.data.filter(task => String(task[queryParam]) === queryValue);
  //   this.listUI(this.filteredData);
  //   this.filterTypes = this.filterTypes.map(filter => {
  //     filter.active = String(filter.queryParam) === String(queryParam) && String(filter.queryValue) === queryValue;
  //     return filter;
  //   });
  // }

  // updateCount(): void {
  //   this.count = this.data.length;
  // }

  // listUI(data: Todo[] = this.data): void {
  //   // Implement your UI logic here
  // }

  // filterUI(filterTypes: { name: string; queryParam: string | null; queryValue: string | null; active: boolean }[] = this.filterTypes): void {
  //   // Implement your UI logic here
  // }

  // =========================================
  // cont = 1;
  // days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  // date: Date = new Date()
  // constructor() {
  // }

  // addNode(checked: boolean = false) {
  //   const newNode = document.createElement('article');
  //   // newNode.innerHTML = `<input type='checkbox' id='t${this.cont}' ${checked ? 'checked' : ''}/> <label for='t${this.cont}'></label><span contenteditable='true'>Task #${this.cont}</span>`;
  //   newNode.innerHTML = `<input type='checkbox' id='t${this.cont}' ${checked ? 'checked' : ''} onchange='updateText(this)'/> <label for='t${this.cont}'></label><span contenteditable='true' id='span${this.cont}'>${checked ? 'Task #' + this.cont + ':' : 'Task #' + this.cont}</span>`;

  //   newNode.id = `article${this.cont}`;
  //   newNode.ondblclick = this.onDblClick;
  //   this.cont++;
  //   const main_sec = document.getElementById('main_sec');
  //   main_sec.appendChild(newNode);
  //   main_sec.scrollTop = main_sec.scrollHeight;
  // }

  // updateText(checkbox:any) {
  //   var span = document.getElementById('span' + checkbox.id.substring(1));
  //   if (checkbox.checked) {
  //     span.innerHTML = 'Task #' + checkbox.id.substring(1) + ':';
  //   } else {
  //     span.innerHTML = 'Task #' + checkbox.id.substring(1);
  //   }
  // }

  // onDblClick(event: any) {
  //   document.getElementById(event.target.id).remove();
  // }

  tasks = [
    { title: 'A default item', done: false },
    { title: 'A completed default item', done: true }
  ];

  newTask: string;

  addTask() {
    this.tasks.push({ title: this.newTask, done: false });
    this.newTask = '';
  }

  clearCompleted() {
    this.tasks = this.tasks.filter(task => !task.done);
  }
  
}
