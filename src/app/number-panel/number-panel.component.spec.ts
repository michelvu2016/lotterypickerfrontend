import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPanelComponent } from './number-panel.component';

describe('NumberPanelComponent', () => {
  let component: NumberPanelComponent;
  let fixture: ComponentFixture<NumberPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
