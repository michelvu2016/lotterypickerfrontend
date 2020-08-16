import {
  ErrorObserver, Subject, of, Observable, ConnectableObservable,
  interval, Observer
} from 'rxjs';
import {take, mapTo, tap, multicast, map} from 'rxjs/operators';
import set = Reflect.set;
import {typeIsOrHasBaseType} from 'tslint/lib/language/typeUtils';
import {Injectable} from '@angular/core';
import {DataService} from '../tools/data-service';
import { publish } from 'rxjs/operators';
import _ from 'lodash';
import * as TicketInQuadrantAnalysisResult  from '../models/TicketInQuadrantAnalysisResult';

type TicketQuadAnalysisResultReader =
  TicketInQuadrantAnalysisResult.TicketInQuadrantAnalysisResultReader;

type TicketQuadAnalysisResultWriter = 
  TicketInQuadrantAnalysisResult.TicketInQuadrantAnalysisResultWriter;



@Injectable()
export class NumberPanelService
{
    drawnNumbers: string[][] = [];
    currentDrawnNumber: string[] = [];
    numberBucket: string[] = [];
    messageQueue: string[] = [];
    currentDrawnNumberBroadcastQ: {
       dNumber: string,
       cssClass: string
    }[] = [];

    appInitObserverQ = [];

    megaNumberInfoChange = new Subject<void>();

    currentDrawnNumberObservable = new Subject<any>();

  jsonDataString = '{"lastDrawnNumberList": ["22(R)12\u00e5**", "14(R-)**", "28(R)2m**", "36(R)2n**", "27(R)12b**"], "numLine0": ["22(R)12\u00e5**", "38(R-)", "05(R)2v", "23(R)12c", "27(R)12b**"], "numLine1": ["10(R)2x", "06(R)2z", "14(R-)**", "08(R-)", "34(R-)"], "numLine2": ["26(R)12l", "44(R)2k", "39(R)12j", "17(R)2h", "12(R+)"], "numLine3": ["43(R)2g", "38(R-)", "04(R)6f", "33(R)6d", "05(R)2v"], "numLine4": ["03(R)6s", "47(R)6a", "13", "04(R)6f", "02(R)20p"], "numLine5": ["32(R)2o", "35(R)2i", "29(R)6u", "02(R)20p", "01(R)12y"], "numLine6": ["17(R)2h", "36(R)2n**", "35(R)2i", "01(R)12y", "45(R)12t"], "numLine7": ["03(R)6s", "21(R)30r", "27(R)12b**", "30(R)2e", "01(R)12y"], "numLine8": ["46(R)2w", "31(R)12q", "05(R)2v", "23(R)12c", "27(R)12b**"], "numLine9": ["03(R)6s", "06(R)2z", "36(R)2n**", "11(R)6>", "45(R)12t"], "numLine10": ["42(R)12<", "22(R)12\u00e5**", "31(R)12q", "04(R)6f", "16(R-)"], "numLine11": ["42(R)12<", "33(R)6d", "29(R)6u", "23(R)12c", "01(R)12y"], "numLine12": ["42(R)12<", "21(R)30r", "37(R)6~", "09(R)2+", "02(R)20p"], "numLine13": ["10(R)2x", "31(R)12q", "47(R)6a", "21(R)30r", "37(R)6~"], "numLine14": ["26(R)12l", "42(R)12<", "22(R)12\u00e5**", "39(R)12j", "18(R+)"], "numLine15": ["47(R)6a", "25(R)6-", "24(R-)", "11(R)6>", "45(R)12t"], "numLine16": ["15(R)2)", "21(R)30r", "28(R)2m**", "41(R-)", "25(R)6-"], "numLine17": ["21(R)30r", "28(R)2m**", "23(R)12c", "02(R)20p", "45(R)12t"], "numLine18": ["20(R-)", "44(R)2k", "31(R)12q", "37(R)6~", "29(R)6u"], "numLine19": ["19", "06(R)2z", "22(R)12\u00e5**", "14(R-)**", "39(R)12j"], "numLine20": ["10(R)2x", "43(R)2g", "39(R)12j", "09(R)2+", "27(R)12b**"], "numLine21": ["22(R)12\u00e5**", "46(R)2w", "33(R)6d", "30(R)2e", "27(R)12b**"], "numLine22": ["26(R)12l", "32(R)2o", "25(R)6-", "11(R)6>", "02(R)20p"], "numLine23": ["26(R)12l", "15(R)2)", "21(R)30r", "34(R-)", "23(R)12c"], "numLine24": ["46(R)2w", "40(R+)", "18(R+)", "35(R)2i", "09(R)2+"], "numLine25": ["14(R-)**", "15(R)2)", "35(R)2i", "05(R)2v", "45(R)12t"], "numLine26": ["26(R)12l", "46(R)2w", "08(R-)", "40(R+)", "33(R)6d"], "numLine27": ["22(R)12\u00e5**", "08(R-)", "31(R)12q", "47(R)6a", "33(R)6d"], "numLine28": ["38(R-)", "17(R)2h", "04(R)6f", "18(R+)", "01(R)12y"]}';

   selectedNumberObservable: Observable<any>;
   messageObservable = new Subject<string>();
   currentDrawnNumberObservers = {
      observers : [],
      addObserver(callBack) { this.observers.push(callBack); },
      getObserverCallback() {return this.observers; }


   };

  private _repeatedMega: string[] = [];
  private _last40Mega: string[] = [];
  private _last25Mega: string[] = [];


  // Proposed Selecting Ticket
  poiterOverNumberInPanel = new Subject<{
    cmd: string,
      value: string
    }>();
  pointerOutOfNumberInPanel = new Subject<string>();

  numberPanelDisplayConpleteSubject = new Subject<any>();

  private proposedSelectingTicketObserverQ = new Map<string, Observer<{
      cmd: string, //highlight, unhighlight
      ticket: string[] //ticket numbers
  }>>();
  
  // Notifier of the new proposed ticket if added the number being pointed to
  proposedSelectedTicketEvaluationObservers: Observer<{
     cmd: string,
     proposedTicket: string[]
  }> [] = [];

   constructor (private dataService: DataService)
   {
      //console.log('>>>Number-panel service:', new Date().getMilliseconds());
   }

  /**
   * Register the observer to check on proposed selected ticket
   * @param observerId
   * @param observer
   */
   registerProposedSelectingTicketObserver(observerId: string, observer: Observer<{cmd: string, ticket: string[]}>) {
       //console.log('>>>Register observer ...', observerId, observer);
       this.proposedSelectingTicketObserverQ.set(observerId, observer);
    }

  /**
   * Return the ticket for quandrant
   * @param quadrantIndex
   * @param numberOfTicket
   */
  getTicketNumberForQuadrant(quadrantIndex: number,
    numberOfTicket: number = 5): string[][] {
    const startAt = quadrantIndex * 5;
    const endAt = startAt + 5 > this.getNumberOfLine() ?
      this.getNumberOfLine() : startAt + 5;
    return this.getSubsetNumber(startAt, endAt);
  }

  /**
   * 
   * @param ticket 
   * @param number 
   */
  private ticketContainsNumber(ticket: string[], number:string ) {
    return ticket.find(tnumber => {
      if(number.length > 2) {
        return tnumber == number;
     } else {
       return tnumber.substring(0,2) == number;
     }
    }) != undefined;


  }

  /**
   * 
   * @param ticketToCheck
   * @param forQuadrantNumber
   */
  ticketNumberOccurancesInQuadrant(ticketToCheck: string[],
    forQuadrantNumber: number, resultFormatter: (result: TicketQuadAnalysisResultReader) => string): 
    Promise<string> {

    const resultCreator = (quadrantNumber) =>
      TicketInQuadrantAnalysisResult
        .TicketInQuadrantAnalysisResultFactory
        .createTicketInQuadrantAnalysisResultWriter(quadrantNumber);

    const resultCalculator = () => {
      const result = resultCreator(forQuadrantNumber);
      this.getTicketNumberForQuadrant(forQuadrantNumber).forEach(ticket => {
        ticketToCheck.forEach(number => {
          if (this.ticketContainsNumber(ticket, number)) {
            result.addTkNumberOccurance(number);
            result.addNumberOfOccurance();
          }
          // if (ticket.includes(number)) {
          //   result.addTkNumberOccurance(number);
          //   result.addNumberOfOccurance();
          // }
        })
      });
      return result;
    }

    const toReader = (writer) => TicketInQuadrantAnalysisResult
      .TicketInQuadrantAnalysisResultFactory
      .writerToReader(writer);

    //Invoke and return the result
    return new Promise((resolve, reject) => {
           setTimeout(() => {
             resolve(
               resultFormatter(
               toReader(
                   resultCalculator()
                 )
                 )
             );
          }, 200)
    })
  }

  /**
   *
   * @param forCmd
   * @param proposedTicket
   */
    broadcastProposedSelectingTicket(forCmd: string, proposedTicket: string[]) {

        const thisObj = this;

       const source = interval(200)
         .pipe(take(1), map(x => {
             return {
                cmd: forCmd,
                ticket: proposedTicket
             };
         }), publish())

        thisObj.proposedSelectingTicketObserverQ.forEach((observer, observerId) => {
          //console.log(`>>>key: ${observerId}  value:${observer}`);
          source.subscribe(observer);
       });
        (source as ConnectableObservable<any>).connect()
         
       ;
    }


  /**
   *
   */
  reset() {
    this.drawnNumbers = [];
    this.currentDrawnNumber = [];
    //this.messageQueue.push("");
    this.currentDrawnNumberObservable.next(this.currentDrawnNumber.slice());
    this.dataReadyBroadcast();
   }

  /**
   *
   */
  initThePanelData(gameName) {
    //console.log(">>Retrieving the data for ", gameName);
    
    return new Observable((observer) => {
      this.loadData(gameName, (jsonData) => {
        console.log(">>>>got the data...:", jsonData);

        this.currentDrawnNumber = null;
        this.setUpdata(jsonData);
        this.setupTheMega(jsonData);
        this.currentDrawnNumber = jsonData.lastDrawnNumberList ? jsonData.lastDrawnNumberList : [];
        this.currentDrawnNumberObservable.next(this.currentDrawnNumber.slice());
        //this.currentDrawnNumberObservable.complete(); //Call complete right after will sabotage the delivery of the data
        //console.log(">>>current drawn number:", this.currentDrawnNumber);
        this.setupClickUpdate();
        this.setupMessageObservable();
        this.dataReadyBroadcast();
        observer.next();

        //console.log('>>>>Analyzed drawn numbers:', this.drawnNumbers);

      });

    });



    }

  isDataReady() {
    return this.drawnNumbers.length > 0 && this.currentDrawnNumber.length > 0;
  }

  /**
   *
   */
  refreshSetup() {
    this.setupClickUpdate();
    this.setupMessageObservable();
    this.dataReadyBroadcast();
    }


  /**
   *
   * @param jsonData
   */
  setupTheMega(jsonData) {

      if (jsonData.megaResult) {
        this._last25Mega = jsonData.megaResult.last25mega;
        this._last40Mega = jsonData.megaResult.last40mega;
        this._repeatedMega = jsonData.megaResult.repeatedMega;

        //console.log('>>>>last40Mega: ', this._last40Mega);

        this.megaNumberInfoChange.next();
      }
    }

  /**
   *
   */
  get last25Mega(): string[] {
      return this._last25Mega;
    }


  /**
   *
   */
  get last40Mega(): string[] {
    return this._last40Mega;
  }


  /**
   *
   */
  get repeatedMega(): string[] {
    return this._repeatedMega;
  }

  /**
   * Broadcast data ready event to all listeners
   */
  dataReadyBroadcast() {

     //console.log('>>>>Broadcast to all listeners...');
     let observable = interval(200).pipe(take(1));
     observable = observable.pipe(multicast(() => new Subject<any>()));
     for (const observer of this.appInitObserverQ) {
         observable.subscribe(observer);
     }

     (observable as ConnectableObservable<any>).connect();

   }

   registerDataReadyNotification(callback) {
      this.appInitObserverQ.push(this.createObserverWrapper(callback));
     
   }
   
   private createObserverWrapper(callback) {
       return {
          next(value) { callback(value); },
          complete() {}
       };
   }
   
   loadDataLocal(callback)
   {
     const jsonData = JSON.parse(this.jsonDataString);
     callback(jsonData);
   }

/**
 * 
 * @param gameName 
 * @param callback 
 */
   loadData(gameName, callback)
   {
     this.reset();
     this.messageQueue.push("Loading the data from the backend");
     this.dataService.getLastResults_usingRxjs(
        gameName)
        .subscribe(
           (data) => {
              this.messageQueue.push("Receive data from the backend service");
              callback(data);
           },
           (error) => {this.messageQueue.push(error)},
           () => {}
        );
       
   }
 


   /**
    * 
    * @param gameName 
    * @param callback 
    */
  loadData_old(gameName, callback)
  {
    this.dataService.getLastResults_asynch(
       gameName,
      (data) => {

        callback(data);
      }, (error) => {
        //console.log('>>>Errror calling the url:', error);
      }

    );
  }

  /**
   * 
   * @param jsonData 
   */
  private setUpdata(jsonData) {
    this.drawnNumbers = []; ///Clear the arrayy
    if(jsonData?.numLine0) {
        for (let i = 0; i < 31; i++)
          {
              const data = jsonData['numLine' + i];
              this.drawnNumbers.push(data);
          }
        this.currentDrawnNumber = jsonData.lastDrawnNumberList;
    }

   }


   setupClickUpdate()
   {
       this.selectedNumberObservable = new Observable<any>( (observer) => {
         
          let timeoutId = 0;
         
               timeoutId = window.setInterval(() => {

                 if(this.numberBucket.length > 0){

                   observer.next(this.numberBucket.pop());
                 }

               }, 200);
               

          return {unsubscribe(): void {
               clearInterval(timeoutId);
            }

          };

        } );
   }

   setupMessageObservable()
   {
     const thatObj = this;

     const intervalId = setInterval(() =>{
          if(thatObj.messageQueue.length > 0) {
               thatObj.messageObservable.next(thatObj.messageQueue.pop());
          }

         },
         100);
   }

   // @ts-ignore
  setupDrwanNumberObservable() {

     const thisObject = this;
     const setupFunc = () => {

       const source = interval(200).pipe(take(5));



       const testingfunc = () => {

           return thisObject.currentDrawnNumberBroadcastQ.pop();
       };

       const numberCell = source.pipe(
        tap(ev => console.log(`>>>setupDrwanNumberObservable ${ev}`)),
         mapTo(

           testingfunc()
         )
       );

       const multi = numberCell.pipe(multicast(() => new Subject()));
     // @ts-ignore
       (multi as ConnectableObservable).connect();
     };

     setupFunc();



   }

   triggerCurrentDrawnNumberObservable(callback)
   {
      setTimeout(() => {
          this.currentDrawnNumberBroadcastQ.forEach((value) => {
              //console.log(`>>>triggerCurrentDrawnNumberObservable class: ${value.cssClass} number: ${value.dNumber}`)

              callback(value);
          });
      }, 200);

     // @ts-ignore
     //(this.currentDrawnNumberObservable as ConnectableObservable).connect();

     //this.setupDrwanNumberObservable();

   }

  getSubsetNumber(startFrom: number, endAt: number)
  {

     return this.drawnNumbers.slice(startFrom,
        endAt < this.drawnNumbers.length ? endAt : this.drawnNumbers.length-1);
  }

  getNumberOfLine()
  {
     return this.drawnNumbers.length -1;
  }

  getDrawnNumbers()
    {
        return this.drawnNumbers.slice();
    }

    getLastFrawnNumbers()
    {
       return this.currentDrawnNumber;
    }

    numberSelected(aNumber: any)
    {
       //if(!this.matchCurrentDrawnNumber(aNumber)) {
         this.numberBucket.push(aNumber);
       //}
       //else {
         // this.messageQueue.push('Selected number has alread been selected for the current ticket.');
       //}
    }
    
    matchCurrentDrawnNumber(aNumber: string)
    {
       let match = false;
       if(aNumber != null)
       {
          for (const num of this.currentDrawnNumber)
          {
              if (num === aNumber)
              {
                  match = true;
                  break;
              }
          }
       }
       return match;
    }

  /**
   *
   */
  getRepeatedNumber() {
    return this._repeatedMega.slice();
  }

  /**
   *
   */
  getLast40Mega() {
    return this._last40Mega.slice();
  }

  /**
   *
   */
  getLast25Mega() {
    return this._last25Mega.slice();
  }

  /**
   * 
   */
  getCurrentDrawnTicket(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        if (!this.currentDrawnNumber) {
          this.currentDrawnNumberObservable.subscribe(
            (item) => resolve(item),
            (error) => {reject(error)}
          )
        } else {
          resolve(this.currentDrawnNumber);
        }
      } )
   }

}
