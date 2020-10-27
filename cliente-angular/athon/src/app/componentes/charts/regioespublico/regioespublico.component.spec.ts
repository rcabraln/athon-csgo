import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioespublicoComponent } from './regioespublico.component';

describe('RegioespublicoComponent', () => {
  let component: RegioespublicoComponent;
  let fixture: ComponentFixture<RegioespublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegioespublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegioespublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
