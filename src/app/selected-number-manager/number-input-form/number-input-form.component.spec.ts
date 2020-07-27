import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputFormComponent } from './number-input-form.component';

describe('NumberInputFormComponent', () => {
  let component: NumberInputFormComponent;
  let fixture: ComponentFixture<NumberInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
