import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../_services/timer.service';
import { Timer } from '../_models/timer';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy {
  private timerInterval: any;
  public totalSeconds: number = 0;
  public timerDisplay: string = '00:00:00';
  public isStartDisabled: boolean = false;
  public isStopDisabled: boolean = true;
  currentTimer: Timer
  userId: string=""
  @Input() taskId!: string;

  constructor(private timerService: TimerService, private tokenService: TokenService) {
  }
  ngOnInit(): void {
    this.getUserId();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  getUserId(){
    this.userId=this.tokenService.getCurrentDetail('_id')
  }

  private clearTimer(): void {
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

  public startTimer(): void {
    this.timerInterval = setInterval(() => this.countUpTimer(), 1000);
    this.isStartDisabled = true;
    this.isStopDisabled = false;
  }

  public saveTimer(): void {
    this.clearTimer();
    this.isStartDisabled = false;
    this.isStopDisabled = true;

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
      },
      error: (error) => {
        console.error('Error saving time:', error);
      }
    });
  }

  private countUpTimer(): void {
    this.totalSeconds++;
    this.updateTimerDisplay();
  }
}
