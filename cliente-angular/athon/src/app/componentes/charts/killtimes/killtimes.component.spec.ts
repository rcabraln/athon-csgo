import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KilltimesComponent } from './killtimes.component';

describe('KilltimesComponent', () => {
  let component: KilltimesComponent;
  let fixture: ComponentFixture<KilltimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KilltimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KilltimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
