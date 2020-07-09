import {Directive, ElementRef, HostListener} from '@angular/core';


@Directive({
   selector: '[appTicketNumberSelected]',
   exportAs: 'appTicketNumberSelected'
})
export class TicketNumberSelectedDirective {
  constructor(private elementRef: ElementRef) {}


@HostListener('onmousedown')
mouseButtonPressed(element: any) {

  }
  
}


