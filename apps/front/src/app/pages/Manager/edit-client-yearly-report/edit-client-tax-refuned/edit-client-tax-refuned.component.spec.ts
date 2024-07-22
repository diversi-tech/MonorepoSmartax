import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditClientTaxRefunedComponent } from './edit-client-tax-refuned.component';

describe('EditClientTaxRefunedComponent', () => {
  let component: EditClientTaxRefunedComponent;
  let fixture: ComponentFixture<EditClientTaxRefunedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClientTaxRefunedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClientTaxRefunedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
