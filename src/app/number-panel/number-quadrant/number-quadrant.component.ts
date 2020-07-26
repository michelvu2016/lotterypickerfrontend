import {
  Component, Input, OnInit, Output, QueryList,
  ViewChildren,
  EventEmitter, AfterContentInit, AfterViewInit
} from '@angular/core';
import {NumberPanelService} from '../number-panel.service';
import {NumberControlComponent} from '../number-control/number-control.component';
import {Observer} from 'rxjs';
import {CommonServices} from '../../common/common.services';
import { Store, select } from '@ngrx/store';
import { SelectedNumbers } from '../../models/SelectedNumbers';
import * as highlightCurDrawnNumbers from '../../store/actions/HighlightCurrDrawnNumbersAction';
import * as highlightCurDrawnNumbersSelector from '../../store/selectors/LotteryNumberSelectors';
import * as fromActions from '../../store/actions/selected-numbers.action';
import * as fromSelectors from '../../store/selectors/LotteryNumberSelectors';
import * as fromConstants from '../../constants/constants'

@Component({
  selector: 'app-number-quadrant',
  templateUrl: './number-quadrant.component.html',
  styleUrls: ['./number-quadrant.component.css']
})
export class NumberQuadrantComponent implements OnInit, AfterViewInit {

  @ViewChildren(NumberControlComponent) numberControlComponents !: QueryList<NumberControlComponent>;

  numberList: string[][];
  @Input() index = 0;
  @Output() overNumberEvent = new EventEmitter<string>();
  @Output() doneDisplayNumber = new EventEmitter<number>()

  highlightCurrentDrawnNumber: boolean = true;

  constructor(private numberPanelService: NumberPanelService, private commonService: CommonServices,
    private highlightCurDrawnNumberStore: Store<highlightCurDrawnNumbers.HighlightState>,
    private commonServices: CommonServices,
    private selectedNumbersStore: Store<{ selectedNumbers: { selectedNumbers: { ticketId: SelectedNumbers } } }>,
    private ticketToHighLightStore: Store<fromActions.AppState>
    ) {
    //this.initComponent();
  }

  /**
   *
   */
  ngOnInit() {


    this.initComponent();
    this.numberPanelService.registerDataReadyNotification(() => {
        this.initComponent();
        this.refreshNumberCurrentDrawnNumberHighLight();
    });
    //this.highlightDrawnNumbers();

    this.numberPanelService.registerProposedSelectingTicketObserver('number_quadrant' + this.index, this.proposedTicketAnalyzingObserver());
    
    

    this.observeSelectedNumbers();
  }

  

  /**
   *
   * 
   * @param highlightFlag
   */
  private getCssClassForHighlight(highlightFlag: boolean, ticketNumberIndex: number) {
    let highLightClass = "pastDrawnNumber";
    if (highlightFlag) {
      highLightClass = 'drawn_number_background ' + 'drawn_number_in_panel drawnNumber_' + ticketNumberIndex;

    }
    return highLightClass;
  }

  

  /**
   * 
   * @param number
   * @param index
   * @param highlightNumber
   */
  private highLightNumberInPanel(number: String, numPos: number, highlightNumber: boolean) {

    //console.log(">>>number-quadrant.component - highLightNumberInPanel - number to hilite:", number, " number Pos: ", numPos, " flag:", highlightNumber);

      this.numberControlComponents.forEach(comp => {
        if (this.commonServices.pullNumberOut(comp.number) === number) {
          comp.displayColorClass = this.getCssClassForHighlight(highlightNumber, numPos);
            comp.displayNumber();
          }

        });  
      
  }

  /**
   *
   * 
   * @param key
   */
  private getIndexFromKey(key: String): number {
    if (key && key.indexOf("_") != -1) {
      return +key.split("_")[1];
    } else {
      return 0; //??????
    }
  }

  observeSelectedNumbers() {
    this.selectedNumbersStore.pipe(select('selectedNumbers')).subscribe(
      selectedNumbers => {
        if (selectedNumbers) {
          const ticketSet = selectedNumbers.selectedNumbers
          //console.log(">>>>number-quadrant.component - seleted number observer - selectedNumbers:", ticketSet);
          Object.keys(ticketSet).forEach(key => {
          const selNumber = ticketSet[key];
          //console.log(">>>>number-quadrant.component - seleted number observer - numbers:", selNumber.numbers);
          //console.log(">>>>number-quadrant.component - seleted number observer - should highlight", selNumber.shouldHighlightNumbers);
          let num_position = 0;
          selNumber.numbers.forEach(num => {
            this.highLightNumberInPanel(num, ++num_position, selNumber.shouldHighlightNumbers);
            });

          })
        }


       // 


      }
    )
  }

  /**
   *
   */
  proposedTicketAnalyzingObserver(): Observer<{cmd: string, ticket: string[]}> {
    const thisObj = this;
    return {
      closed: false,
      error() {},
      next(ticketInfo) {
          //console.log('>>>Ticket info:', ticketInfo);
          thisObj.findTicketMatching2OrMoreNumber(ticketInfo.ticket, thisObj.numberList, (matchedNumbers, index) => { // Find the ticked matches at least 2 numbers
             // console.log('>>>callback-->>', matchedNumbers, index);
          thisObj.takeNumberComponentByTicketIndex(index, thisObj.numberControlComponents, 5).filter(numberControlComp => { //Find the matched NumberControlComp
               //console.log('>>>takeNumberComponentByTicketIndex ', numberControlComp);
               return matchedNumbers.includes( numberControlComp.number);
            }).forEach(numberControlComp => {
               //`console.log('>>>>Adding/Remove the class twoOrMoreNumberMatchPastTicket');
               if (ticketInfo.cmd === 'highlight') {
                    numberControlComp.addCssClass('twoOrMoreNumberMatchPastTicket');
               } else if (ticketInfo.cmd === 'unhighlight') {
                    numberControlComp.removeCssClass('twoOrMoreNumberMatchPastTicket');
               }
            }) ;


          });

      },
      complete() {}
    };
  }

  /**
   * Search and report back the okd ticket having 2 or more matching number with the proposed ticket
   * @param proposedTicket
   * @param callback
   */
   findTicketMatching2OrMoreNumber(proposedTicket: string[], panelNumberList: string[][], callback: (matchedNumber: string[], index: number) => void) {

      let index = -1;
      //console.log('>>>findTicketMatching2OrMoreNumber: proposedTicket:', proposedTicket, 'this.numberList:', panelNumberList);
      this.numberList.forEach((oldTicket) => {
          index++;

        //  console.log('>>>oldTicket:', oldTicket, ' proposedTicket:', proposedTicket);

        if (proposedTicket != null) {
          const matchNumbers = oldTicket.filter(n => {
             //console.log(`>>>Number to check ${n} trimed number ${this.commonService.pullNumberOut(n)} includes check: ${proposedTicket.includes(this.commonService.pullNumberOut(n))}`);
             return proposedTicket.includes(this.commonService.pullNumberOut(n));

          } );
          if (matchNumbers.length >= 2) {
             callback(matchNumbers, index);
          }
        }

      });
   }

  /**
   *
   * @param ticketIndex
   * @param numberPerTicket
   */
   takeNumberComponentByTicketIndex(ticketIndex: number, panelNumberOfNumberControlList: QueryList<NumberControlComponent>, numberPerTicket: number): NumberControlComponent[] {
        const startIndex = ticketIndex * 5;
        return panelNumberOfNumberControlList.toArray().slice( startIndex, startIndex + 5 );
   }
  /**
   *
   */
  private initComponent() {

    this.numberList = this.numberPanelService.getTicketNumberForQuadrant(this.index, 5);
    
/*    const startAt = this.index * 5;
    const endAt = startAt + 5 >  this.numberPanelService.getNumberOfLine() ?
      this.numberPanelService.getNumberOfLine() : startAt + 5;
    this.numberList = this.numberPanelService.getSubsetNumber(startAt, endAt);*/

  }


  // tslint:disable-next-line:use-life-cycle-interface
   ngAfterViewInit(): void {

     //this.refreshNumberCurrentDrawnNumberHighLight();
     this.doneDisplayNumber.emit(this.index)
    //  this.highlightCurDrawnNumberStore.pipe(select(highlightCurDrawnNumbersSelector.selectHighlightCurrDrawnNumbers)).subscribe(flag => {
    //   this.highlightCurrentDrawnNumber = flag;
    //   console.log(">>>>number-quadrant.component - number highlight flag:", flag);
    //   //this.refreshNumberCurrentDrawnNumberHighLight();

    //});

    this.new_highlightNumbersInPanel();
   }

   new_highlightNumbersInPanel() {
        this.ticketToHighLightStore.pipe(
           select(fromSelectors.selectTicketToHighLight)
        ).subscribe(
           numbers => {
             if (numbers && numbers.length > 0) {
                const longNumber = numbers[0]?.length > 2;
                this.numberControlComponents.forEach(comp => {
                  //console.log(`>>>[number-quadrant.component] refreshNumberCurrentDrawnNumberHighLight. comp.number ${comp.number} value.dNumber ${value.dNumber}`);
                  const index = numbers.indexOf(longNumber ? comp.number  : this.commonService.pullNumberOut(comp.number));
                  if (index != -1) {
                   
                    const cls = fromConstants.ticketNumberHighLightCssClass(index);
                    console.log(">>>[number-quadrant.component] add class to number comp:", cls);
                    comp.addCssClass("drawnNumber-"+(index+1));
                    //comp.displayNumber();
          
          
                  }
              });
             } else {
              const cls =  fromConstants.getClassesUsedForHighlighting();
              console.log(">>>[NumberQuadrantComponent] remove class on number comp. class:", cls );
              this.numberControlComponents.forEach(comp => {
                
                comp.removeCssClass(cls);
              });
               

             }

            }
        )
   }

  /**
   *
   */
  refreshNumberCurrentDrawnNumberHighLight() {
    //console.log(">>>[number-quadrant.component] refreshNumberCurrentDrawnNumberHighLight. entry");
    this.numberPanelService.triggerCurrentDrawnNumberObservable((value) => {
      let highLightClass = "pastDrawnNumber";
      if (this.highlightCurrentDrawnNumber) {
        highLightClass = 'drawn_number_background ' + 'drawn_number_in_panel ' + value.cssClass;
      }
      //console.log(">>>[number-quadrant.component] refreshNumberCurrentDrawnNumberHighLight. >>>>>highLightClass>>>>:", highLightClass);
      

      this.numberControlComponents.forEach(comp => {
        //console.log(`>>>[number-quadrant.component] refreshNumberCurrentDrawnNumberHighLight. comp.number ${comp.number} value.dNumber ${value.dNumber}`);
        if (comp.number === value.dNumber) {
          console.log(">>>[number-quadrant.component] refreshNumberCurrentDrawnNumberHighLight. Invoke displayColorClass on numberControlComponents", highLightClass);
          comp.displayColorClass = highLightClass;
          comp.displayNumber();


        }

      });
    });
   }

  onOverNumber(aNumber: any)
   {
       this.overNumberEvent.emit(aNumber);

   }

  numberHighlighted(data: any) {
    //console.log("Number highlighted captured in panel:"+aNumber);
    this.numberControlComponents.forEach(comp => {
      if (comp.number === data.value) {
        if (data.cmd == 'mouseover') {
          comp.highlight();
        } else if (data.cmd == 'mouseout') {
          comp.unhighlight();
        }
      }

    });

  }

  highlightDrawnNumbers()
  {
      this.numberPanelService.currentDrawnNumberObservers.addObserver((value) =>
      {
        // console.log(">>>Current Drawn rendeded number:", value);
      })
  }


}
