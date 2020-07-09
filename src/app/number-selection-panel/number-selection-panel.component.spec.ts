import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSelectionPanelComponent } from './number-selection-panel.component';

describe('NumberSelectionPanelComponent', () => {
  let component: NumberSelectionPanelComponent;
  let fixture: ComponentFixture<NumberSelectionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberSelectionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSelectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
