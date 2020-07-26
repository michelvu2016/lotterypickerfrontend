import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketAssemblingPanelComponent } from './ticket-assembling-panel/ticket-assembling-panel.component';
import { CommonMdules } from '../common.mdules';
import { NumberQuadrantAnalysisCompoennt } from '../number-panel/number-quadrant-analysis/number-quadrant-analysis.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TicketAssemblingPanelComponent,
    
  ],
  imports: [
    CommonModule,
    CommonMdules,
    DragDropModule,
    
  ],
  exports: [
    TicketAssemblingPanelComponent
  ]
})
export class TicketAssemblerModule { }
