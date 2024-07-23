import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../_models/client.module';
import { Meet } from '../_models/meet.module';
import { Status } from '../_models/status.module';
import { User } from '../_models/user.module';
import { WorkLog } from '../_models/workLog.model';
import { ClientService } from '../_services/client.service';
import { MeetService } from '../_services/meet.service';
import { StatusService } from '../_services/status.service';
import { TaskService } from '../_services/task.service';
import { TokenService } from '../_services/token.service';
import { UserService } from '../_services/user.service';
import { WorkLogService } from '../_services/workLog.service';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MeterGroupModule } from 'primeng/metergroup';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { Task } from '../_models/task.module';
import { TimerService } from '../_services/timer.service';
import { Timer } from '../_models/timer';

@Component({
  selector: 'app-dashboard-user',
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
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css',
})
export class DashboardUserComponent implements OnInit {
  basicData: any;

  basicOptions: any;

  data: any;

  options: any;

  pieData: any;

  pieOptions: any;

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

  myTasks: Task[] = [];

  timers: Timer[] = [];

  myTimeByTask: any;

  constructor(
    private taskService: TaskService,
    private statusService: StatusService,
    private userService: UserService,
    private clientService: ClientService,
    private meetService: MeetService,
    private tokenService: TokenService,
    private workLogService: WorkLogService,
    private timerService: TimerService
  ) {
    this.userRole = this.tokenService.getCurrentDetail('role').level;
    this.employeeId = this.tokenService.getCurrentDetail('_id');
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
      console.log(data);
      this.myTask();
      this.filterTasks();
      this.chartTasks();
    });
  }
  getStatuses() {
    this.statusService.getAllStatuses().subscribe((data: any) => {
      this.statuses = data;
      console.log(data);
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }

  getAllMeets() {
    this.meetService.getAllMeetings().subscribe((data: any) => {
      this.meets = data;
      console.log(data);
      this.todayMeet();
    });
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((data: any) => {
      this.clients = data;
      console.log(data);
    });
  }

  getAllTimer() {
    this.timerService.getAllTimer().subscribe((data: any) => {
      this.timers = data;
      console.log(data);
      this.getTotalTimeByTaskId();
    });
  }

  filterTasks() {
    this.complete = this.myTasks.filter(
      (task) => task.status && task.status.name === 'COMPLETE'
    );
    this.inProgress = this.myTasks.filter(
      (task) => task.status && task.status.name === 'IN PROGRESS'
    );
    this.todo = this.myTasks.filter(
      (task) => task.status && task.status.name === 'TO DO'
    );
    this.none = this.myTasks.filter((task) => !task.status);
  }

  myTask() {
    this.myTasks = this.tasks.filter((task) =>
      task.assignedTo.some((assignee) => assignee._id === this.employeeId)
    );
    console.log(this.employeeId);
  }

  myMeet() {
    return this.meets.filter((m) =>
      m.usersId.some((assignee) => assignee._id === this.employeeId)
    ).length;
  }

  myClient() {
    return this.clients.filter((c) =>
      c.assignTo.some((assignee) => assignee._id === this.employeeId)
    ).length;
  }

  // פונקציה שמחזירה את הזמן הכולל בכל taskId עבור userId מסוים
  getTotalTimeByTaskId() {
    // סינון האובייקטים לפי userId מסוים
    const filteredTasks = this.timers.filter(
      (t) => t.userId === this.employeeId
    );

    // קיבוץ האובייקטים לפי taskId וסכימת הזמן הכולל
    const result = filteredTasks.reduce((acc, task) => {
      const { taskId, hours, minutes, seconds } = task;
      if (!acc[taskId]) {
        acc[taskId] = { hours: 0, minutes: 0, seconds: 0 };
      }
      acc[taskId].hours += hours;
      acc[taskId].minutes += minutes;
      acc[taskId].seconds += seconds;

      // חישוב התוספת של השניות לדקות והדקות לשעות אם יש צורך
      if (acc[taskId].seconds >= 60) {
        acc[taskId].minutes += Math.floor(acc[taskId].seconds / 60);
        acc[taskId].seconds %= 60;
      }
      if (acc[taskId].minutes >= 60) {
        acc[taskId].hours += Math.floor(acc[taskId].minutes / 60);
        acc[taskId].minutes %= 60;
      }

      return acc;
    }, {});
    console.log(result);
    this.myTimeByTask = result;
    return result;
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
            color: textColorSecondary,
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
        // {
        //     label: 'Dataset 1',
        //     fill: false,
        //     borderColor: documentStyle.getPropertyValue('--blue-500'),
        //     yAxisID: 'y',
        //     tension: 0.4,
        //     data: [65, 59, 80, 81, 56, 55, 10]
        // },
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

  chartPie(){
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        // const t = this.myTimeByTask.map(t => t.taskId);

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
  }

  // פונקציה שמחזירה את כל החודשים מתחילת השנה ועד החודש הנוכחי
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
    const currentMonth = now.getMonth(); // החודש הנוכחי (0-11)

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
    this.getAllTimer();
    this.chartPie();
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
      return (
        itemDate.getTime() === today.getTime() &&
        item.usersId.some((assignee) => assignee._id === this.employeeId)
      );
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
    console.log(this.groupedWorkLogs);
    //
    this.bestUsers();
  }

  bestUsers() {
    this.bestUser = this.groupedWorkLogs.sort(
      (a, b) => b.totalHoursWorked - a.totalHoursWorked
    );
    this.bestUser = this.groupedWorkLogs.slice(0, 3);
    // let v1=0
    // let v2=0
    // let v3=0
    // this.groupedWorkLogs.sort((a, b) => b.totalHoursWorked - a.totalHoursWorked);
    // for (let i = 0; i < 3; i++) {
    //   v1 = this.groupedWorkLogs[i].totalHoursWorked;

    // }
    console.log(this.bestUser);

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
