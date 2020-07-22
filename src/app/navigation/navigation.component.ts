import { Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { NavigationEventTriggerConfig } from '../constants/constants';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {




  lotteryTypesMap = new Map<string, string>(
    [
      ['fantasy5', 'Fantasy 5'],
      ['superlotto', 'SuperLotto'],
      ['powerball', 'Powerball'],
      ['megamillion', 'MegaMillion']
    ]

  );



  menuTriggerRelayEventEmitter = new EventEmitter<NavigationEventTriggerConfig>();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

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


}
