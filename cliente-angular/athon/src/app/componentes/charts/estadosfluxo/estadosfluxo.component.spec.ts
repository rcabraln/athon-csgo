import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosfluxoComponent } from './estadosfluxo.component';

describe('EstadosfluxoComponent', () => {
  let component: EstadosfluxoComponent;
  let fixture: ComponentFixture<EstadosfluxoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosfluxoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosfluxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
