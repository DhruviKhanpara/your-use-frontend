import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplibillhomeComponent } from './splibillhome.component';

describe('SplibillhomeComponent', () => {
  let component: SplibillhomeComponent;
  let fixture: ComponentFixture<SplibillhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplibillhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplibillhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
