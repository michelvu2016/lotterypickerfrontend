import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDrawnNumberComponent } from './current-drawn-number.component';

describe('CurrentDrawnNumberComponent', () => {
  let component: CurrentDrawnNumberComponent;
  let fixture: ComponentFixture<CurrentDrawnNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDrawnNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDrawnNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
