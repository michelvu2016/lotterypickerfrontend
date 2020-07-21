import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
//import {elementDef} from '@angular/core/src/view';



@Directive({
  selector: '[appNumberDecor]'
})
export class NumberDecorDirective {

  @Input('defaultClass') defaultClass;
  @Input('highlightClass') highlightClass;


  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  @HostListener('mouseover')
  mouseOver(element: any)
  {

      this.renderer.addClass(this.elementRef.nativeElement, this.highlightClass);


  }

  @HostListener('mouseout')
  mouseOut()
  {
      this.renderer.removeClass(this.elementRef.nativeElement, this.highlightClass);
  }

}
