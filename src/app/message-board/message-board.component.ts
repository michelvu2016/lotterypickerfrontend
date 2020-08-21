import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {Observable, Subscription, pipe, of, race, forkJoin} from 'rxjs';
import {SelectedNumberService} from '../selected-number-manager/selected-number-service';
import {fromActions, fromReducer, fromSelectors} from '../store';
import { Store } from '@ngrx/store';
import { delay, tap, mergeMap, concatMap, concat } from 'rxjs/operators';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit, AfterViewInit {

  messageText = 'Sample message';
  messageSourceObservable: Observable<any>;
  private msgSub: Subscription;



  @Input('messageSource')
  set messageSource(msgSrc) {
    const thatObj = this;

  }



  constructor(private numberPanelService: NumberPanelService, 
    private selectedNumberService: SelectedNumberService,
    private store: Store<fromActions.AppState>
    ) { }

  ngAfterViewInit() {
    
    const messsage$ = this.store.select(fromSelectors.messageSelector);
    const errorMsg$ = this.store.select(fromSelectors.errorSelector);

    race (
         messsage$, errorMsg$
      )
    
      messsage$
      .subscribe((msg) => this.messageText = msg);

      errorMsg$  
    .subscribe((msg) => this.messageText = msg);


     

     this.store.select(fromSelectors.errorSelector)
        .pipe(
            delay(200),
            concatMap(msg => messsage$
                .pipe()
              ),
            tap(msg => console.log(">>>[MessageBoardComponent] msg:", msg)),  
            //tap(msg => this.messageText = msg )
        )
        .subscribe();
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
