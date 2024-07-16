import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateYearlyReportComponent } from './create-yearly-report.component';
import { Button } from 'primeng/button';
describe('CreateYearlyReportComponent', () => {
  let component: CreateYearlyReportComponent;
  let fixture: ComponentFixture<CreateYearlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateYearlyReportComponent,Button],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateYearlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
