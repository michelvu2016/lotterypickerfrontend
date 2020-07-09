import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedNumberComponent } from './selected-number.component';

describe('SelectedNumberComponent', () => {
  let component: SelectedNumberComponent;
  let fixture: ComponentFixture<SelectedNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
