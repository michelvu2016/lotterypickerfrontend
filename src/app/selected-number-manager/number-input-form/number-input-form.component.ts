import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {SelectedNumberService} from '../selected-number-service';
import * as fromActions from '../../store/actions/selected-numbers.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-number-input-form',
  templateUrl: './number-input-form.component.html',
  styleUrls: ['./number-input-form.component.css']
})
export class NumberInputFormComponent implements OnInit, AfterViewInit {

  @ViewChild("numberEnter") numberEnter: ElementRef

  @ViewChild("highlightButton") highlightButtonElmRef: ElementRef;

  @Input()
  set displayTicketNumberInput(value: boolean) {
    //console.log(">>>>displayTicketNumberInput:", value);
    this.showTicketNumberEntry = value;
  }

  ticketNumberInputData: string = "";
  validInputTicketNumber = false;
  ticketNumberMessage: string;

  showTicketNumberEntry = false;


  constructor(private selectedNumberService: SelectedNumberService,
          private highlightNumberStore: Store<fromActions.AppState>
          ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
     
  }

  highlightInputNumber() {
     this.highlightNumberStore.dispatch(
        fromActions.setHighlightTicketAction({
           ticketNumbers: this.ticketNumberInputData.trim().split(" ")
        })
     );
  }

  onCheckInputNumber() {
    if (!this.localTicketNumberValidation()) {
      return;
    }

    const appendMessage = (msg, msgNumber) => {

      if (msgNumber == 1) {
        this.ticketNumberMessage = "";
      }
        if (this.ticketNumberMessage.length) {
          this.ticketNumberMessage + "; "
        }
        this.ticketNumberMessage += msg;
      
    }

    this.ticketNumberMessage = "Validing ticket....";
    let msgNumber = 0;
    this.selectedNumberService.
      validateNumber(this.stringToStringArrary(this.ticketNumberInputData))
      .subscribe(
      
        (msg) => {
          msgNumber++;
          appendMessage(msg, msgNumber);
      }
     );





  }

  //---------------------
  private stringToStringArrary(stringIn: string): string[] {
    
    if (stringIn.length) {
      return stringIn.split(" ").map(s => s.trim())
    } else {
      return null;
    }
  }

///=============
onClearInputNumber() {
  this.ticketNumberInputData = "";
}

localTicketNumberValidation(): boolean {
  if (this.ticketNumberInputData.split(" ").length < 5) {
    this.ticketNumberMessage = "Ticket is not valid to proceed";
    return false;
  } else {
    return true;
  }
}

private getTicketNumberInputValue() {
  return this.numberEnter.nativeElement.value;
}

onTicketNUmberInputChange() {
  if (this.ticketNumberInputData.split(" ").length >= 5) {
    this.validInputTicketNumber = true;
  } else {
    this.validInputTicketNumber = false;
  }
  
}

//=============

/**
   **/
  onAcceptInputNumber() {
    this.selectedNumberService.addTicketToBucket(this.getInputTicket()).then((msg) => {
      this.ticketNumberInputData = "";
      this.ticketNumberMessage = "";
    });
  }

  //=============

  /**
   *
   **/
  private getInputTicket(): string[] {
    return this.stringToStringArrary(this.ticketNumberInputData);
  }

  //=================






}
