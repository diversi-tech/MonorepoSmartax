import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditClientYearlyReportComponent } from './edit-client-yearly-report.component';

describe('EditClientYearlyReportComponent', () => {
  let component: EditClientYearlyReportComponent;
  let fixture: ComponentFixture<EditClientYearlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClientYearlyReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClientYearlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
