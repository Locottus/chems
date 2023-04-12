import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdValidationComponent } from './pwd-validation.component';

describe('PwdValidationComponent', () => {
  let component: PwdValidationComponent;
  let fixture: ComponentFixture<PwdValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwdValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwdValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
