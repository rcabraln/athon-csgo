import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadoresprimeirakillComponent } from './jogadoresprimeirakill.component';

describe('JogadoresprimeirakillComponent', () => {
  let component: JogadoresprimeirakillComponent;
  let fixture: ComponentFixture<JogadoresprimeirakillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogadoresprimeirakillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadoresprimeirakillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
