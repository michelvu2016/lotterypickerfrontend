import { NumberQuadrantComponent } from "../number-quadrant/number-quadrant.component";
import { OnInit, Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NumberPanelService } from '../number-panel.service';
import { TicketInQuadrantAnalysisResultReader } from '../../models/TicketInQuadrantAnalysisResult';
import { CommonServices } from '../../common/common.services';

@Component({
  selector: 'app-number-quadrant-analysis',
  templateUrl: 'NumberQuadrantAnalysisCompoennt.html',
  styleUrls: ['NumberQuadrantAnalysisCompoennt.css']

})
export class NumberQuadrantAnalysisCompoennt implements OnInit, AfterViewInit {

  ticketNumberQuadrantAnalysisResult: string = "";
  numberOfQuadrant: number = 6;
  displayClass = "";
  label = "numbers appear in panel:";

  @Input('fieldLabel') 
  set fieldLabel(name: string) {
    this.label = name;
  }

  @Input('displayClass')
  set cssClassToUse(name: string) {
    this.displayClass = name;
  }

  @ViewChild('field') widget: ElementRef;

  constructor(private numberPanelService: NumberPanelService, private commonService: CommonServices,
          private renderer: Renderer2) {

  }

  /**
   **/
  ngOnInit(): void {

      if (this.numberPanelService.isDataReady()) {
        this.init();
      } else {
        this.numberPanelService.registerDataReadyNotification(() => {
                this.init();
              });
    }
  }

  ngAfterViewInit() {

    if(!this.displayClass || this.displayClass?.length == 0) {
       return;
    }

    const classesRetriever = (process) => {
      const numClass = this.widget.nativeElement?.className?.length;
        if(numClass && numClass > 1) {
            const clss = this.widget.nativeElement?.className.split(" ").slice();
            clss.forEach(element => {
              process(element);
            });
        } else if(numClass) {
          process(numClass);
        }
    };
    
    //Clear Existing class
    classesRetriever((className) => {
        this.renderer.removeClass(this.widget.nativeElement, className);
    });
    
    this.renderer.addClass(this.widget.nativeElement, this.displayClass);
    

  }
  


  private init() {
    //console.log(">>>number-quadrant-analysis - init() - call service to get analysis.");
    this.ticketNumberQuadrantAnalysisResult = "";

    const tkNumberOccurDetailLambda = (result: TicketInQuadrantAnalysisResultReader) => {
      const retResult: string[] = [];
      result.getTkNumberOccurance((num, nTimes) => {
        retResult.push(`${this.commonService.pullNumberOut(num)}:${nTimes}`)
      });
      return retResult.join(";");
    }

    for (let quadNum = 0; quadNum < this.numberOfQuadrant; quadNum++) {
      this.numberPanelService.ticketNumberOccurancesInQuadrant(this.numberPanelService.getLastFrawnNumbers(),
        quadNum, (result) => {
          return ` Q${result.getQuadrantNumber()}-${result.getNumberOfOccurances()}[${tkNumberOccurDetailLambda(result)}]`

      }).then(s => this.ticketNumberQuadrantAnalysisResult += s);
    }

    
  }

}
