import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesvitoriasComponent } from './timesvitorias.component';

describe('TimesvitoriasComponent', () => {
  let component: TimesvitoriasComponent;
  let fixture: ComponentFixture<TimesvitoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesvitoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesvitoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
