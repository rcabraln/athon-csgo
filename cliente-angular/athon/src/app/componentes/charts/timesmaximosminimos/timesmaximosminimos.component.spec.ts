import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesmaximosminimosComponent } from './timesmaximosminimos.component';

describe('TimesmaximosminimosComponent', () => {
  let component: TimesmaximosminimosComponent;
  let fixture: ComponentFixture<TimesmaximosminimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesmaximosminimosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesmaximosminimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
