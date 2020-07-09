import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedNumberManagerComponent } from './selected-number-manager.component';

describe('SelectedNumberManagerComponent', () => {
  let component: SelectedNumberManagerComponent;
  let fixture: ComponentFixture<SelectedNumberManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedNumberManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedNumberManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
