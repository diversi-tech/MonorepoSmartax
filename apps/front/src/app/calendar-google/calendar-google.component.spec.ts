import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarGoogleComponent } from './calendar-google.component';

describe('CalendarGoogleComponent', () => {
  let component: CalendarGoogleComponent;
  let fixture: ComponentFixture<CalendarGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
