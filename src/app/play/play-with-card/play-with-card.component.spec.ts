import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayWithCardComponent } from './play-with-card.component';

describe('PlayWithCardComponent', () => {
  let component: PlayWithCardComponent;
  let fixture: ComponentFixture<PlayWithCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayWithCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayWithCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
