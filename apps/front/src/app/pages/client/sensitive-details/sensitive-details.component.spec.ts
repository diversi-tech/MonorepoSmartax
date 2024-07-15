import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensitiveDetailsComponent } from './sensitive-details.component';

describe('SensitiveDetailsComponent', () => {
  let component: SensitiveDetailsComponent;
  let fixture: ComponentFixture<SensitiveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensitiveDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensitiveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
