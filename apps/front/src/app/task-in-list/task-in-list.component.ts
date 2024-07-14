import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../_models/task.module';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { NgFor, NgStyle, NgClass, DatePipe } from '@angular/common';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';

@Component({
    selector: 'app-task-in-list',
    templateUrl: './task-in-list.component.html',
    styleUrl: './task-in-list.component.css',
    standalone: true,
    imports: [IconProfileComponent, NgFor, NgStyle, NgClass, ButtonDirective, RouterLink, DatePipe]
})
export class TaskInListComponent implements OnInit{
  @Input() task!: Task;

  ngOnInit(): void {
  }


  constructor() {}
 

 
}