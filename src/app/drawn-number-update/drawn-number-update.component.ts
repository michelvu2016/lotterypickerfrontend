import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {DataService} from '../tools/data-service';
import * as _ from 'lodash';
import {LastDrawnNumber} from '../models/LastDrawnNumber';
import {CommonServices} from '../common/common.services';
import {ActivatedRoute, Params} from '@angular/router';
import {delay, switchMap, tap} from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { LastNumberOfTicketInfo } from '../common/appTypes';
import { ThrowStmt } from '@angular/compiler';

class DomainTicketType {

  constructor (date: string, seqNum: string, numbes: string[], mega: string,
               private activatedRoute: ActivatedRoute) {}

}


@Component({
  selector: 'app-drawn-number-update',
  templateUrl: './drawn-number-update.component.html',
  styleUrls: ['./drawn-number-update.component.css']
})
export class DrawnNumberUpdateComponent implements OnInit, AfterViewInit {

  lastDrawnNumbers: LastDrawnNumber[] = [];
  ticketList: string[] = [];
  submitResult: any;

  lotteryTypeId = '';
  lastDrawnJasonData = "";

  message = null;
  errorMsg = null;

  numberOfTickets = "5";

  numberOfLastDrawnsNeeded = 0;
  dataRetrievalUrl: any;
  @ViewChild('ticket') ticketsToUpload : ElementRef;

  @ViewChild('numOfNumEl') numOfNumElInput: ElementRef;

  constructor(private dataService: DataService, private commonService: CommonServices,
              private activatedRoute: ActivatedRoute) { 
                  }


  /**
   *
    */
  ngOnInit() {

    //console.log("drawn-number-update.component.ts - ngOnInit");



    this.lotteryTypeId = this.activatedRoute.snapshot.params.id;


    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const lotteryTypeWanted = params['id'];
        if (lotteryTypeWanted != this.lotteryTypeId) {
          this.resetFields();
        }
        this.lotteryTypeId = params['id'];

      }
    );
  }

  ngAfterViewInit() {
    this.activatedRoute.data.pipe(
      delay(100),

    ).subscribe(data => {
       console.log(">>>[DomainTicketType] resolved data:");
       console.log(data.lastNumberDrawnTickets);
       const resData = data.lastNumberDrawnTickets as LastNumberOfTicketInfo;
       this.numberOfTickets = ""+resData.numberOfTicket;
       this.updateComponent(resData.data);

    })
  }

  private resetFields() {
    this.ticketList = [];
    this.lastDrawnNumbers = [];
    this.numberOfLastDrawnsNeeded = 0;
    this.dataRetrievalUrl = null;
    this.ticketsToUpload.nativeElement.value = "";
    this.submitResult = null;
  }
  

  getData(numOfNumEl: HTMLInputElement) {
    const numberOfNum = +numOfNumEl.value;
    this.getLastNumberDrawnTickets(numberOfNum);
  }

/**
 * 
 * @param data 
 */
  private updateComponent(data: any) {
      this.lastDrawnNumbers = [];

      const dataDetails = data as {listOfTicketHolders: any, numOfDrawnsNeeded: any, dataRetrievalUrl: any};

      this.numberOfLastDrawnsNeeded = dataDetails.numOfDrawnsNeeded;

      this.dataRetrievalUrl = dataDetails.dataRetrievalUrl;
      
      (dataDetails.listOfTicketHolders as LastDrawnNumber[]).forEach((item) => {

          this.lastDrawnNumbers.push(item);
      });
   }


  /**
   * Retrieve the data from the backend
   * @param numberOfNum
   */
  getLastNumberDrawnTickets(numberOfNum) {
    

    const thisObj = this;
    this.dataService.getDrawnNumbers(numberOfNum, this.lotteryTypeId).then(data => {
       this.lastDrawnNumbers = [];

       const dataDetails = data as {listOfTicketHolders: any, numOfDrawnsNeeded: any, dataRetrievalUrl: any};

       this.numberOfLastDrawnsNeeded = dataDetails.numOfDrawnsNeeded;

       this.dataRetrievalUrl = dataDetails.dataRetrievalUrl;
       
       //console.log('>>>Data returned.dataDetails:', dataDetails);
      (dataDetails.listOfTicketHolders as LastDrawnNumber[]).forEach((item) => {

          this.lastDrawnNumbers.push(item);
      });
      }
    );

  }

   retrievePastNumberOfTickets() {
     if(this.dataRetrievalUrl && this.numberOfLastDrawnsNeeded > 0) {
          
     }
   }

  /*addTicketToList(ticket: HTMLInputElement) {
    this.ticketList.push(ticket.value);
    ticket.value = '';
  }*/

  parseTicketStringToModel(): LastDrawnNumber[] {
    const ticketNumList: LastDrawnNumber[] = [];

    //console.log(">>Lodash object:", _);

    _.map(this.ticketList, (item) => {
        const parts = item.split(' - ');
        if (parts.length < 2) {
          return;
        }
        const dateString = parts[0];
        const seqAndNumbers = (parts[1] as string).split('\t');
        const seqNum = seqAndNumbers[0];
        const snumber = this.stringToStringArray(seqAndNumbers[1]);
        let mega = null;
        if (seqAndNumbers.length === 3) {
          mega = seqAndNumbers[2];
        }

        ticketNumList.push(
          new LastDrawnNumber(dateString, seqNum, snumber, mega)
        );



    });


    return ticketNumList;
  }


  /**
   * Return the string array from string for ticket number
   * @param stringin
   */
  private stringToStringArray(stringin: string): string[] {

    const retStringArray: string[] = [];

    for(let beginIndex = 0, endIndex = beginIndex + 2;
    beginIndex < stringin.length - 1;
    beginIndex = endIndex, endIndex = beginIndex + 2) {

      retStringArray.push(stringin.substring(beginIndex, endIndex));
    }

    return retStringArray;
  }

  /**
   * Transform the local data to domain data type format
   * @param localTicketList
   */
  transformTicketFormatToDomainFormat(localTicketList) {
      return _.map(localTicketList, (ticket: LastDrawnNumber) => {
         const domainTicket = {date: ticket.date, seqNum: ticket.seqNum, numbers: ticket.numbers, mega: ticket.mega};
         return domainTicket;
    });
  }

  submitTickets() {
    const ticketsForUpdate = this.transformTicketFormatToDomainFormat(this.parseTicketStringToModel());
    this.dataService.submitDrawnNumbers(ticketsForUpdate, this.lotteryTypeId).then((result) => {

       // @ts-ignore
       this.submitResult = result.result;
       this.lastDrawnJasonData = null;
    });


  }

  /**
   *
   * @param textAreaField
   */
  submitDrawnNumberAsJson (textAreaField) {
   // console.log('>>>Data to be submitted:', textAreaField.value);
       this.submitUpdatedDrawnNumber(textAreaField.value)
        .subscribe((result) => {
          this.submitResult = result.result;
        });
    }

  /**
   * 
   * @param jsonString 
   */
  private submitUpdatedDrawnNumber(jsonString): Observable<any> {
    
    return from(
      this.dataService.submitDrawnNumbersAsJoson(jsonString, this.lotteryTypeId)
    )



    // this.dataService.submitDrawnNumbersAsJoson(jsonString, this.lotteryTypeId).then((result) => {

    //   // @ts-ignore
    //   this.submitResult = result.result;
    // });


  }


  updateTheLastDrawnTicket() {
    this.message = "Retrieve the last drawn tickets..."
    this.errorMsg = null;
    this.dataService.retrievePastDrawnTickets_Async(
       this.lotteryTypeId,
       this.dataRetrievalUrl
    ).then((value) => {
      //Expect the value to be the json string
      this.message = null;
      this.lastDrawnJasonData = 
          JSON.stringify(
              JSON.parse(
                    value
                    ), null, 2
          );
      this.submitUpdatedDrawnNumber(value)
         .pipe(
            tap(result => this.submitResult = result.result),
            switchMap(_ => {
              const numOfTicket = this.numOfNumElInput.nativeElement.value;
              this.getLastNumberDrawnTickets(numOfTicket);
              this.lastDrawnJasonData = null;
              return of();
            })

         ).subscribe();
      ;


    })
    .catch((error) => {
      //Error message from the serice
      this.errorMsg = error;
    })
  }


  clearTickets() {
    this.ticketList = [];
  }

  clearField(ticket: HTMLTextAreaElement) {
    ticket.value = '';
  }

/*  clearField(ticket: HTMLInputElement) {
    ticket.value = '';
  }*/
}
