import {Observable, Subject, Subscription, of} from 'rxjs';
import {NumberPanelService} from '../number-panel/number-panel.service';
import _ from 'lodash';
import {Inject, Injectable} from '@angular/core';
import {CommonServices} from '../common/common.services';
import { Store } from '@ngrx/store';

@Injectable()
export class SelectedNumberService {
  private selectedNumberSub: Subscription;
  private selectedNumberTicket: string[][] = [];
  private numberCheckMessageQ: any[] = [];
  messageObserverable: Observable<any>;
  selectedNumberTicketChange = new Subject<string[][]>();
  msgObservers = [];

  private currentDrawnTicket: string[] = [];


  // tslint:disable-next-line:variable-name
  private _currentIndex = -1;
  private ticketFlip: boolean;
  private lastEdittedTicketIndex: number;


  constructor(private numberPanelService: NumberPanelService,
     private commonService: CommonServices, store: Store<any>) {

    this.messageObserverable = new Observable((observer) => {
      const intervalId = setInterval(() => {
          if(this.numberCheckMessageQ.length)
          {
            //console.log("**Seleced-number-component message q length:", this.numberCheckMessageQ.length);
            observer.next(this.numberCheckMessageQ.pop());
          }
        },
        200);




      return {unsubscribe(): void {
          clearInterval(intervalId);
        }};
    });


    this.numberPanelService.currentDrawnNumberObservable.subscribe((currentDrawnNumber) => {
        currentDrawnNumber.forEach((aNumber) => {
              this.currentDrawnTicket.push(this.commonService.pullNumberOut(aNumber));
          });
    })

    


 

  }

  /**
   *
   */
  get isThereATicketFlip(): boolean {
     return this.ticketFlip;
  }

  /**
   *
   */
  get previousEdittedTiclet(): string[] {
     return this.getTicketByIndex(this.lastEdittedTicketIndex);
  }

  // Setter and getter for _currentIndex
  get currentIndex(): number {
      return this._currentIndex;
  }
  set currentIndex(index: number) {
      this.bindMsgObserverToCurrentTicket(this.currentIndex, index);
      this._currentIndex = index;
      //console.log('>>>>currentIndex:', this._currentIndex);
  }

  registerObserver(forObservable, observer) {
       if(observer) {
         if(this.msgObservers.length) {
           ///Unscribe the previous observer
           //console.log(">>>>this.msgObservers:", this.msgObservers);
           const previousObserve = this.msgObservers[this.msgObservers.length - 1];
           previousObserve.subscription.unsubscribe();
           previousObserve.autoClearMsg();
         }
         this.msgObservers.push(observer);
         observer.subscription = forObservable.subscribe(observer);
         observer.observable = forObservable;
       }

  }

  /**
   *
   * @param currentIndex
   * @param nextIndex
   */
  bindMsgObserverToCurrentTicket(currentIndex, nextIndex) {
    const previousObserve = this.msgObservers[currentIndex];
    const nextObserver = this.msgObservers[nextIndex];

    if(!previousObserve || !nextObserver) {
       return;
    }

    previousObserve.subscription.unsubscribe();
    previousObserve.autoClearMsg();

    nextObserver.subscription = nextObserver.observable.subscribe(nextObserver);
  }

  /**
   *
   */
  public getCurrentTicket(): string[] {
     return this._currentIndex > -1 ? this.selectedNumberTicket[this._currentIndex] : null;
  }

  /**
   *
   * @param index
   */
  private getTicketByIndex(index): string[] {
    return index > -1 ? this.selectedNumberTicket[index] : null;
  }

  /**
   * 
   * @param ticketNumber
   */
  addTicketToBucket(ticketNumber: string[]): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        ticketNumber.forEach(num => {
          this.addOrUpdate(num, false); //Add number without validation

        });
        resolve("Ticket number has been inserted.");
      }
        , 200);
    })
  }


  /**
   * 
   * @param aNumber
   * @param performCheck
   */
  public addOrUpdate(aNumber: string, performCheck: boolean = true) {

    if (performCheck) {
      if (!this.checkNumber(aNumber, (msg) => this.numberCheckMessageQ.push(msg))) {
        return;
      }

    }

    const currTicket = this.getCurrentTicket();
    if (!currTicket || _.size(currTicket) === 5)
    {
       this.addNumberToBocket(aNumber);
    } else {
      this.addNumberToCurrentTicket(aNumber);
      this.ticketFlip = false;
    }
  }

  private addNumberToCurrentTicket(aNumber: string) {

      this.selectedNumberTicket[this.currentIndex]
        .push(
          aNumber
        );

      this.selectedNumberTicketChange.next(this.selectedNumberTicket.slice());
      this.numberCheckMessageQ.push('Selected number accepted');

  }



  private addNumberToBocket(aNumber: string)
  {

     this.lastEdittedTicketIndex = this.currentIndex;
     this.ticketFlip = true;

     this.currentIndex = this.selectedNumberTicket.length > 0 ? this.selectedNumberTicket.length - 1 : 0;
    if (this.selectedNumberTicket[this.currentIndex ] == null)
    {
      this.selectedNumberTicket[this.currentIndex ] = [];
    } else {
      if(this.selectedNumberTicket[this.currentIndex ].length >= 5)
      {
        // tslint:disable-next-line:no-unused-expression
        this.selectedNumberTicket[++this.currentIndex] = [];
        // this.numberCheckMessageQ.push({clearmsg: true});
        // this.numberCheckMessageQ.push({unfocus: true});
      }
    }

     this.addNumberToCurrentTicket(aNumber);

  }


 /* public pullNumberOut(fullNumber: string)
  {
    return fullNumber.substr(0,2);
  }*/



  /**
   *
   * Validate the ticket number and return back the result string as observable
   * @param aNumber
   */
  validateNumber(ticketNumber: string[]): Observable<string[]> {
    return new Observable(subscriber => {
      let accMsg: string[] = [];
      const ticketNumberToValidate: string[] = ticketNumber.slice();
      const startingTicket: string[] = [];
      startingTicket.push(ticketNumberToValidate.shift()); //Start with one number
      setTimeout(() => {
        ticketNumberToValidate.forEach(number => {
          this.checkNumber_internal(number, (msg) => {
            accMsg.push(msg)

          }, startingTicket);
          startingTicket.push(number);
        })
        accMsg.length ?
          subscriber.next(accMsg)
          : subscriber.next(["Ticket validated Ok."]);
      }, 200);
    }); 
  }

  /**
   *
   * 
   * @param aNumber
   * @param msgCallback
   */
  private checkNumber(aNumber: string, msgCallback): boolean {
    const currTicket = this.getCurrentTicket();
    if (currTicket && currTicket.length === 5) {
       return true;
    }
    return this.checkNumber_internal(aNumber, (msg) => { msgCallback(msg)}, currTicket )
  }

  /**
   * Return true if the number is valid
   * @param aNumber
   * @param msgCallback
   */
  private checkNumber_internal(aNumber: string, msgCallback, currTicket: string[],
    currDrawnTicket: string[] = this.currentDrawnTicket): boolean
  {



    let numberAlreadySelected = false;
    let numberAdjacentToNumberInTicket = false;
    let numberAdjacentToNumberInTicket1 = false;
    
    if (currTicket && currTicket.length) {
      numberAlreadySelected = _.includes(currTicket, aNumber);
      numberAdjacentToNumberInTicket = this. numberInTicketByDelta(aNumber, 1, currTicket);
      numberAdjacentToNumberInTicket1 = this. numberInTicketByDelta(aNumber, -1, currTicket);
    }


    const numberInLatestDrawn = _.includes(this.currentDrawnTicket, aNumber);
    const numberAdjacentToNumberInCurrDrawn = this.numberInTicketByDelta(aNumber, 1, this.currentDrawnTicket);
    const numberAdjacentToNumberInCurrDrawn1 = this.numberInTicketByDelta(aNumber, -1, this.currentDrawnTicket);


    if(numberAlreadySelected)
      msgCallback(`Number ${aNumber} already exist in ticket`);
    else if (numberInLatestDrawn) {
      msgCallback(`Number ${aNumber} already in current drawn number`);
    } else if(numberAdjacentToNumberInTicket || numberAdjacentToNumberInTicket1) {
       msgCallback(`Number ${aNumber} is adjacent to the number in ticket`);
    } else if (numberAdjacentToNumberInCurrDrawn || numberAdjacentToNumberInCurrDrawn1) {
      msgCallback(`Number ${aNumber} is adjacent to the number the current drawn number`);
    }

    return !numberAlreadySelected && !numberInLatestDrawn;
  }

  /**
   * Return true if the input number+delta is found in the ticket
   * @param currNumber
   * @param delta
   * @param ticket
   */
  private numberInTicketByDelta(currNumber:string, delta: number, ticket: string[]): boolean {
     const newNumber = +currNumber + delta;
     const newNumWithDelta = newNumber  < 10 ?  '0' + newNumber : ''+newNumber;
     const newNumberString = this.commonService.pullNumberOut(newNumWithDelta);

     console.log(">>>delta check ", newNumber, newNumWithDelta,newNumberString, "ticket:", ticket);

     return _.includes(ticket, newNumberString);
  }
  
  remove(i: any) {
    this.selectedNumberTicket.splice(i,1);
  }

  private numberExists(aNumber:string, numberList: string[])
  {
    if(numberList.indexOf(aNumber) != -1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getCurrentSelectedNumberTickets() {
    return this.selectedNumberTicket.slice();
  }

  clearTicketObserver(callback) {

    this.numberCheckMessageQ.push({clearmsg: true});
    this.numberCheckMessageQ.push({unfocus: true, fn: callback});
  }

  removeTicket(itemIndex: any) {
     const index = +itemIndex;

     const numberOfTickets = _.size(this.selectedNumberTicket);
     if(numberOfTickets === 1) {
        this.currentIndex = -1;
     } else if (index <= numberOfTickets) {
       this.currentIndex--;
     }

     this.selectedNumberTicket.splice(index, 1);
     this.selectedNumberTicketChange.next(this.selectedNumberTicket.slice());
  }
}
