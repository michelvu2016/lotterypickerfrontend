import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketAssemblingPanelComponent } from './ticket-assembling-panel/ticket-assembling-panel.component';
import { CommonMdules } from '../common.mdules';



@NgModule({
  declarations: [TicketAssemblingPanelComponent],
  imports: [
    CommonModule,
    CommonMdules,
  ],
  exports: [
    TicketAssemblingPanelComponent
  ]
})
export class TicketAssemblerModule { }
