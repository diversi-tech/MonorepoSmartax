import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportClientMonthlyReportComponent } from './report-client-monthly-report.component';

describe('ReportClientMonthlyReportComponent', () => {
  let component: ReportClientMonthlyReportComponent;
  let fixture: ComponentFixture<ReportClientMonthlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportClientMonthlyReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportClientMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
