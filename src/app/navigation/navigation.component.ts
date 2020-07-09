import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  lotteryTypesMap = new Map<string, string>(
    [
      ['fantasy5', 'Fantasy 5'],
      ['superlotto', 'SuperLotto'],
      ['powerball', 'Powerball'],
      ['megamillion', 'MegaMillion']
    ]

  );


  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

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
}
