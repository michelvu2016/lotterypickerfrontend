import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NumberPanelComponent } from './number-panel/number-panel.component';
import {NumberQuadrantComponent} from './number-panel/number-quadrant/number-quadrant.component';
import {NumberQuadrantManagerComponent} from './number-panel/number-quadrant-manager/number-quadrant-manager.component';

import {HomeComponent} from './home/home.component';
import {NumberSelectionPanelComponent} from './number-selection-panel/number-selection-panel.component';
import {DrawnNumberUpdateComponent} from './drawn-number-update/drawn-number-update.component';
import {MegaManagerComponent} from './mega/mega-manager/mega-manager.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full'},
    { path: 'panel', component: NumberPanelComponent},
    { path: 'quadrant', component: NumberQuadrantComponent, pathMatch: 'full'},
  { path: 'ticketSelection/:lotteryType', component: NumberSelectionPanelComponent, pathMatch: 'full'},
    { path: 'quadrantFlow', component: NumberQuadrantManagerComponent, pathMatch: 'full'},
    { path: 'updateLastDrawnNumbers/:id', component: DrawnNumberUpdateComponent, pathMatch: 'full'},
    { path: 'megaNumber', component: MegaManagerComponent, pathMatch: 'full'},
    { path: '', redirectTo: 'home', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
