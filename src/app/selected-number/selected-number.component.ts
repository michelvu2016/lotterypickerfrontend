import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NumberPanelService} from '../number-panel/number-panel.service';
import {Observable, Subscription} from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


import _ from 'lodash';
import {SelectedNumberService} from '../selected-number-manager/selected-number-service';
import { Store } from '@ngrx/store';
import { SelectedNumbers } from '../models/SelectedNumbers';
import { SelectedNumbersAction } from '../store/actions/selected-numbers.action';

@Component({
  selector: 'app-selected-number',
  templateUrl: './selected-number.component.html',
  styleUrls: ['./selected-number.component.css']
})
export class SelectedNumberComponent implements OnInit, OnDestroy, OnChanges {

  @Input() maxNumber = 5;

  selectedNumberSub: Subscription;
  @Input() numbers: string[];
  @Input() ticketNumber: number;
  @Input() ticketId: any;

  private prevSelectedNumber: string[];

  trashBin = [];
  highlightNumberFlag = false;



  constructor(private numberPanelService: NumberPanelService,
    private selectedNumberService: SelectedNumberService,
    private selectedNumbersStore: Store<{ selectedNumbers: SelectedNumbers }>
  ) {

  }

  ngOnInit() {


  }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
     //console.log()
  }

  currentNumberIndex() {
    return this.selectedNumberService.currentIndex;
  }

  remove() {
    this.selectedNumberService.removeTicket(this.ticketId);
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
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  onTicketNumberClick(event:any) {

  }

  mouseOverNumber() {

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
}

