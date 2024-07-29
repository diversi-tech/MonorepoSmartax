import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportClientYearlyReportComponent } from './report-client-yearly-report.component';

describe('ReportClientYearlyReportComponent', () => {
  let component: ReportClientYearlyReportComponent;
  let fixture: ComponentFixture<ReportClientYearlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportClientYearlyReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportClientYearlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
