import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCalendarioComponent } from './grid-calendario.component';

describe('GridCalendarioComponent', () => {
  let component: GridCalendarioComponent;
  let fixture: ComponentFixture<GridCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCalendarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
