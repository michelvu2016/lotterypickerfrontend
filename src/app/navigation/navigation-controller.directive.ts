import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';


const SHOW_DROPDOWN_CLASS = 'open';

@Directive({
   selector: '[appNavigationController]'
})
export class NavigationControllerDirective {

  private dropdownShown = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseover')
  openDropdown(eventData: Event) {
      this.renderer.addClass(this.elementRef.nativeElement, SHOW_DROPDOWN_CLASS);
      this.dropdownShown = false;
    }

  @HostListener('mouseout')
  closeDroupDowan(eventData: Event) {
    this.renderer.removeClass(this.elementRef.nativeElement, SHOW_DROPDOWN_CLASS);
    this.dropdownShown = true;
  }


}
