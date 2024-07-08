import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MeetService } from '../_services/meet.service';
import { Meet } from '../_models/meet.module';
import { MeetComponent } from '../meet/meet.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone: true,
  imports: [FullCalendarModule, AsyncPipe, DatePipe, DialogModule]
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {

    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: (arg) => this.handleEventClick(arg)
  };

  eventsPromise: Promise<EventInput[]> = Promise.resolve([]);
  allMeetings: Meet[] = []
  currentDate: string = ""

  visible: boolean = false;
  selectedEvent: EventInput | null = null;
  @ViewChild('modalContent', { read: ViewContainerRef }) modalContent: ViewContainerRef | undefined;

  constructor(private meetService: MeetService, private componentFactoryResolver: ComponentFactoryResolver) {
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
          resolve(events);
        },
        error => {
          console.log(error);
        }
      )
    })
  }

  handleDateClick(arg: any) {
    this.currentDate = arg.dateStr
    this.loadMeetComponent('null');
    this.showDialog();
  };
  handleEventClick(arg: any) {
    // כאשר נלחץ על אירוע בלוח השנה, נשמור אותו ונפתח את המודל
    this.selectedEvent = arg.event;
    this.loadMeetComponent(arg.event.id);
    this.showDialog();
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.loadEvents();
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
