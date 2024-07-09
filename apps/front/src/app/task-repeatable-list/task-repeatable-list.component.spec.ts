import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskRepeatableListComponent } from './task-repeatable-list.component';

describe('TaskRepeatableListComponent', () => {
  let component: TaskRepeatableListComponent;
  let fixture: ComponentFixture<TaskRepeatableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskRepeatableListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskRepeatableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
