import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task.module';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.module';

@Component({
    selector: 'app-task-report',
    templateUrl: './task-report.component.html',
    styleUrl: './task-report.component.css',
    standalone: true,
    imports: [ChartModule]
})
export class TaskReportComponent implements OnInit {

    dataOfStatus: any;

    dataOfBeforDedLine:any;

    dataOfStatusAndEmp:any;

    chartOptions:  Task[] | undefined |null;

    tasks: Task[] | undefined |null;

    users: User[] | undefined | null;

    usersSort: undefined | null | number [];


    constructor(
        private taskService: TaskService, 
        private userService: UserService
    ) {}

    ngOnInit() {
        this.taskService.getAllTasks()?.subscribe(tasks => {
            this.tasks = tasks;
            // sort task by status
            this.dataOfStatus = {
                labels: ['complete', 'to do'],
                datasets: [
                    {
                        data: [tasks.filter((obj) => obj.status && obj.status.name == "complete").length, 
                                tasks.filter((obj) =>obj.status && obj.status.name != "complete").length],
                        backgroundColor: [
                            "#42A5F5",
                            "#66BB6A"
                        ],
                        hoverBackgroundColor: [
                            "#64B5F6",
                            "#81C784"
                        ]
                    }
                ]
            };
            this.userService.getAllUsers()
        });
    }
}

