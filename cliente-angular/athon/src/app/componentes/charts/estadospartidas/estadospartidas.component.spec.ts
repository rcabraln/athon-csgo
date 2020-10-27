import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadospartidasComponent } from './estadospartidas.component';

describe('EstadospartidasComponent', () => {
  let component: EstadospartidasComponent;
  let fixture: ComponentFixture<EstadospartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadospartidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadospartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
