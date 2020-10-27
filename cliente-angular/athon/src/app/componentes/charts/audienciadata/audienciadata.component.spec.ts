import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienciadataComponent } from './audienciadata.component';

describe('AudienciadataComponent', () => {
  let component: AudienciadataComponent;
  let fixture: ComponentFixture<AudienciadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudienciadataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienciadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
