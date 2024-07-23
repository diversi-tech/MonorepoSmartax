import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../../../../../../server/src/Models/client.model';
import { TaskService } from '../../../_services/task.service';

@Component({
  selector: 'app-client-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-tasks.component.html',
  styleUrl: './client-tasks.component.css',
})
export class ClientTasksComponent implements OnInit{

  tasks: Task[] = [];
  client: Client | null = null;
  displayDialog: boolean = false;

  constructor(
    private taskService: TaskService,

  ) { }

  ngOnInit(): void {
    this.client = history.state.client;
    this.getTasks();
  }

  getTasks(): void {
    debugger
    // this.taskService.get(this.client._id)
    //   .subscribe(taks =>
    //     { this.tasks = taks });
    //  console.log(this.client._id, this.tasks)
  }
  
}
