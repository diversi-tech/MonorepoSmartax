import { Component, OnInit } from '@angular/core';
// import { GoogleCalendarService } from '../_services/google-calendar.service';

@Component({
  selector: 'app-calendar-google',
  templateUrl: './calendar-google.component.html',
  styleUrls: ['./calendar-google.component.css']
})
export class CalendarComponent implements OnInit {

  // constructor(private googleCalendarService: GoogleCalendarService) { }

  ngOnInit() {
    // this.googleCalendarService.initClient();
  }

  // handleAuthClick() {
  //   this.googleCalendarService.handleAuthClick();
  // }

  // handleSignoutClick() {
  //   this.googleCalendarService.handleSignoutClick();
  // }
}
