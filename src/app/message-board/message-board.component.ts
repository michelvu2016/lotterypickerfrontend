import {Component, Input, OnInit} from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {Observable, Subscription} from 'rxjs';
import {SelectedNumberService} from '../selected-number-manager/selected-number-service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {

  messageText = 'Sample message';
  messageSourceObservable: Observable<any>;
  private msgSub: Subscription;



  @Input('messageSource')
  set messageSource(msgSrc) {
    const thatObj = this;


    if(msgSrc.multiplexMsg) {
        this.selectedNumberService.registerObserver(msgSrc.msgSource, this.createMsgObserver(this));
    } else {
        this.msgSub = msgSrc.msgSource.subscribe(this.createMsgObserver(this));
    }



  }


  constructor(private numberPanelService: NumberPanelService, private selectedNumberService: SelectedNumberService) { }

  createMsgObserver(owner) {
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
