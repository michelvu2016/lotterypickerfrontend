import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {Observable, Subscription, pipe, of, race, forkJoin, merge, empty, concat} from 'rxjs';
import {SelectedNumberService} from '../selected-number-manager/selected-number-service';
import {fromActions, fromReducer, fromSelectors} from '../store';
import { Store } from '@ngrx/store';
import { delay, tap, mergeMap, concatMap, mergeAll } from 'rxjs/operators';

export enum MESSAGE_SOURCE  {
   GENERAL_MSG,
   SYSTEM_MSG
}

export type MessageSource = MESSAGE_SOURCE.GENERAL_MSG | MESSAGE_SOURCE.SYSTEM_MSG;

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit, AfterViewInit {

  messageText = 'Sample message';
  messageSourceObservable: Observable<any>;
  private msgSub: Subscription;

  systemMessageType: MESSAGE_SOURCE = MESSAGE_SOURCE.SYSTEM_MSG;
  generalMessageType: MESSAGE_SOURCE = MESSAGE_SOURCE.GENERAL_MSG;

  private _messageSource : MessageSource;



  @Input('messageSource')
  set messageSource(msgSrc) {
    this._messageSource = msgSrc;

  }



  constructor(private numberPanelService: NumberPanelService, 
    private selectedNumberService: SelectedNumberService,
    private store: Store<fromActions.AppState>,
    private systemMessageStore: Store<fromActions.AppState>
    ) { }

  ngAfterViewInit() {
    let messsage$ = of("");
    if(this._messageSource == MESSAGE_SOURCE.SYSTEM_MSG) {
        messsage$ = this.systemMessageStore.select(fromSelectors.systemMessageSelector);
      } else {
        messsage$ = this.systemMessageStore.select(fromSelectors.messageSelector);
      }
    
    
    const errorMsg$ = this.store.select(fromSelectors.errorSelector);

    errorMsg$.pipe(
      delay(100)
    )
    .subscribe((msg) => this.messageText = msg)

    messsage$.pipe(
      delay(100)
    )
    .subscribe((msg) => this.messageText = msg)

    /* merge (
       messsage$, errorMsg$
    ).pipe(delay(100))
    .subscribe(
      (msg) => this.messageText = msg  
    ); */
     

 
  
  }


  createMsgObserver_xx(owner) {
    return  {
      ticketId: null,
      observable: null,
      autoClearMsg: () => {
           setTimeout(() => owner.messageText = '', 100);
      },
      next(msg) {
        if(msg.unfocus)
        {
          //owner.unsub();
          if (msg.fn)
          {
            msg.fn.call(owner);
          }
        } else if (msg.clearmsg) {
          owner.messageText = '';
        } else {
          owner.messageText = msg;
        }
      },
      complete() {},
      name() { return this.ticketId; }
    };
  }


  ngOnInit() {
      }

  unsub() {
    if (this.msgSub)
    {
      //this.msgSub.unsubscribe();
      this.msgSub = null;

    }
  }


}
