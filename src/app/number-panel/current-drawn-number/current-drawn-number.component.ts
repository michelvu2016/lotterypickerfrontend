import {AfterViewChecked, Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import {NumberPanelService} from '../number-panel.service';
import * as fromActions from '../../store/actions/selected-numbers.action';
import { Store } from '@ngrx/store';


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

  constructor(private numberPanelService: NumberPanelService,
            private numberToBeHighLightStore: Store<fromActions.TicketToHighLightState>) { }

  ngOnInit() {
      const thisObj = this;
      this.numberPanelService.currentDrawnNumberObservable.subscribe({
         next(value) {
          console.log(">>>[CurrentDrawnNumberComponent] update currentDrawnNumbers:", value); 
          thisObj.currentDrawnNumbers = value;
          thisObj.sendNumberToHighLightInPanel();
          },
         error() {},
         complete() {
         }
      });

  }

  sendNumberToHighLightInPanel() {
    const thisObj = this;
    
    console.log(">>>[CurrentDrawnNumberComponent] ngOnInit dispatch current drawn number to store.")
            this.numberToBeHighLightStore.dispatch(
               fromActions.setHighlightTicketAction({
                ticketNumbers: thisObj.currentDrawnNumbers?.slice()
               })
            )
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
