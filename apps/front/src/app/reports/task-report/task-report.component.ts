import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../_services/task.service';
import { UserService } from '../../_services/user.service';
import { ChartModule } from 'primeng/chart';
import { User } from '../../_models/user.module';
import { Task } from '../../_models/task.module';
import { ClientService } from '../../_services/client.service';
import { Client } from '../../_models/client.module';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-task-report',
    templateUrl: './task-report.component.html',
    styleUrl: './task-report.component.css',
    standalone: true,
    imports: [ChartModule, CalendarModule, CommonModule, MultiSelectModule, FormsModule, DropdownModule],
})

export class TaskReportComponent implements OnInit {

    tasks: Task[] | undefined | null;

    baseTask: Task[] | undefined | null;

    dataOfStatusTask: any;

    taskOfBeforDedLine: any;

    taskIsComplete: any;

    taskIsNotComplete: any;

    users: User[] | undefined | null;

    lableUser: string[] = [];

    filteredTasks: Task[] = [];

    TaskIsCompleteByUser: number[] = [];

    dataAllTaskByUser: Task[][] = [];

    dataOfStatusAndEmp: any;

    TaskIsCompleteOnTime: number[] = [];

    selectSort: any = [{ name: "deadline" }, { name: "dueDate" }]



    clients: Client[] | undefined | null;

    lableClient: string[] = [];

    taskByClient: Task[][] = [];

    TaskIsCompleteOnTimeByClient: number[] = [];

    TaskIsCompleteByClient: number[] = [];

    tasksByDate: Task[] | undefined | null;

    dataOfStatusAndClient: any;

    rangeDates: Date[] = [];

    chartOptions: Task[] | undefined | null;

    selectedValue: any;


    constructor(private taskService: TaskService,
                private userService: UserService,
                private clientService: ClientService
            ) {}
    
    //server calls
    ngOnInit() {
        this.taskService.getAllTasks()?.subscribe({
            next: (tasks) => {
                this.tasks = tasks;
                this.baseTask = tasks;
                this.userService.getAllUsers().subscribe({
                    next: (users) => {
                        this.users = users;
                        this.clientService.getAllClients().subscribe({
                            next: (clients) => {
                                this.clients = clients;
                                this.sortTask();
                            },
                            error: (err => {
                                console.log(err);
                            })
                        })
                    },
                    error: (err => {
                        console.log(err);
                    })
                })
            },
            error: (err => {
                console.log(err);
            })
        })
    }

    //Date selection
    onTypeDateChange(e) {
        this.selectedValue = e.value;
    }

    //all sort task
    sortTask() {
        this.sortPieForUser();
        this.sortTaskForUsers();
        this.sortBarForUsers();
        this.sortTaskForClient();
        this.sortBarForClients();
    }

    //sort bar for clients
    sortBarForClients() {
        this.dataOfStatusAndClient = {
            labels: this.lableClient,
            datasets: [
                {
                    label: 'all task by user',
                    backgroundColor: '#42A5F5',
                    data: this.taskByClient.map((data) => { return data.length })
                },
                {
                    label: 'task is complete',
                    backgroundColor: '#42A5F5',
                    data: this.TaskIsCompleteByClient
                },
                {
                    label: 'task is complete on-time',
                    backgroundColor: '#42A5F5',
                    data: this.TaskIsCompleteOnTimeByClient
                }
            ]
        };
    }

    //sort tasks for client
    sortTaskForClient() {
        this.taskByClient = [];
        this.clients.map((clientToCheck) => {
            this.lableClient.push(clientToCheck.firstName)
            this.filteredTasks = this.tasks.filter((task) => {
                return task.client && String(task.client) == clientToCheck._id
            })
            this.taskByClient.push(this.filteredTasks);
            this.filteredTasks = [];
        })

        this.taskByClient.map((data) => {
            this.TaskIsCompleteByClient.push(data.filter(task => {
                if (task.status && task.status.name === "COMPLETE")
                    return task;
            }).length);
        })

        this.taskByClient.map((data) => {
            this.TaskIsCompleteOnTimeByClient.push(data.filter(task => {
                if (task.status && task.status.name === "COMPLETE" &&
                    task.dueDate <= task.deadline)
                    return task;
            }).length);
        })
    }

    //sort Bar for users
    sortBarForUsers() {
        debugger
        //bar sort Task per user
        this.dataOfStatusAndEmp = {
            labels: this.lableUser,
            datasets: [
                {
                    label: 'all task by user',
                    backgroundColor: '#42A5F5',
                    data: this.dataAllTaskByUser.map((data) => { return data.length })
                },
                {
                    label: 'task is complete',
                    backgroundColor: '#42A5F5',
                    data: this.TaskIsCompleteByUser
                },
                {
                    label: 'task is complete on-time',
                    backgroundColor: '#42A5F5',
                    data: this.TaskIsCompleteOnTime
                }
            ]
        };
    }

    //sort tasks for users
    sortTaskForUsers() {
        this.dataAllTaskByUser = [];
        this.users.map((userToCheck) => {
            this.lableUser.push(userToCheck.userName)
            this.filteredTasks = this.tasks.filter((task) => {
                return task.assignedTo.some(user => user._id === userToCheck._id)
            })
            this.dataAllTaskByUser.push(this.filteredTasks);
            this.filteredTasks = [];
        })

        this.dataAllTaskByUser.map((data) => {
            this.TaskIsCompleteByUser.push(data.filter(task => {
                if (task.status && task.status.name === "COMPLETE")
                    return task;
            }).length);
        })

        this.dataAllTaskByUser.map((data) => {
            this.TaskIsCompleteOnTime.push(data.filter(task => {
                if (task.status && task.status.name === "COMPLETE" &&
                    task.dueDate <= task.deadline)
                    return task;
            }).length);
        })
    }

    //pie chart
    sortPieForUser() {
        //pie sort task by status
        this.dataOfStatusTask = {
            labels: ['complete', 'to do'],
            datasets: [
                {
                    data: [this.tasks.filter((obj) => obj.status && obj.status.name === "COMPLETE").length,
                    this.tasks.filter((obj) => obj.status && obj.status.name != "COMPLETE").length],
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

        //pie sort task by complete or not complete before ded-line or after
        this.taskIsComplete = {
            labels: ['task-done', 'task-not-done'],
            datasets: [
                {
                    data: [this.tasks.filter((obj) => (obj.status && obj.status.name == "COMPLETE" && obj.deadline < obj.dueDate)).length,
                    this.tasks.filter((obj) => (obj.status && obj.status.name == "COMPLETE" && obj.deadline > obj.dueDate)).length],
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

        //pie sort task by not complete before ded-line or after
        this.taskIsNotComplete = {
            labels: ['before dead-line', 'after dead-line'],
            datasets: [
                {
                    data: [this.tasks.filter((obj) => (obj.status && obj.status.name != "COMPLETE" && obj.deadline < obj.dueDate)).length,
                    this.tasks.filter((obj) => (obj.status && obj.status.name != "COMPLETE" && obj.deadline > obj.dueDate)).length],
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
    }

    //Select a date type
    onDateSelect(event: any) {
        if (event[0] != null && event[1] != null) {
            this.rangeDates[0] = event[0];//השמאלי
            this.rangeDates[1] = event[1];//הימני
            this.checkStatusDate();
        }
    }

    //filtering after selecting a date
    async checkStatusDate(): Promise<void> {
        this.tasks = this.baseTask;
        let d = new Date();
        if (this.selectedValue === undefined) {
            console.log("No filtering");
            return;
        }
        try {
            if (this.selectedValue.name === "dueDate") {
                this.tasks = this.tasks.filter((task) => {
                    d = new Date(task.dueDate);
                    return d < this.rangeDates[1] && d > this.rangeDates[0];
                });
            }
            else {
                this.tasks = this.tasks.filter((task) => {
                    d = new Date(task.deadline);
                    console.log(`deadline: ${task.deadline}, range: ${this.rangeDates[0]} - ${this.rangeDates[1]}`);
                    return d < this.rangeDates[1] && d > this.rangeDates[0];
                })
            }
            await this.sortTask();
        } catch (error) {
            console.error("Error filtering tasks:", error);

        }
    }
}