import { Component, OnInit, AfterViewInit } from '@angular/core';
import *  as fromSelectedTicket from '../../store/actions/selected-numbers.action';
import { Store, select } from '@ngrx/store';
import { selectedTicketSelector } from 'src/app/store/selectors/LotteryNumberSelectors';
import { delay, map, tap, mapTo, multicast, refCount, filter } from 'rxjs/operators';
import * as fromActions from '../../store/actions/selected-numbers.action'
import { from, timer, interval, of, Observable, Subject, empty } from 'rxjs';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-ticket-assembling-panel',
  templateUrl: './ticket-assembling-panel.component.html',
  styleUrls: ['./ticket-assembling-panel.component.css']
})
export class TicketAssemblingPanelComponent implements OnInit, AfterViewInit {

  numberInTicket = [];
  ticketAnalysis = "";

  private highlightTicket = false;
  highlightTicketSubject = new Subject<string[]>();

  constructor(private selectedTicketStore: Store<fromSelectedTicket.AppState>,
              private highlightTicketStore: Store<fromActions.AppState>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
     this.selectedTicketStore.pipe(
       select(selectedTicketSelector),
       delay(100)
     )
     .pipe(
        map(ticket => ticket.slice()),
        tap(ticket => this.numberInTicket = ticket),
        tap(ticket => {
          if(this.highlightTicket) {
            const id = setTimeout(() => {
              this.highlightTicketInPanels();
              clearTimeout(id);
            }
              , 100);
           
         }
        })
     )
     .subscribe(ticket => {
        console.log(">>>>[TicketAssemblingPanelComponent] ngAfterViewInit, state: ", ticket);
        
        this.highlightTicketSubject.next(this.numberInTicket);
        })

    //  this.$showTemplate.subscribe((ticket) => 
    //       console.log(">>>>[TicketAssemblingPanelComponent] ngAfterViewInit test $showTemplate, state: ", ticket))   

  }

  /**
   * 
   */
  getTicketMultiCastObs(name?: string) : Observable<string[]> {
    console.log(">>>[TicketAssemblingPanelComponent] getTicketMultiCastObs() invoked by ", name);
     return from(this.highlightTicketSubject).pipe(
         multicast(new Subject()),
         refCount(),

     )

  }


  getTicketObs() : Observable<string[]> {
    return new Observable<string[]> (observer => {
     this.highlightTicketSubject.subscribe(
       ticket => {
        console.log(">>>[TicketAssemblingPanelComponent] getTicketObs() emits to the observer ", ticket);
           observer.next(ticket)
       },
       error => {
          console.log(">>>error in [TicketAssemblingPanelComponent] getTicketObs() ", error);
       }
     )
    });
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