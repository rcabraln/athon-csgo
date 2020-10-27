import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesprimeirakillComponent } from './timesprimeirakill.component';

describe('TimesprimeirakillComponent', () => {
  let component: TimesprimeirakillComponent;
  let fixture: ComponentFixture<TimesprimeirakillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesprimeirakillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesprimeirakillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
