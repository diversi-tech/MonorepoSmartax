import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxRefundsStepsComponent } from './tax-refunds-steps.component';

describe('TaxRefundsStepsComponent', () => {
  let component: TaxRefundsStepsComponent;
  let fixture: ComponentFixture<TaxRefundsStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxRefundsStepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxRefundsStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
