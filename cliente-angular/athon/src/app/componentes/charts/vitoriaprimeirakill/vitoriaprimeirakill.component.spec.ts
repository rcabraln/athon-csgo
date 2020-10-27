import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitoriaprimeirakillComponent } from './vitoriaprimeirakill.component';

describe('VitoriaprimeirakillComponent', () => {
  let component: VitoriaprimeirakillComponent;
  let fixture: ComponentFixture<VitoriaprimeirakillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitoriaprimeirakillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitoriaprimeirakillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
