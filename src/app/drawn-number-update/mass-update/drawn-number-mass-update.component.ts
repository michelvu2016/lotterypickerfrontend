import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentRef, QueryList, ViewChildren } from '@angular/core';

import * as _ from 'lodash';

import {ActivatedRoute, Params} from '@angular/router';
import {delay, switchMap, tap} from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { lotteryId } from '../../common/appTypes';
import { MVSpinnerComponent } from 'src/app/common/spinners/mv-spinner/mv-spinner.component';
import { DrawnNumberMassUpdateDetailsComponent } from './mass-update-details/drawn-number-mass-update-details.component';


class DomainTicketType {

  constructor (date: string, seqNum: string, numbes: string[], mega: string,
               private activatedRoute: ActivatedRoute) {}

}


@Component({
  selector: 'app-drawn-number-mass-update',
  templateUrl: './drawn-number-mass-update.component.html',
  styleUrls: ['./drawn-number-mass-update.component.css']
})
export class DrawnNumberMassUpdateComponent implements OnInit, AfterViewInit {

   lotteryIds = lotteryId;
   loaded = false;
   loadding = true;
   loadingLotteryIdList = this.lotteryIds.slice();
   doneLotteryIds = [];
   @ViewChild('spinner')
   spinner: MVSpinnerComponent;
   
   @ViewChildren('detailCompList')
   updateDetailCompList:  QueryList<DrawnNumberMassUpdateDetailsComponent>;
   showComps = false;

  ngOnInit() {

  }

  ngAfterViewInit() {
      console.log(">>>updateDetailCompList: ", this.updateDetailCompList);
      this.updateDetailCompList.forEach(comp => {
          console.log(">>>comp:", comp);
      });

      //const id = setTimeout(() => this.showComps = true, 1000);
     
  }
  
  loadingDone(lotteryType: string) {
      this.doneLotteryIds.push(lotteryType);
      this.loadingLotteryIdList = this.loadingLotteryIdList.filter(id => id !== lotteryType);
      if(this.loadingLotteryIdList.length === 0) {
        if (this.spinner) this.spinner.stop();
        
        this.loadding = false;
        this.loaded = true;
        this.showComps = true;
     }
  }

}
