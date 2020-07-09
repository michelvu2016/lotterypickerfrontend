import {AfterViewChecked, Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import {NumberPanelService} from '../number-panel.service';


@Component({
  selector: 'app-current-drawn-number',
  templateUrl: './current-drawn-number.component.html',
  styleUrls: ['./current-drawn-number.component.css']
})
export class CurrentDrawnNumberComponent implements OnInit, AfterViewInit, OnChanges {

  matchedNumberDisplayClasses = [
    'drawnNumberRed',
    'drawnNumberBlue',
    'drawnNumberGreen',
    'drawnNumberPurple',
    'drawnNumberBrown',

  ];



  currentDrawnNumbers: string[];
  @Output() notifyCurrentNumberEvent = new EventEmitter<string[]>();

  constructor(private numberPanelService: NumberPanelService) { }

  ngOnInit() {
      const thisObj = this;
      this.numberPanelService.currentDrawnNumberObservable.subscribe({
         next(value) {thisObj.currentDrawnNumbers = value},
         complete() {}
      });

  }

  /**
   *
   */
  private initComp() {
    this.notifyCurrentNumberEvent.emit(this.currentDrawnNumbers);
  }


  /**
   *
   */
  ngAfterViewInit(): void {
    this.initComp();
  }

  /**
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
       let change = changes[propName];
       //console.log(">>>Previous value:", change.previousValue);
       //console.log(">>>Current value:", change.currentValue);
       if (propName === 'currentDrawnNumbers') {
         this.initComp();
       }
    }
  }

}
