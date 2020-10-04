import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-mega-manager',
  templateUrl: './mega-manager.component.html',
  styleUrls: ['./mega-manager.component.css']
})
export class MegaManagerComponent implements OnInit {

  @Output() selectedNumberEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  numberSelected(number) {
    
        console.log("[MegaManagerComponent] numberSelected: ", number);
        this.selectedNumberEmitter.emit(number);
    
  }


}
