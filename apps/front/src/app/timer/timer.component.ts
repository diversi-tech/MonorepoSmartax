import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../_services/timer.service';
import { Timer } from '../_models/timer';
import { TokenService } from '../_services/token.service';
import { ButtonDirective, Button } from 'primeng/button';
import { UserService } from '../_services/user.service';
import { IconProfileComponent } from '../share/icon-profile/icon-profile.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule,ButtonDirective,Button, IconProfileComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy {

  private timerInterval: any;
  public totalSeconds: number = 0;
  public timerDisplay: string = '00:00:00';
  public isStartDisabled: boolean = true;
  public showList: boolean = false;
  currentTimer: Timer
  userId: string=""
  @Input() taskId!: string;
  allTimers: Timer[] = [];
  //
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  formattedTotalTime: string = '00:00:00';

  userNames: { [userId: string]: string } = {};

  constructor(private timerService: TimerService, private tokenService: TokenService, private userService: UserService) {
  }
  ngOnInit(): void {
    this.getUserId();
    this.getAllTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  getUserId(){
    this.userId=this.tokenService.getCurrentDetail('_id')
  }

 clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimerDisplay(): void {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds - hours * 3600) / 60);
    const seconds = this.totalSeconds - (hours * 3600 + minutes * 60);

    this.timerDisplay = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  showTimer(): void {
    this.startTimer();
    this.isStartDisabled = false;
}

  public startTimer(): void {
    this.timerInterval = setInterval(() => this.countUpTimer(), 1000);
  }

  showStart(): void {
    this.saveTimer();
    this.isStartDisabled = true;
  }

  public saveTimer(): void {
    this.clearTimer();

    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds - hours * 3600) / 60);
    const seconds = this.totalSeconds - (hours * 3600 + minutes * 60);
    this.currentTimer =
    {
      taskId: this.taskId,
      userId: this.userId,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }

    this.timerService.saveTime(this.currentTimer).subscribe({
      next: (response) => {
        console.log('Time saved successfully:', response);
        this.updateTotalTime(this.currentTimer);
        this.resetTimer();
        this.allTimers.push(response)
      },
      error: (error) => {
        console.error('Error saving time:', error);
      }
    });
  }

  private resetTimer(): void {
    this.totalSeconds = 0;
    this.timerDisplay = '00:00:00';
  }

  private countUpTimer(): void {
    this.totalSeconds++;
    this.updateTimerDisplay();
  }

updateTotalTime(timer: Timer): void {
    this.seconds += timer.seconds;
    this.minutes += timer.minutes + Math.floor(this.seconds / 60);
    this.seconds = this.seconds % 60;

    this.hours += timer.hours + Math.floor(this.minutes / 60);
    this.minutes = this.minutes % 60;

    this.updateFormattedTotalTime();
  }

  updateFormattedTotalTime(): void {
    this.formattedTotalTime = `${this.pad(this.hours)}:${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
  }

  getAllTimer(): void {
    this.timerService.getAllTimer().subscribe(
      data=>{
        this.allTimers = data.filter((timer) => timer.taskId === this.taskId);
        console.log(this.allTimers);
        this.calculateTotalTime();
      },
      error=>{
        console.log(error);
        
      }
    );
  }
  calculateTotalTime(): void {
    let totalSeconds = 0;

    this.allTimers.forEach((timer) => {
      totalSeconds += timer.hours * 3600 + timer.minutes * 60 + timer.seconds;
    });

    this.hours = Math.floor(totalSeconds / 3600);
    this.minutes = Math.floor((totalSeconds % 3600) / 60);
    this.seconds = totalSeconds % 60;

    this.updateFormattedTotalTime();

    console.log(`Total Time: ${this.hours} hours, ${this.minutes} minutes, ${this.seconds} seconds`);
  }



  getUserNameById(userId: string): string {
    if (!this.userNames[userId]) {
      this.userService.findOne(userId).subscribe(
        data => {
          this.userNames[userId] = data.userName;
        },
        error => {
          console.log(error);
        }
      );
    }
    return this.userNames[userId] || 'Loading...';
  }
}
