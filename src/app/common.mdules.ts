import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {NumberControlComponent} from './number-panel/number-control/number-control.component';
import { NumberQuadrantAnalysisCompoennt } from './number-panel/number-quadrant-analysis/number-quadrant-analysis.component';


@NgModule({
   declarations: [
      NumberControlComponent,
      NumberQuadrantAnalysisCompoennt,
   ],
   imports: [
      CommonModule
   ],

   exports: [
      NumberControlComponent,
      NumberQuadrantAnalysisCompoennt,
   ]
})
export class CommonMdules {

}
