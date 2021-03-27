import { componentFactoryName } from '@angular/compiler';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NumberDecorDirective } from './number-decor.directive';

@Component({
  template: `
            <div appNumberDecor [defaultClass]="yellow" [highlightClass]="blue">Text in blue</div>
            <div appNumberDecor [defaultClass]="yellow">Text in blue</div>
            
            `,
  providers: [
    NumberDecorDirective
  ]
})
class TestComponent {

}

describe('NumberDecorDirective', () => {
  let testComp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let highlightedElm: DebugElement[] = [];
  let dir: NumberDecorDirective;
  let notHiLite: DebugElement[] = [];

  beforeEach(async () => {
     TestBed.configureTestingModule({
       declarations: [TestComponent]
     }).compileComponents();
     fixture = TestBed.createComponent(TestComponent);
     testComp = fixture.componentInstance;
     fixture.detectChanges();
  })

  it('should create an instance', () => {
    
    expect(testComp).toBeTruthy();
    
  });

  beforeEach(() => {
    highlightedElm = fixture.debugElement.queryAll(By.directive(NumberDecorDirective));
    notHiLite = fixture.debugElement.queryAll(By.css('h2:not([appNumberDecor'));
  })

  it('should have only 1 div to be highlighted', () => {
    expect(highlightedElm.length).toBe(1);
  })

  it('Div 1 should highlight div elem with blue color', () => {
     const bgColor = highlightedElm[0].nativeElement.style.backgroundColor;
     expect(bgColor).toBe('yellow');
  })

  beforeEach('directive', () => {
    dir = notHiLite[0].injector.get(NumberDecorDirective) as NumberDecorDirective;

    
  })

  it("second div should have default class", () => {
    expect(notHiLite[0].nativeElement.class.list).toBe(dir.defaultClass);
  })

});
