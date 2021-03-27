import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {ActivatedRoute, Router} from '@angular/router';
import { switchMap, delay, take, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as  fromHighlightCurrDrawnNumbersAction from '../store/actions/HighlightCurrDrawnNumbersAction';
import * as  fromHighlightCurrDrawnNumbersSelectors from '../store/selectors/LotteryNumberSelectors';
import * as constants from '../constants/constants';
import * as fromActions from '../store/actions/selected-numbers.action';
import { from, Observable, of, forkJoin, Subject } from 'rxjs';
import { fromSelectors } from '../store';



@Component({
  selector: 'app-number-selection-panel',
  templateUrl: './number-selection-panel.component.html',
  styleUrls: ['./number-selection-panel.component.css']
})
export class NumberSelectionPanelComponent implements OnInit, AfterViewInit {

  gameName: string;
  highLightNumberInPanel = true;
  displayMode = 'drawnNumber';
  numberHighLightTextLabel = "";

  systemMessageType = 0;

  showQuadrantAnalysis: boolean = false;
  showQuadrantAnalysisLabel: string = "Show quadrant analysis";

  showNumberSelectionPanel: boolean = false;

  showTicketNumberInputControl = false;

  latestTicketObs = new Subject<string[]>();

  constructor(private numberPanelService: NumberPanelService,
    private currentRoute: ActivatedRoute, private router: Router,
    private store: Store<fromHighlightCurrDrawnNumbersAction.HighlightState>,
    private appStore: Store<fromActions.AppState>,
    private ticketToBeHighLightedStore: Store<fromActions.AppState>
              ) { }

  /**
   *
   */
  ngOnInit() {

    this.currentRoute.paramMap.pipe(
      switchMap(params => {
         this.gameName = params.get('lotteryType');
         return this.numberPanelService.initThePanelData(this.gameName);
      })
    ).subscribe();

    this.setHighlightButtonLabel();

    this.numberPanelService.numberPanelDisplayConpleteSubject.pipe(
       delay(100)
    ).
    subscribe(() => {
      this.showNumberSelectionPanel = true;
    });

    //this.toggleHighlightNumberInPanel()


  }

  toggleTicketNumberInput() {
    this.showTicketNumberInputControl = !this.showTicketNumberInputControl;
  }

  ngAfterViewInit() {
    //this.dispatchHighLightFlagValue(this.highLightNumberInPanel);

    }


  sendTicket()  {
    console.log(">>>[NumberQuadrantAnalysisCompoennt] setup watch for lastDrawnNumberSelector");
        this.appStore.select(fromSelectors.lastDrawnNumberSelector)
            .pipe(
                map(state => state['lastDrawnNumberList']),
                tap(state => console.log(">>>[NumberQuadrantAnalysisCompoennt] state:", state))
            ).subscribe(
              ticket => this.latestTicketObs.next(ticket)
            );
  }


  /**
   *
   */
  getCurrentDrawnTicket() {

     return from(this.numberPanelService.getCurrentDrawnTicket());

  }

  /**
   *
   * @param mega
   */
  displayInfo(modeName: string) {
    this.displayMode = modeName;
  }

  toggleShowQuadrantAnalysis() {
    this.showQuadrantAnalysis = !this.showQuadrantAnalysis;
    this.showQuadrantAnalysisLabel = this.showQuadrantAnalysis ? "Show quadrant analysis" :
                "Hide quadrant analysis"
  }

  messageObservable() {
    return this.numberPanelService.messageObservable;
  }

  private setHighlightButtonLabel() {
    this.numberHighLightTextLabel = this.highLightNumberInPanel ? "Turn off HighLight" : "Turn On HighLight";
  }

  toggleHighlightNumberInPanel() {
    this.highLightNumberInPanel = !this.highLightNumberInPanel;
    this.setHighlightButtonLabel();
    this.updateTheTicketToBeHighlighed(this.highLightNumberInPanel);
  }

  /**
   *
   */
  private clearTheTicketToBeHighlighed() {
    this.ticketToBeHighLightedStore.dispatch(
        fromActions.clearHightlightTicketAction()
    );
  }



  /**
   *
   * @param flagValue
   */
 private setupTheTicketToBeHighlighed() {
    this.numberPanelService.getCurrentDrawnTicket()
          .then((numbers) => {
              this.ticketToBeHighLightedStore.dispatch(
                 fromActions.setHighlightTicketAction({
                   ticketNumbers: numbers
                 })
              )
          }).catch(error => {
             //Error handling here
          });


 }

 private updateTheTicketToBeHighlighed(flag: boolean) {
   if(flag)
    this.setupTheTicketToBeHighlighed()
  else
    this.clearTheTicketToBeHighlighed()
 }

 /**
  * Put the last drawn numbers back to current
  */
 resetLastDrawnNumber() {
    this.store.dispatch(fromActions.resetToCurrentDrawnTicketAction())
 }


}
