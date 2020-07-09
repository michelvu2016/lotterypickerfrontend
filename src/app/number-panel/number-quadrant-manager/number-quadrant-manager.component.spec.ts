import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberQuadrantManagerComponent } from './number-quadrant-manager.component';

describe('NumberQuadrantManagerComponent', () => {
  let component: NumberQuadrantManagerComponent;
  let fixture: ComponentFixture<NumberQuadrantManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberQuadrantManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberQuadrantManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
