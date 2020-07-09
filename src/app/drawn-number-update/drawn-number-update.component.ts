import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DataService} from '../tools/data-service';
import * as _ from 'lodash';
import {LastDrawnNumber} from '../models/LastDrawnNumber';
import {CommonServices} from '../common/common.services';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';

class DomainTicketType {

  constructor (date: string, seqNum: string, numbes: string[], mega: string,
               private activatedRoute: ActivatedRoute) {}

}


@Component({
  selector: 'app-drawn-number-update',
  templateUrl: './drawn-number-update.component.html',
  styleUrls: ['./drawn-number-update.component.css']
})
export class DrawnNumberUpdateComponent implements OnInit {

  lastDrawnNumbers: LastDrawnNumber[] = [];
  ticketList: string[] = [];
  submitResult: any;

  lotteryTypeId = '';

  numberOfLastDrawnsNeeded = 0;
  dataRetrievalUrl: any;
  @ViewChild('ticket') ticketsToUpload : ElementRef 

  constructor(private dataService: DataService, private commonService: CommonServices,
              private activatedRoute: ActivatedRoute) { }


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

  private resetFields() {
    this.ticketList = [];
    this.lastDrawnNumbers = [];
    this.numberOfLastDrawnsNeeded = 0;
    this.dataRetrievalUrl = null;
    this.ticketsToUpload.nativeElement.value = "";
    this.submitResult = null;
  }
  
  /**
   * Retrieve the data from the backend
   * @param numOfNumEl
   */
  getData(numOfNumEl: HTMLInputElement) {
    const numberOfNum = +numOfNumEl.value;

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
    });


  }

  /**
   *
   * @param textAreaField
   */
  submitDrawnNumberAsJson (textAreaField) {
   // console.log('>>>Data to be submitted:', textAreaField.value);

    this.dataService.submitDrawnNumbersAsJoson(textAreaField.value, this.lotteryTypeId).then((result) => {

      // @ts-ignore
      this.submitResult = result.result;
    });

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
