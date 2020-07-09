import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawnNumberUpdateComponent } from './drawn-number-update.component';

describe('DrawnNumberUpdateComponent', () => {
  let component: DrawnNumberUpdateComponent;
  let fixture: ComponentFixture<DrawnNumberUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawnNumberUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawnNumberUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
