import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearlyReportStepsComponent } from './yearly-report-steps.component';

describe('YearlyReportStepsComponent', () => {
  let component: YearlyReportStepsComponent;
  let fixture: ComponentFixture<YearlyReportStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyReportStepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YearlyReportStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
