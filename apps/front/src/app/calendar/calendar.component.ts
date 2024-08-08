import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MeetService } from '../_services/meet.service';
import { Meet } from '../_models/meet.module';
import { MeetComponent } from '../meet/meet.component';
import { TaskComponent } from '../task/task.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';
import { TaskService } from '../_services/task.service';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone: true,
  imports: [FullCalendarModule, AsyncPipe, DatePipe, DialogModule, ButtonModule]
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {

    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg),
  };

  eventsPromise: Promise<EventInput[]> = Promise.resolve([]);
  eventsTasksPromise: Promise<EventInput[]> = Promise.resolve([]);
  allMeetings: Meet[] = []
  currentDate: string = ""

  modal: boolean = false;
  add: boolean = false;
  selectedEvent: EventInput | null = null;
  @ViewChild('modalContent', { read: ViewContainerRef }) modalContent: ViewContainerRef | undefined;

  constructor(private meetService: MeetService,private taskService:TaskService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsPromise = new Promise(resolve => {
      this.meetService.getAllMeetings().subscribe(
        meetings => {
          this.allMeetings = meetings
          const events: EventInput[] = this.allMeetings.map(meet => {
            const startDate = new Date(meet.date);
            const startTime = new Date(meet.beginningTime);

            startDate.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());

            return {
              id: meet._id,
              title: 'meeting',
              start: startDate.toISOString()
            };
          });

          this.taskService.getAllTasks().subscribe(
            tasks => {
              tasks.forEach(task => {
                events.push({
                  id: task._id,
                  title: 'task',
                  start: task.startDate
                });
              });
              resolve(events);
            },
            error => {
              console.error('Error loading tasks:', error);
              resolve(events);
            }
          );
        },
        error => {
          console.error('Error loading meetings:', error);
          resolve([]);
        }
      )
    })
  }

  // בעת לחיצה על יום 
  handleDateClick(arg: any) {
    this.add = true;
    this.currentDate=arg.dateStr
  };

  addType(type:string){
    if(type=='meeting')
      this.loadMeetComponent('null');

    if(type=='task')
        this.loadTaskComponent('create');
      
      // this.showDialog();
      this.modal=true
      this.add = false

  }

  // בעת לחיצה על אירוע
  handleEventClick(arg: any) {
    if(arg.event.title==='meeting')
      this.loadMeetComponent(arg.event.id);

    if(arg.event.title==='task')
        this.loadTaskComponent(arg.event.id);

      this.showDialog();
  }
  

  showDialog() {
    this.modal = true;
  }

  hideDialog() {
    this.modal = false;
    this.loadEvents();
  }

  loadTaskComponent(taskId: string) {
    if (this.modalContent) {
      this.modalContent.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TaskComponent);
      const componentRef = this.modalContent.createComponent(componentFactory);
      componentRef.instance.taskId = taskId;
      componentRef.instance.closeModal.subscribe(() => {
        this.hideDialog();
      });
    }
  }

  loadMeetComponent(meetingId: string) {
    if (this.modalContent) {
      this.modalContent.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MeetComponent);
      const componentRef = this.modalContent.createComponent(componentFactory);
      componentRef.instance.meetingId = meetingId;
      componentRef.instance.selectedDate = this.currentDate;
      componentRef.instance.closeModal.subscribe(() => {
        this.hideDialog();
      });
    }
  }

  getAdjustedTime(date: Date): string {
    const adjustedTime = new Date(date);
    adjustedTime.setHours(adjustedTime.getHours() - 3); // מוריד 3 שעות מהזמן המקורי רק בתצוגה
    return adjustedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

}
