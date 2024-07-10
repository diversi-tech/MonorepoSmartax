import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCheckListComponent } from './task-check-list.component';

describe('TaskCheckListComponent', () => {
  let component: TaskCheckListComponent;
  let fixture: ComponentFixture<TaskCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCheckListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
