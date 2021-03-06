import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NumberPanelService} from '../number-panel.service';
import {fromEvent} from 'rxjs';
import {take} from 'rxjs/operators';


const defaultNormalClass = 'normalNumber';
const defaultHighlightClass = 'visitNumber';


@Component({
  selector: 'app-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.css']
})
export class NumberControlComponent implements OnInit, AfterContentInit {

  mouseIn = false;

  @Output() numberSelectedEvent = new EventEmitter<{cmd: string, value: string}>();

  @Input() number = '';



  @Input() displayColorClass = defaultNormalClass;

  @ViewChild('comp') thisCompRef: ElementRef;


  @Input('cssClassName')
  set cssClassName(className) {

    this.numberPanelService.currentDrawnNumberBroadcastQ.push({
        dNumber: this.number,
        cssClass: className
    });
  }
  constructor(private renderer: Renderer2,
              private numberPanelService: NumberPanelService) { }

  ngOnInit() {



  }

  //////////////////  Using fromEvent to trap the mouse/keyboard event

  fromEventSetup() {
    fromEvent(this.thisCompRef.nativeElement, 'mouseover')
      .pipe(take(1))
      .subscribe(e => {
        //console.log(">>>Emit mouse over");
        this.numberSelectedEvent.emit(
          {
            cmd: "mouseover",
            value: this.number
          }
        );
      });

    fromEvent(this.thisCompRef.nativeElement, 'mouseout')
      .pipe(take(1))
      .subscribe(e => {
        //console.log(">>>Emit mouse out");
        this.numberSelectedEvent.emit(
          {
            cmd: "mouseout",
            value: this.number
          }
        );
      });
  }
  //////////////////////////////////


  /**
   *
   */
  ngAfterContentInit(): void {
      this.displayNumber()
  }

  mouseOver()
  {
      if(this.mouseIn)
      {
        return;
      }
      this.mouseIn = true;
      //console.log(">>>Mouse Over captured in component. Emit event");
      this.numberSelectedEvent.emit(
        {cmd: "mouseover",
          value: this.number
        }
      );
  }

  mouseout()
  {
    if(!this.mouseIn) {
        return;
    }
    this.mouseIn = false;
    this.numberSelectedEvent.emit(
      {cmd: "mouseout",
        value: this.number
      }
    );
  }

  /**
   *
   * @param cssClassName
   */
  addCssClass(cssClassName: string) {
    this.renderer.addClass(this.thisCompRef.nativeElement, cssClassName);
  }

  /**
   *
   * @param cssClassName
   */
  removeCssClass(cssClassName: string) {
    this.renderer.removeClass(this.thisCompRef.nativeElement, cssClassName);
  }


  highlight()
  {
     defaultHighlightClass.split(' ').forEach((className) => {
      this.renderer.addClass(this.thisCompRef.nativeElement, className);
    });
  }

  unhighlight()
  {
    defaultHighlightClass.split(' ').forEach((className) => {
      this.renderer.removeClass(this.thisCompRef.nativeElement, className);
    });
  }

  /**
   *
   * Remove all classes bound to this element
   * @param elementRef
   */
  private removeAllClasses(elementRef: ElementRef) {
    //console.log(">>>>number-control.component - remove all classes");
    const thisElm = elementRef.nativeElement;
    const classNames = elementRef.nativeElement.getAttribute('class')
    if (classNames && classNames.length) {
          classNames.split(" ").forEach(className => {
          this.renderer.removeClass(thisElm, className);
        });
    }
  } 

  displayNumber()
  {
    this.removeAllClasses(this.thisCompRef);
    //this.renderer.removeClass(this.thisCompRef.nativeElement, defaultNormalClass);

    if (this.displayColorClass != null) {
      this.displayColorClass.split(' ').forEach((className) => {
        this.renderer.addClass(this.thisCompRef.nativeElement, className);
      });

    }
  }

  /*
   * Broadcast the clicked number to the world
   */
  onClick()
  {
     //console.log(">>>Send clicked number:", this.number);
     this.numberPanelService.numberSelected(this.number);
  }
}
