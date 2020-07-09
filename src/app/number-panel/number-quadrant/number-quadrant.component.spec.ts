import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberQuadrantComponent } from './number-quadrant.component';

describe('NumberQuadrantComponent', () => {
  let component: NumberQuadrantComponent;
  let fixture: ComponentFixture<NumberQuadrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberQuadrantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberQuadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
