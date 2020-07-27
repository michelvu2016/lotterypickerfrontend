import {Component, OnDestroy, OnInit, ViewChild, ElementRef, Input, HostListener} from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {Observable, Subscription} from 'rxjs';
import _ from 'lodash';
import {SelectedNumberService} from './selected-number-service';
//import {el} from '@angular/platform-browser/testing/src/browser_util';
import {CommonServices} from '../common/common.services';
import { SelectedNumberComponent } from '../selected-number/selected-number.component';

@Component({
  selector: 'app-selected-number-manager',
  templateUrl: './selected-number-manager.component.html',
  styleUrls: ['./selected-number-manager.component.css'],

})
export class SelectedNumberManagerComponent implements OnInit, OnDestroy {
  private selectedNumberSub: Subscription;
  selectedNumberTicket: string[][] = [];
  private selectedNumberTicketSub: Subscription;

  constructor(private numberPanelService: NumberPanelService, private selectedNumberService: SelectedNumberService,
              private commonService: CommonServices) { }

  ngOnInit() {
    //console.log('>>>selected-number-manager-comp:', this.selectedNumberTicket);
    const thisObject = this;

    this.numberPanelService.registerDataReadyNotification(() => {
      this.selectedNumberTicketSub = this.selectedNumberService.selectedNumberTicketChange.subscribe({
        next(value) { thisObject.selectedNumberTicket = value},
        complete() {}

      });

      this.selectedNumberSub = thisObject.numberPanelService.selectedNumberObservable
        .subscribe({
          next(num) {

            thisObject.selectedNumberService.addOrUpdate(
              thisObject.commonService.pullNumberOut(num)
            );
          },
          complete() { /*console.log('>>>Broadcast completed');*/ }
        });
    });

    // Subscribe the number under the mouse notification
    this.numberPanelService.poiterOverNumberInPanel.subscribe(numberUnderTheMouse => {
        //Broadcast the new proposed ticket to all the number panel
        //console.log('>>>>Number under mouse captured', numberUnderTheMouse);


        // Logic to implement:
        // When the selecting ticket is full (5) then allow only the unhighlight broadcast to go through
        if (this.selectedNumberService.getCurrentTicket() && this.selectedNumberService.getCurrentTicket().length < 5)
        {

        }

      const proposedNewTicket = this.selectedNumberService.getCurrentTicket();
      //console.log('>>>Proposed ticket:', proposedNewTicket);
      if (proposedNewTicket && proposedNewTicket.length > 0) {
        //console.log('>>>Broadcast the selecting ticket...');
        let cmdAction = '';

        if (numberUnderTheMouse.cmd === 'mouseover') {
          cmdAction = 'highlight';
        } else {
          cmdAction = 'unhighlight';
        }

        // If there is a flip
        if (this.selectedNumberService.isThereATicketFlip) {
            this.broadcastTheProposedTicket('unhighlight', this.selectedNumberService.previousEdittedTiclet); //Clear the warning highlight
        }

        const newNumber = this.selectedNumberService.getCurrentTicket() && this.selectedNumberService.getCurrentTicket().length < 5
                                    ? numberUnderTheMouse.value : '';

        const proposedTicket = proposedNewTicket.slice().concat(
          this.commonService.pullNumberOut(newNumber)
                );

        this.broadcastTheProposedTicket(cmdAction, proposedTicket);

      }

    });

/*    this.numberPanelService.numberPanelDisplayConpleteSubject.subscribe(() => {
      this.displayTicketNumberInput = true
    })*/


    }

  /**
   *
   * @param cmd
   * @param ticket
   */
    private broadcastTheProposedTicket(cmd: string, ticket: string[]) {
      this.numberPanelService.broadcastProposedSelectingTicket(cmd,
          ticket
       );
    }


  /**
   *
   */
  getCurrentTicket(): string[] {
        return this.selectedNumberTicket[this.getCurrentIndex()];
    }


  /**
   *
    */
  getCurrentIndex() {
    return this.selectedNumberService.currentIndex;
  }

  ngOnDestroy(): void {

    //console.log(">>>ngOnDestroy");

    if (this.selectedNumberSub)
      this.selectedNumberSub.unsubscribe();
  }

  onClick(element:any) {

  }

  private stringToStringArrary(stringIn: string): string[] {
    
    if (stringIn.length) {
      return stringIn.split(" ").map(s => s.trim())
    } else {
      return null;
    }
  }

  @HostListener('window:keydown',['$event'])
  onKeyDownCheck(event: KeyboardEvent) {
    //console.log(">>>Trapping key down:", event);

  }

  /**
   * 
   * @param comp 
   */
  onClickSelectedNumberComp(comp: SelectedNumberComponent ) {
    //console.log(">>[SelectedNumberManagerComponent] onClickSelectedNumberComp: ", comp);
    comp.componentSelected();
  }

}
