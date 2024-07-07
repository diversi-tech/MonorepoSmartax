import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocTaskComponent } from './upload-doc-task.component';

describe('UploadDocTaskComponent', () => {
  let component: UploadDocTaskComponent;
  let fixture: ComponentFixture<UploadDocTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD:progect-angular/src/app/pages/client/client-profile/client-profile.component.spec.ts
    imports: [ClientProfileComponent]
})
=======
      declarations: [UploadDocTaskComponent]
    })
>>>>>>> ee8a15e04c31cd548c56f1b5726a14bbf520a45e:progect-angular/src/app/upload-doc-task/upload-doc-task.component.spec.ts
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadDocTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
