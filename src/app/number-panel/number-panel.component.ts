import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { NumberPanelService } from './number-panel.service';
import {NumberControlComponent} from './number-control/number-control.component';

@Component({
  selector: 'app-number-panel',
  templateUrl: './number-panel.component.html',
  styleUrls: ['./number-panel.component.css']
})
export class NumberPanelComponent implements OnInit, AfterViewInit {

    drawnNumbers: string[][] = [];
    @ViewChildren(NumberControlComponent) numberControlComponents !: QueryList<NumberControlComponent>;


  constructor(private numberPanelService: NumberPanelService) { }

  ngOnInit() {

      this.drawnNumbers = this.numberPanelService.getDrawnNumbers();
  }

  rowClick() {
     console.log(">>>>Row clicked");
  }

  ngAfterViewInit(): void {

  }

  numberHighlighted(data: any)
  {

   this.numberControlComponents.forEach(comp => {
        if(comp.number === data.value)
        {
            if(data.cmd == 'mouseover') {
              comp.highlight();
            }
            else if (data.cmd == 'mouseout')
            {
               comp.unhighlight();
            }
        }

     });


  }

}
