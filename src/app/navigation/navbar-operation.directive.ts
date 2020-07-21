import { Directive, Input, ElementRef, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';
import { NavigationEventTriggerConfig } from '../constants/constants';


@Directive({
  selector: '[appNavbarDirective]'
})
export class NavbarOperationDirective {

  _menuName: string;

  @Input("appNavbarDirective")
  set menuName(name) {
    //console.log(">>>Menu drop down: ", name);
    this._menuName = name;
  }

  @Output()
  menuActiveEvent = new EventEmitter<NavigationEventTriggerConfig>();

  constructor(private hostElemRef: ElementRef, private renderer: Renderer2) { 
    //console.log(">>Host element:", hostElemRef);
    
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.renderer.addClass(this.hostElemRef.nativeElement, "active");
    const event: NavigationEventTriggerConfig = {
       menuName: this._menuName,
       eventName: 'mouseover'
    };
    this.menuActiveEvent.emit(event);
  }

  @HostListener('mouseout') 
  onMouseOut() {
    this.renderer.removeClass(this.hostElemRef.nativeElement, "active");
    const event: NavigationEventTriggerConfig = {
      menuName: this._menuName,
      eventName: 'mouseout'
   };
   this.menuActiveEvent.emit(event);
  }

}
