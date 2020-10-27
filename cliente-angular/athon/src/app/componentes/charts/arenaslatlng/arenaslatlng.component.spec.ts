import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaslatlngComponent } from './arenaslatlng.component';

describe('ArenaslatlngComponent', () => {
  let component: ArenaslatlngComponent;
  let fixture: ComponentFixture<ArenaslatlngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenaslatlngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaslatlngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
