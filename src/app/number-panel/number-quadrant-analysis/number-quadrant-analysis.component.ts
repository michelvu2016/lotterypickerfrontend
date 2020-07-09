import { NumberQuadrantComponent } from "../number-quadrant/number-quadrant.component";
import { OnInit, Component } from '@angular/core';
import { NumberPanelService } from '../number-panel.service';
import { TicketInQuadrantAnalysisResultReader } from '../../models/TicketInQuadrantAnalysisResult';
import { CommonServices } from '../../common/common.services';

@Component({
  selector: 'app-number-quadrant-analysis',
  templateUrl: 'NumberQuadrantAnalysisCompoennt.html',
  styleUrls: ['NumberQuadrantAnalysisCompoennt.css']

})
export class NumberQuadrantAnalysisCompoennt implements OnInit {

  ticketNumberQuadrantAnalysisResult: string = "";
  numberOfQuadrant: number = 6;

  constructor(private numberPanelService: NumberPanelService, private commonService: CommonServices) {

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


  private init() {
    console.log(">>>number-quadrant-analysis - init() - call service to get analysis.");
    this.ticketNumberQuadrantAnalysisResult = "";

    const tkNumberOccurDetailLambda = (result: TicketInQuadrantAnalysisResultReader) => {
      const retResult: string[] = [];
      result.getTkNumberOccurance((num, nTimes) => {
        retResult.push(`${this.commonService.pullNumberOut(num)}:${nTimes}`)
      });
      return retResult.join(" ");
    }

    for (let quadNum = 0; quadNum < this.numberOfQuadrant; quadNum++) {
      this.numberPanelService.ticketNumberOccurancesInQuadrant(this.numberPanelService.getLastFrawnNumbers(),
        quadNum, (result) => {
          return ` Q${result.getQuadrantNumber()}-${result.getNumberOfOccurances()}[ ${tkNumberOccurDetailLambda(result)} ] `

      }).then(s => this.ticketNumberQuadrantAnalysisResult += s);
    }

    
  }

}
