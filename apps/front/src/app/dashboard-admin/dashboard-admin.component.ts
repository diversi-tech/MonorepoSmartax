import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { TaskService } from '../_services/task.service';
import { StatusService } from '../_services/status.service';
import { Status } from '../_models/status.module';
import { Task } from '../_models/task.module';
import { max } from 'class-validator';
import { User } from '../_models/user.module';
import { Meet } from '../_models/meet.module';
import { Client } from '../_models/client.module';
import { UserService } from '../_services/user.service';
import { ClientService } from '../_services/client.service';
import { MeetService } from '../_services/meet.service';
import { TokenService } from '../_services/token.service';
import { WorkLogService } from '../_services/workLog.service';
import { WorkLog } from '../_models/workLog.model';
import { MeterGroupModule } from 'primeng/metergroup';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    SplitterModule,
    PanelModule,
    AvatarModule,
    ButtonModule,
    ChartModule,
    MeterGroupModule,
    RouterLink,
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent implements OnInit {
  basicData: any;

  basicOptions: any;

  data: any;

  options: any;

  tasks: Task[] = [];

  users: User[] = [];

  meets: Meet[] = [];

  clients: Client[] = [];

  statuses: Status[] = [];
  //
  complete: Task[] = [];
  inProgress: Task[] = [];
  todo: Task[] = [];
  none: Task[] = [];

  userRole: number;

  workLogs: WorkLog[] = [];
  groupedWorkLogs: any[] = [];

  employeeId: string | null = null;

  bestUser: any[] = [];

  valueUser1: any[] = [];
  valueUser2: any[] = [];
  valueUser3: any[] = [];

  constructor(
    private taskService: TaskService,
    private statusService: StatusService,
    private userService: UserService,
    private clientService: ClientService,
    private meetService: MeetService,
    private tokenService: TokenService,
    private workLogService: WorkLogService
  ) {
    this.userRole = this.tokenService.getCurrentDetail('role').level;
    this.employeeId = this.tokenService.getCurrentDetail('_id');
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
      this.filterTasks();
      this.chartTasks();
    });
  }
  getStatuses() {
    this.statusService.getAllStatuses().subscribe((data: any) => {
      this.statuses = data;
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  getAllMeets() {
    this.meetService.getAllMeetings().subscribe((data: any) => {
      this.meets = data;
      this.todayMeet();
    });
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((data: any) => {
      this.clients = data;
    });
  }

  filterTasks() {
    this.complete = this.tasks.filter(
      (task) => task.status && task.status.name === 'COMPLETE'
    );
    this.inProgress = this.tasks.filter(
      (task) => task.status && task.status.name === 'IN PROGRESS'
    );
    this.todo = this.tasks.filter(
      (task) => task.status && task.status.name === 'TO DO'
    );
    this.none = this.tasks.filter((task) => !task.status);
  }

  // chart tasks - status
  chartTasks() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['COMPLETE', 'IN PROGRESS', 'TO DO', 'NONE'],
      datasets: [
        {
          label: 'Tasks',
          data: [
            this.complete.length,
            this.todo.length,
            this.inProgress.length,
            this.none.length,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 159, 64)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            coenelor: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
          max: this.tasks.length,
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  chartPayment() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const months = this.getMonthsUntilCurrent();

    this.data = {
      labels: months,
      datasets: [
        {
          label: 'סך חודשי',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--purple-500'),
          yAxisID: 'y1',
          tension: 0.4,
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };
  }

  // A function that returns all the months from the beginning of the year to the current month
  getMonthsUntilCurrent() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const now = new Date();
    const currentMonth = now.getMonth(); 

    return months.slice(0, currentMonth + 1);
  }

  ngOnInit(): void {
    // data
    this.getAllTasks();
    this.getStatuses();
    this.getAllUsers();
    this.getAllMeets();
    this.getAllClients();
    this.chartPayment();
    this.getWorkLogs();
  }

  newTask() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.tasks.filter((item) => {
      const itemDate = new Date(item.deadline);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === today.getTime();
    }).length;
  }

  todayMeet() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.meets.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === today.getTime();
    }).length;
  }

  todayClient() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.clients.filter((item) => {
      const itemDate = new Date(item.joinDate);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === today.getTime();
    }).length;
  }

  getWorkLogs() {
    if (this.userRole === 3) {
      this.workLogService.getWorkLogs().subscribe(
        (response: WorkLog[]) => {
          if (response && Array.isArray(response)) {
            this.workLogs = response.map((log) => ({
              ...log,
              date: new Date(log.date),
              timeEntries: log.timeEntries.map((entry) => ({
                ...entry,
                checkIn: entry.checkIn ? new Date(entry.checkIn) : null,
                checkOut: entry.checkOut ? new Date(entry.checkOut) : null,
              })),
            }));
            this.groupWorkLogsByEmployeeAndDate();
          } else {
            console.error('Data received from API is not an array:', response);
          }
        },
        (error) => {
          console.error('Error fetching work logs:', error);
        }
      );
    } else if (this.userRole === 6) {
      this.workLogService.getWorkLogsByEmployeeId(this.employeeId).subscribe(
        (response: WorkLog[]) => {
          if (response && Array.isArray(response)) {
            this.workLogs = response.map((log) => ({
              ...log,
              date: new Date(log.date),
              timeEntries: log.timeEntries.map((entry) => ({
                ...entry,
                checkIn: entry.checkIn ? new Date(entry.checkIn) : null,
                checkOut: entry.checkOut ? new Date(entry.checkOut) : null,
              })),
            }));
            this.groupWorkLogsByEmployeeAndDate();
          } else {
            console.error('Data received from API is not an array:', response);
          }
        },
        (error) => {
          console.error('Error fetching work logs:', error);
        }
      );
    } else {
      console.error('User role not supported for fetching work logs.');
    }
  }

  groupWorkLogsByEmployeeAndDate() {
    const grouped = this.workLogs.reduce((acc, log) => {
      const key = `${log.employeeId}_${new Date(log.date).toLocaleDateString(
        'en-CA'
      )}`;
      if (!acc[key]) {
        acc[key] = {
          logs: [],
          employeeId: log.employeeId,
          date: new Date(log.date).toLocaleDateString('en-CA'),
          totalHoursWorked: 0,
        };
      }
      acc[key].logs.push(log);
      acc[key].totalHoursWorked += log.timeEntries.reduce(
        (sum, entry) => sum + (entry.hoursWorked || 0),
        0
      );
      return acc;
    }, {});

    this.groupedWorkLogs = Object.values(grouped);
    this.bestUsers();
  }

  bestUsers() {
    this.bestUser = this.groupedWorkLogs.sort(
      (a, b) => b.totalHoursWorked - a.totalHoursWorked
    );
    this.bestUser = this.groupedWorkLogs.slice(0, 3);
    this.valueUser1 = [
      {
        label: 'שעות עבודה',
        value: this.bestUser[0].totalHoursWorked,
        color: '#34d399',
      },
    ];

    this.valueUser2 = [
      {
        label: 'שעות עבודה',
        value: this.bestUser[1].totalHoursWorked,
        color: '#60a5fa',
      },
    ];

    this.valueUser3 = [
      {
        label: 'שעות עבודה',
        value: this.bestUser[2].totalHoursWorked,
        color: '#c084fc',
      },
    ];
  }
}
