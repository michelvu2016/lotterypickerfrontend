import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, AfterViewInit, Injectable} from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {Observable, Subscription, timer, interval, Subject, EMPTY} from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


import _ from 'lodash';
import {SelectedNumberService} from '../selected-number-manager/selected-number-service';
import { Store } from '@ngrx/store';
import { SelectedNumbers } from '../models/SelectedNumbers';
import { SelectedNumbersAction, TicketState, ticketSelectingAction } from '../store/actions/selected-numbers.action';
import { startWith, filter, tap, delay } from 'rxjs/operators';
import { SelectedTicketState } from '../store/selected-tickets/reducers/SelectedTickets.reducers';
import { fromActions } from '../store';
import { selectedTicketActions } from '../store/selected-tickets';
import { Ticket } from '../store/selected-tickets/models/selected-tickets.models';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { CommonServices } from '../common/common.services';
import { selectedMegaNumberSelector } from '../store/selectors/LotteryNumberSelectors';



@Component({
  selector: 'app-selected-number',
  templateUrl: './selected-number.component.html',
  styleUrls: ['./selected-number.component.css']
})
export class SelectedNumberComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() maxNumber = 5;
  megaNumber: string = null;
  selectedNumberSub: Subscription;
  @Input() numbers: string[];

  private prevNumbers : string[];;

  @Input() ticketNumber: number;
  @Input() ticketId: any;

  surrogatedTicketId: number = 0;

  private prevSelectedNumber: string[] = [];
  newTicket: boolean = true;

  trashBin = [];
  highlightNumberFlag = false;

  private subNumbersChangeObs : Subscription;
  generalMessageType = 0;


  constructor(private numberPanelService: NumberPanelService,
    private selectedNumberService: SelectedNumberService,
    private commonService: CommonServices,
    private selectedNumbersStore: Store<{ selectedNumbers: SelectedNumbers }>,
    private selectedTicketStore: Store<SelectedTicketState>,
    private clearSelectedTicketEffect: FinalSelectedTicketListMonitorEffect
  ) {

  }

  ngOnInit() {
      //Compute the unique ticket id
      this.surrogatedTicketId = this.generateTicketId();
      EMPTY.pipe(
        delay(100)
     ).subscribe(() => {
       this.surrogatedTicketId = this.generateTicketId();
       console.log(`[SelectedNumberComponent] surrogatedTicketId: ${this.surrogatedTicketId}`);
     })
  }




  ngAfterViewInit() {
    const ticketComparer : (s: string[], t: string[] ) => boolean =
           (ticket1, ticket2) => {
            //console.log(`>>>[SelectedNumberComponent] ticketComparer. tk1: ${ticket1} tk2:${ticket2}`);

              if(!ticket1 && !ticket2)
                  return true;
              else if (!ticket1 || !ticket2)
                  return false;
              else if (ticket1.length != ticket2.length)
                  return false;
               return ticket1.reduce((result, num) => {
                  return ticket2.find(n1 => n1 == num) == undefined ? result+"1" : result+"0"
               }, "" ).indexOf("1") == -1;
           };

    this.subNumbersChangeObs = interval(300).subscribe(
        () => {
               const timeoutId  = setTimeout(() => {
                if (!ticketComparer(this.prevNumbers, this.numbers)) {
                  //console.log(`>>>[SelectedNumberComponent] ticketComparer return false`);
                  this.updateSelectedTicketOnStore();
                  this.prevNumbers = this.numbers.slice();
                  clearTimeout(timeoutId);
               } else {
                //console.log(`>>>[SelectedNumberComponent] ticketComparer return true`);
               }
               },100)

        }
     )

     this.clearSelectedTicketEffect.deleteAllTicketsDetectedSubject.pipe(
       tap(() => console.log("[SelectedNumberComponent] clear all tickets signal received"))
     ).subscribe(() => this.newTicket = true);




  }

  componentSelected() {
     const tid = setTimeout(() => {
      this.updateSelectedTicketOnStore();
      this.prevNumbers = this.numbers.slice();

     }, 100);
  }

  ngOnDestroy(): void {
     if (this.subNumbersChangeObs) this.subNumbersChangeObs.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {

     //console.log("[SelectedNumberComponent] onchanges:",changes);
  }

  currentNumberIndex() {
    return this.selectedNumberService.currentIndex;
  }

  remove() {
    this.numbers = [];
    this.updateSelectedTicketOnStore();
    this.selectedNumberService.removeTicket(this.ticketId);
    this.selectedTicketStore.dispatch(selectedTicketActions.deleteTicketAction({ticketId: this.surrogatedTicketId}));
  }

  onClick() {
    this.selectedNumberService.currentIndex = +this.ticketNumber;
  }

  getTicket() {
     return this.selectedNumberService.getCurrentTicket();
  }

  messsageObservable() {
    return this.selectedNumberService.messageObserverable;
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container) {
      //console.log(`>>>moveItemInArray data: ${event.container.data}
        //      prevIndex: ${event.previousIndex} curIndex ${event.currentIndex}`);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //console.log(`>>>transferArrayItem prevData: ${event.previousContainer.data}
          //data: ${event.container.data} prevIndex ${event.previousIndex}
           //curIndex: ${event.currentIndex}`);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
        //console.log("[SelectedNumberComponent] numbers:", this.numbers);
    }
  }

  onTicketNumberClick(event:any) {
     //console.log(">>>[SelectedNumberComponent] onTicketNumberClick: ", event);
  }

  mouseOverNumber() {

  }

  /**
   *
   */
  private updateSelectedTicketOnStore() {
    //console.log("[SelectedNumberComponent] updateSelectedTicketOnStore numbers:", this.numbers);
    const payload : TicketState = {
      selectedNumber: this.numbers.slice()
    }
    this.selectedTicketStore.dispatch(
      ticketSelectingAction(payload)
    );
  }

  private toggleHighlight() {
    this.highlightNumberFlag = !this.highlightNumberFlag;
  }

  turnOnOffHighlight() {
    this.toggleHighlight();

    const action = SelectedNumbersAction.createAction(this.numbers, "ticket_" + this.ticketId, this.highlightNumberFlag)
    //console.log(">>>>selected-number.component. -- turnOnOffHighlight - action:", action);
    this.selectedNumbersStore.dispatch(
      action
    );
  }

  /**
   *
   * @param number
   */
  selectedMegaNumber(number: string) {
    console.log("[SelectedNumberComponent] selectedMegaNumber: ", number);
    this.megaNumber = number;
  }

  /**
   *
   */
  submitNumber() {
    //console.log("[SelectedNumberComponent] submitNumber() called");

    const ticket: Ticket = {
      forDrawnDate: new Date().toLocaleDateString(),
      numbers: this.numbers.slice(),
      ticketId: null,
      mega: this.megaNumber

    }



    if (!this.newTicket) {
      ticket.ticketId = this.surrogatedTicketId;
      this.selectedTicketStore.dispatch(selectedTicketActions.updateTicketAction({
        updateSelectedTicket: {
           id: this.surrogatedTicketId,
           changes: {
              numbers: this.numbers,
              mega: this.megaNumber,
           }
        }

      }))
    } else {

      ticket.ticketId = this.surrogatedTicketId;
      this.selectedTicketStore.dispatch(selectedTicketActions.addTicketAction({selectedTicket: ticket}))
      this.newTicket = false;
    }


  }

  /**
   * Generate the surrogated ticket id using the ticket number and the elapsed seconds
   */
  generateTicketId() {
     const curDate = new Date();

     const range: (number: number) => number[] = n => Array.from({length: n}, (value, key) => key);
     const randNum: (number: number) => number = n => Math.floor(Math.random() * n);

     const timeStamp = ""+curDate.getHours() + curDate.getMinutes() + curDate.getSeconds();

     return +(range(5).map(n => randNum(n+(n*2))).join("") + timeStamp);
  }

}

@Injectable({providedIn: "root"})
export class FinalSelectedTicketListMonitorEffect {

    deleteAllTicketsDetectedSubject = new Subject<any>();

   constructor(private actions$: Actions) {
   }

   clearSelectedTickets$ = createEffect(() => this.actions$.pipe(
      ofType(selectedTicketActions.deleteAllTicketAction),
      tap(() => console.log("[FinalSelectedTicketListMonitorEffect] selectedTicketActions.deleteAllTicketAction detected.")),
      tap(() => this.deleteAllTicketsDetectedSubject.next())

    ), {dispatch: false});

}
