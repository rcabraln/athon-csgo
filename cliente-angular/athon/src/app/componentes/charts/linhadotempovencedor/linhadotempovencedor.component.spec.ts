import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhadotempovencedorComponent } from './linhadotempovencedor.component';

describe('LinhadotempovencedorComponent', () => {
  let component: LinhadotempovencedorComponent;
  let fixture: ComponentFixture<LinhadotempovencedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinhadotempovencedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhadotempovencedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
