import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediakilljogadoresComponent } from './mediakilljogadores.component';

describe('MediakilljogadoresComponent', () => {
  let component: MediakilljogadoresComponent;
  let fixture: ComponentFixture<MediakilljogadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediakilljogadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediakilljogadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
