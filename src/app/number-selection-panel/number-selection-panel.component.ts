import { Component, OnInit } from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { HighlightCurrDrawnNumbersAction } from '../store/actions/HighlightCurrDrawnNumbersAction';
import * as constants from '../constants/constants';

@Component({
  selector: 'app-number-selection-panel',
  templateUrl: './number-selection-panel.component.html',
  styleUrls: ['./number-selection-panel.component.css']
})
export class NumberSelectionPanelComponent implements OnInit {

  gameName: string;
  highLightNumberInPanel = true;
  displayMode = 'drawnNumber';
  numberHighLightTextLabel = "";

  showQuadrantAnalysis: boolean = false;
  showQuadrantAnalysisLabel: string = "Show quadrant analysis";

  showNumberSelectionPanel: boolean = false;

  showTicketNumberInputControl = false;

  constructor(private numberPanelService: NumberPanelService,
    private currentRoute: ActivatedRoute, private router: Router,
    private store: Store<{ highlightCurDrawnNumber: boolean }>
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

    this.store.subscribe(state => {
      //console.log(">>>>State from the store:", state);
    });

    this.store.pipe(select('highlightCurDrawnNumber')).subscribe(flag => {
      //console.log(">>>>The highlight flag:", flag);
    });

    this.setHighlightButtonLabel();

    this.numberPanelService.numberPanelDisplayConpleteSubject.subscribe(() => {
      this.showNumberSelectionPanel = true;
    });

  }

  toggleTicketNumberInput() {
    this.showTicketNumberInputControl = !this.showTicketNumberInputControl;
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
    const highlightCurrDrawnNumbersAction = new HighlightCurrDrawnNumbersAction();
    highlightCurrDrawnNumbersAction.type = constants.UPDATE_HIGHLIGHT_CURR_NUMBERS;
    highlightCurrDrawnNumbersAction.highlightCurrentDrawnNumber = this.highLightNumberInPanel;
    this.store.dispatch(highlightCurrDrawnNumbersAction);
  }
}
