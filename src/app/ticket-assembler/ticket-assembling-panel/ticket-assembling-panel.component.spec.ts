import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAssemblingPanelComponent } from './ticket-assembling-panel.component';

describe('TicketAssemblingPanelComponent', () => {
  let component: TicketAssemblingPanelComponent;
  let fixture: ComponentFixture<TicketAssemblingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAssemblingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAssemblingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
