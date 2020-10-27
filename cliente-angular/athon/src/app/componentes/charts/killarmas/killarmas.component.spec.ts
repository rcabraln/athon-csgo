import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillarmasComponent } from './killarmas.component';

describe('KillarmasComponent', () => {
  let component: KillarmasComponent;
  let fixture: ComponentFixture<KillarmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KillarmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KillarmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
