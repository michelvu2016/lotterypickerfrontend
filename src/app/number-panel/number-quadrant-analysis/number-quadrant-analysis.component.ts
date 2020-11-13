import { NumberQuadrantComponent } from "../number-quadrant/number-quadrant.component";
import { OnInit, Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { NumberPanelService } from '../number-panel.service';
import { TicketInQuadrantAnalysisResultReader } from '../../models/TicketInQuadrantAnalysisResult';
import { CommonServices } from '../../common/common.services';
import { Observable, of, from, Subject, interval } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { fromActions, fromSelectors } from 'src/app/store';


export interface QuandrantAnalysisResult {
     [quadNumber: number] : string[]
}


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

  ticketNumberInQuadrantAnalysis: QuandrantAnalysisResult;

  @Input()
  tickets = [];

  @Input('fieldLabel') 
  set fieldLabel(name: string) {
    this.label = name;
  }

  @Input()
  ticketObs : Subject<string[]>;

  @Output()
  dataObsReadyEvent = new EventEmitter<void>();

  @Input('displayClass')
  set cssClassToUse(name: string) {
    this.displayClass = name;
  }

  @ViewChild('field') widget: ElementRef;

  constructor(private numberPanelService: NumberPanelService, private commonService: CommonServices,
    private appStore: Store<fromActions.AppState>,
    private renderer: Renderer2) {

  }

  /**
   **/
  ngOnInit(): void {
     //console.log("[NumberQuadrantAnalysisCompoennt] ngOnInit");
      
  }

  

  ngAfterViewInit() {
    //console.log("[NumberQuadrantAnalysisCompoennt] ngAfterViewInit");
    //this.configTicketInputObs();

    this.ticketObs.subscribe(
       (ticket) => {
          this.displayTheAnalysisData(ticket);
          this.getTicketHitOnQuadrantInfo(ticket);

       }
    );

     interval(100).pipe(
       take(1),
       
     ).subscribe(() => {
         this.dataObsReadyEvent.emit();
     }); 

    if(!this.displayClass || this.displayClass?.length === 0) {
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
  
  

  /**
   * 
   * @param ticket 
   */
  private displayTheAnalysisData(ticket: string[]) {

    //console.log(">>>number-quadrant-analysis - init() - call service to get analysis.");
    this.ticketNumberQuadrantAnalysisResult = "";

    if(!ticket?.length)
        return;

    const tkNumberOccurDetailLambda = (result: TicketInQuadrantAnalysisResultReader) => {
      const retResult: string[] = [];
      result.getTkNumberOccurance((num, nTimes) => {
        retResult.push(`${this.commonService.pullNumberOut(num)}:${nTimes}`)
      });
      return retResult.join(";");
    }

    for (let quadNum = 0; quadNum < this.numberOfQuadrant; quadNum++) {
      this.numberPanelService.ticketNumberOccurancesInQuadrant(ticket,
        quadNum, (result) => {
          return ` Q${result.getQuadrantNumber()}-${result.getNumberOfOccurances()}[${tkNumberOccurDetailLambda(result)}]`

      }).then(s => this.ticketNumberQuadrantAnalysisResult += s);
    }

    
  }

  /**
   * 
   * @param ticket 
   */
  private getTicketHitOnQuadrantInfo(ticket: string[])  {
     const retData : QuandrantAnalysisResult = {};

     const numberListGen = (result: TicketInQuadrantAnalysisResultReader, processor: (aNum: string) => void): void => {
         
         result.getTkNumberOccurance((num, nTimes) => {
            for (let x = 1; x <= nTimes; x++) {
              processor(this.commonService.pullNumberOut(num));
            }
         });

     }

     for (let quadNum = 0; quadNum < this.numberOfQuadrant; quadNum++) {
      this.numberPanelService.getTicketNumberOccurancesInQuadrant(ticket,
        quadNum,
        (finalAcc, tempAcc) => {
            return {
               ...finalAcc,
               ...tempAcc
            }
        },
        (result) => {
            const quadNmber = result.getQuadrantNumber();
            if (!retData[quadNmber]) {
              retData[quadNmber] = [];
            } 
             numberListGen(result, (aNumber) => retData[quadNmber].push(aNumber))
             return retData;
        }).then(s => {
          this.ticketNumberInQuadrantAnalysis = s;
          console.log(">>>[NumberQuadrantAnalysisCompoennt] quandrant analysis:", this.ticketNumberInQuadrantAnalysis);
        });
    }
  }

  getNumberOfQuadrant() {
    return Object.keys(this.ticketNumberInQuadrantAnalysis ? this.ticketNumberInQuadrantAnalysis : {});
  }


}
