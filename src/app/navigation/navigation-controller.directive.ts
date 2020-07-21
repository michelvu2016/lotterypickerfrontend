import {Directive, ElementRef, HostListener, Renderer2, Input, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NavigationEventTriggerConfig } from '../constants/constants';



const SHOW_DROPDOWN_CLASS = 'show';

@Directive({
   selector: '[appNavigationController]'
})
export class NavigationControllerDirective implements OnInit, OnDestroy, AfterViewInit {

  private dropdownShown = false;
  private _menuName : string;
  private toppLevenMenuEventEmitter = new EventEmitter<string>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    //console.log(">>>ngAfterViewInit. Subscribe the menu event");
     this.toppLevenMenuEventEmitter.subscribe((menuEvent : NavigationEventTriggerConfig) => {
       //console.log(`>>>[NavigationControllerDirective] received event. name: ${menuEvent.eventName} menu name: ${menuEvent.menuName}`);
        if (menuEvent.menuName == this._menuName) {
           if (menuEvent.eventName == 'mouseover') {
            this.openDropDown();
           } else if (menuEvent.eventName == 'mouseout') {
             this.closeDropDown();
           }
        }

     });
  }

  @Input('appNavigationController')
  set menuName(menuTriggerInfo) {
    //console.log(`Set menuTriggerInfo. menu name: ${menuTriggerInfo.menuName}`);
     this._menuName = menuTriggerInfo.menuName;
     this.toppLevenMenuEventEmitter =  menuTriggerInfo.eventEmitter;
  }


  @HostListener('mouseover')
  onMouseOver(eventData: Event) {

     this.openDropDown();
      
    }

  @HostListener('mouseout')
  @HostListener('click')
  onMouseOut(eventData: Event) {

    this.closeDropDown();

  }

  private openDropDown() {
    this.renderer.addClass(this.elementRef.nativeElement, SHOW_DROPDOWN_CLASS);
        //console.log("Drop down menu shown");
        this.dropdownShown = false;
  }

  private closeDropDown() {
    this.renderer.removeClass(this.elementRef.nativeElement, SHOW_DROPDOWN_CLASS);
    this.dropdownShown = true;
  }

}
