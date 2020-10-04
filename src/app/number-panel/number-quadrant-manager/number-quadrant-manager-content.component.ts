import {AfterContentInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NumberPanelService} from '../number-panel.service';
import {NumberQuadrantComponent} from '../number-quadrant/number-quadrant.component';
import {switchMap, take} from 'rxjs/operators';
import {interval} from 'rxjs';

@Component({
  selector: 'app-number-quadrant-manager-content',
  templateUrl: './number-quadrant-manager-content.component.html',
  styleUrls: ['./number-quadrant-manager-content.component.css']
})
export class NumberQuadrantManagerContentComponent implements OnInit, AfterContentInit {

  panelIndexList: number[] = [];
  @ViewChildren(NumberQuadrantComponent) numberQuadrantComponents: QueryList<NumberQuadrantComponent>;
  constructor(private numberPanelService: NumberPanelService) { }

  @Input()
  set refreshMode(value: boolean) {
    if (value) {
      interval(200).pipe(take(1)).subscribe(x => {
         this.numberPanelService.refreshSetup();
      });
    }
  }

  ngOnInit() {
     //console.log('>>>NumberQuadrantManagerComponent ngOnInit..');
     this.numberPanelService.registerDataReadyNotification(() => {
        this.init();
     });
  }

  private init()
  {
    const numLine = this.numberPanelService.getNumberOfLine();
    let numberOfPanel = numLine / 5;

    if (numLine % 5 !== 0)
    {
      numberOfPanel++;
    }

    this.panelIndexList = [];
    for (let i = 0; i < numberOfPanel; i++)
    {
      this.panelIndexList.push(i);
    }


  }

   onOverNumber(aNumber: any)
   {
       this.numberQuadrantComponents.forEach(numQuad => {
            numQuad.numberHighlighted(aNumber);
       });


     // Notify other componenent the number being pointed
       this.numberPanelService.poiterOverNumberInPanel.next(aNumber);

   }

   ngAfterContentInit(): void {

   }

  onNotifyCurrentDrawnNumber()
  {

  }

  onDoneDisplayPanel(panelNumber: number, maxNumberOfPanel) {
    //console.log(">>>onDoneDisplayPanel: ", panelNumber)
    this.numberPanelService.numberPanelDisplayConpleteSubject.next("numberPanelDisplayDone");
  }

}
