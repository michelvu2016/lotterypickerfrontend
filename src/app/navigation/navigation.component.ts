import { Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';

import { NavigationEventTriggerConfig } from '../constants/constants';
import { fromActions } from '../store';
import { AppState } from '../store/actions/selected-numbers.action';
import { LotteryIdIndex, getLotteryId }  from '../common/appTypes'


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {




  lotteryTypesMap = new Map<string, string>(
    [
      [getLotteryId(LotteryIdIndex.FANTASY5), 'Fantasy 5'],
      [getLotteryId(LotteryIdIndex.SUPERLOTTO), 'SuperLotto'],
      [getLotteryId(LotteryIdIndex.POWERBALL), 'Powerball'],
      [getLotteryId(LotteryIdIndex.MEGAMILION), 'MegaMillion']

      // ['fantasy5', 'Fantasy 5'],
      // ['superlotto', 'SuperLotto'],
      // ['powerball', 'Powerball'],
      // ['megamillion', 'MegaMillion']
    ]

  );



  menuTriggerRelayEventEmitter = new EventEmitter<NavigationEventTriggerConfig>();

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private appStore: Store<AppState>) { }

  ngOnInit() {

}

onClick(elm: any) {
  console.log("[NavigationComponent] passed element: ", elm);
}

ngAfterViewInit() {
}

  /**
   *
   */
  lotteryTypeKeys(): string[] {
     return Array.from(this.lotteryTypesMap.keys());
  }

  /**
   *
   * @param key
   */
  lotteryTypeLabel(key) {
    return this.lotteryTypesMap.get(key);
  }

  /**
   *
   * @param gameName
   */
  updateDrawnData(gameName: string) {


    this.router.navigate(['/updateLastDrawnNumbers', gameName]);
  }

  selectNumbersFor(gameName: string) {
    this.router.navigate(['/ticketSelection', gameName]);
  }

  setMenuActive(menuEvent: NavigationEventTriggerConfig) {
    //console.log(">>Menu event triggered:", menuEvent.eventName);
    
    this.menuTriggerRelayEventEmitter.emit(menuEvent);
  }

  admin() {
    //Post message for site administration
    this.appStore.dispatch(fromActions.adminRequestAction());

  }

}
