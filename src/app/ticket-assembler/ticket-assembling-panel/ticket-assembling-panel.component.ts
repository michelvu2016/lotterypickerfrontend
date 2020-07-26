import { Component, OnInit, AfterViewInit } from '@angular/core';
import *  as fromSelectedTicket from '../../store/actions/selected-numbers.action';
import { Store, select } from '@ngrx/store';
import { selectedTicketSelector } from 'src/app/store/selectors/LotteryNumberSelectors';
import { delay } from 'rxjs/operators';
import * as fromActions from '../../store/actions/selected-numbers.action'
import { from, timer, interval } from 'rxjs';

@Component({
  selector: 'app-ticket-assembling-panel',
  templateUrl: './ticket-assembling-panel.component.html',
  styleUrls: ['./ticket-assembling-panel.component.css']
})
export class TicketAssemblingPanelComponent implements OnInit, AfterViewInit {

  numberInTicket = ["03", "11", "45","27","13"];
  ticketAnalysis = "Q0-1[ 16:1 ] Q1-4[ 30:3 39:1 ] Q2-1[ 39:1 ] Q3-4[ 43:1 30:1 37:1 39:1 ] Q4-5[ 39:1 37:2 43:1 30:1 ] Q5-1[ 37:1 ]";

  private highlightTicket = false;

  constructor(private selectedTicketStore: Store<fromSelectedTicket.AppState>,
              private highlightTicketStore: Store<fromActions.AppState>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
     this.selectedTicketStore.pipe(
       select(selectedTicketSelector),
       delay(100)
     ).subscribe(state => {
        console.log(">>>>[TicketAssemblingPanelComponent] ngAfterViewInit, state: ", state);
        
        this.numberInTicket = state.slice();
        if(this.highlightTicket) {
           const id = setTimeout(() => this.highlightTicketInPanels(), 100);
        }
     })
  }

  private removeSpaces(inString:string) {
    return inString.split("Q")
        .map(item => item.trim())
  }

  /**
   * 
   */
  getTicketAnalysis(): string[] {
    return this.removeSpaces(this.ticketAnalysis);
  }

  private _clearHighlightTicketInPanels() {
    this.highlightTicketStore.dispatch(
        fromActions.clearHightlightTicketAction()
      )
  }

  clearHighlightTicketInPanels() {
    this.highlightTicket = false;
    this._clearHighlightTicketInPanels();
  }


  highlightTicketInPanels() {
    this.highlightTicket = true;
    this._highlightTicketInPanels();
  }

  private _highlightTicketInPanels() {
    this.highlightTicketStore.dispatch(
      fromActions.setHighlightTicketAction({
         ticketNumbers: this.numberInTicket
      })
    );
  }
}