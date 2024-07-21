import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeClientCreateComponent } from './type-client-create.component';

describe('TypeClientCreateComponent', () => {
  let component: TypeClientCreateComponent;
  let fixture: ComponentFixture<TypeClientCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeClientCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeClientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
