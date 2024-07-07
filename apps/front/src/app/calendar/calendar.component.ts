import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MeetService } from '../_services/meet.service';
import { Meet } from '../_models/meet.module';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
    standalone: true,
    imports: [FullCalendarModule, AsyncPipe, DatePipe]
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {

    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
  };

  eventsPromise: Promise<EventInput[]> = Promise.resolve([]);
  allMeetings: Meet[] = []

  constructor(private meetService: MeetService) {
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsPromise = new Promise(resolve => {
      this.meetService.getAllMeetings().subscribe(
        meetings => {
          debugger
          this.allMeetings = meetings
          const events: EventInput[] = this.allMeetings.map(meet => ({
            id: meet._id,
            title: 'meeting  ',
            date: meet.date,
            time:meet.beginningTime
          }));
          resolve(events);
        },
        error => {
          console.log(error);
        }
      )
    })
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  };
}