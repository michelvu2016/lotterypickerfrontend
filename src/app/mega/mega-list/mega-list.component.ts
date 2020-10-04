import {Component, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {NumberPanelService} from '../../number-panel/number-panel.service';
import {NumberControlComponent} from '../../number-panel/number-control/number-control.component';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-mega-list',
  templateUrl: './mega-list.component.html',
  styleUrls: ['./mega-list.component.css']
})
export class MegaListComponent implements OnInit {

  data: string[] = null;

  @Output() selectedMegaNumberEvent = new EventEmitter<string>();
  
 
  @ViewChildren('numberCoontrolContainer') numberControlComponent: QueryList<NumberControlComponent>;

  @Input() numberOfMega: number;
  constructor(private numberPanelService: NumberPanelService, private renderer: Renderer2) { }

    ngOnInit() {
      const thisObj = this;
      this.numberPanelService.megaNumberInfoChange.subscribe({
      next() {


        if (thisObj.numberOfMega === 25) {
          thisObj.data = thisObj.numberPanelService.getLast25Mega();
        } else if (thisObj.numberOfMega === 40) {
          thisObj.data = thisObj.numberPanelService.getLast40Mega();
        } else if (thisObj.numberOfMega === 0) {
          thisObj.data = thisObj.numberPanelService.getRepeatedNumber();
        }
        //console.log('>>>mega-list comp. Number of Mega:', thisObj.numberOfMega, ' data:', thisObj.data);
      }

    });

      this.setupData();


  }

  /**
   *
   */
  setupData() {
    if (this.numberOfMega === 25) {
      this.data = this.numberPanelService.getLast25Mega();
    } else if (this.numberOfMega === 40) {
      this.data = this.numberPanelService.getLast40Mega();
    }  else if (this.numberOfMega === 0) {
      this.data = this.numberPanelService.getRepeatedNumber();
    }
  }

  /**
   *
   * @param event
   */
  mouseEvent(event: {cmd: string; value: string}) {

    this.numberControlComponent.forEach(numControl => {
       //console.log(">>>numControl:", numControl, ">>>NumControl.number:", numControl.number, "  event.value:", event.value);
       if (numControl.number === event.value) {
         if (event.cmd === 'mouseover') {
              numControl.highlight();
         } else if (event.cmd === 'mouseout') {
              numControl.unhighlight();
         }
       }
    })


  }

  /**
   * 
   * @param number 
   */
  numberSelected(number: string) {
    this.selectedMegaNumberEvent.next(number);
  }

}
