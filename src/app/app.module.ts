import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSidenavModule} from '@angular/material/sidenav'
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule }  from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, ShowMegaNumberSelectionPanelEffect } from './app.component';
import { NumberPanelComponent } from './number-panel/number-panel.component';
import {NumberPanelService} from './number-panel/number-panel.service';
import { NumberControlComponent } from './number-panel/number-control/number-control.component';
import { NumberDecorDirective } from './tools/number-decor.directive';
import { NumberQuadrantComponent } from './number-panel/number-quadrant/number-quadrant.component';
import { NumberQuadrantManagerComponent } from './number-panel/number-quadrant-manager/number-quadrant-manager.component';
import { CurrentDrawnNumberComponent } from './number-panel/current-drawn-number/current-drawn-number.component';
import { FinalSelectedTicketListMonitorEffect, SelectedNumberComponent } from './selected-number/selected-number.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import {DataService} from './tools/data-service';
import { SelectedNumberManagerComponent } from './selected-number-manager/selected-number-manager.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TicketNumberSelectedDirective} from './tools/ticket-number-selected.directive';

import {AppNavigationModule} from './app-navigation.module';
import {NumberSelectionPanelComponent} from './number-selection-panel/number-selection-panel.component';
import {HomeComponent} from './home/home.component';
import {AppDrawnNumberModule} from './app-drawn-number.module';
import {CommonToolsModule} from './CommonTools.module';
import {CommonServices} from './common/common.services';
import {AsynchProcessExecutorService} from './tools/AsynchProcessExecutor.service';
import {MeganumberModule} from './meganumber.module';
import { CommonMdules } from './common.mdules';
import { analyzedNumbersReducer } from './store/reducers/analyzed-number.reducer';
import { StoreModule } from '@ngrx/store';
import { highlightCurDrawnNumbersReducer } from './store/reducers/highlightCurDrawnNumbersReducer';
// import { selectedNumbersReducer, ticketSelectingReducer } from './store/reducers/selected-numbers.reducer';

import * as fromReducers from './store/reducers/selected-numbers.reducer';
import { selectedTicketReducer } from './store/selected-tickets/reducers/SelectedTickets.reducers';

import { NumberQuadrantAnalysisCompoennt } from './number-panel/number-quadrant-analysis/number-quadrant-analysis.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule}  from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { TicketAssemblerModule } from './ticket-assembler/ticket-assembler.module';
import { NumberInputFormComponent } from './selected-number-manager/number-input-form/number-input-form.component';
import { AppLastDrawnNumbersEffect } from './store/effects/app-last-drawn-numbers.effects';
import { fromActions } from './store';
import { from } from 'rxjs';
import { NumberQuadrantManagerContentComponent } from './number-panel/number-quadrant-manager/number-quadrant-manager-content.component';
import { AppSideNavComponent } from './number-panel/number-quadrant-manager/side-nav/app-side-nav.component';
import { AppMegaNumberEditComponent, MegaNumberSelectionServiceEffect } from './selected-number/mega-number-edit/app-mega-number-edit.component';
import { AppMegaNumberSelectionPanelComponent } from './selected-number/mega-number-edit/mega-number-selection-panel/app-mega-number-selection-panel.component';
import { MegaNumberDirective } from './selected-number/mega-number-edit/mega-number.directives';
import { PlaygroundModule } from './playground/playground.module';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot } from '@angular/router';
import { EntityDataModule, EntityDataService } from '@ngrx/data';
import { entityConfig } from './store/app-users/meta-data/app-user.metadata';
import { AppUserModule } from './app-user/app-user.module';
import { AdminActionListenerEffect } from './app-user/app-admin/app-admin.component';
import { AppUserDataService } from './store/app-users/services/app-user-data.service';
import { LastNumberDrawnTicketResolver } from './common/lastNumberDrawnTickets.resolver';



@NgModule({
  declarations: [
    AppComponent,
    NumberPanelComponent,
    // NumberControlComponent,
    NumberDecorDirective,
    NumberDecorDirective,
    NumberQuadrantComponent,
    NumberQuadrantManagerComponent,
    NumberQuadrantManagerContentComponent,
    AppSideNavComponent,

    CurrentDrawnNumberComponent,
    SelectedNumberComponent,
    MessageBoardComponent,
    SelectedNumberManagerComponent,
    TicketNumberSelectedDirective,
    NumberSelectionPanelComponent,
    HomeComponent,
    //NumberQuadrantAnalysisCompoennt,
    NumberInputFormComponent,
    AppMegaNumberEditComponent,
    AppMegaNumberSelectionPanelComponent,
    MegaNumberDirective,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    
    HttpClientModule,
    DragDropModule,
    CommonToolsModule,
    HttpClientJsonpModule,
    CommonMdules,
    StoreModule.forRoot({
      analyzedNumber: analyzedNumbersReducer,
      highlightCurDrawnNumber: highlightCurDrawnNumbersReducer,
      selectedNumbers: fromReducers.selectedNumbersReducer,
      selectedTicket: fromReducers.ticketSelectingReducer,
      ticketToHighLight: fromReducers.ticketHighLightReducer,
      lastDrawnNumbers: fromReducers.lastDrawnNumberReducer,
      errors: fromReducers.errorReducer,
      message: fromReducers.messageReducer,
      selectedTickets: selectedTicketReducer,
      systemMessage: fromReducers.systemMessageReducer,
      megaCorRelNumber: fromReducers.setMegaCorRelNumberReducer,
    }),
    EffectsModule.forRoot([
        AppLastDrawnNumbersEffect, 
        FinalSelectedTicketListMonitorEffect,
        ShowMegaNumberSelectionPanelEffect,
        MegaNumberSelectionServiceEffect,
        AdminActionListenerEffect,
      ]),
 
      EntityDataModule.forRoot(entityConfig),

    AppDrawnNumberModule,
    AppNavigationModule,
    AppRoutingModule,


    MeganumberModule,
    BrowserAnimationsModule,

    StoreDevtoolsModule.instrument({
       maxAge: 25,
       logOnly: environment.production,
    }),

    TicketAssemblerModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    PlaygroundModule,
   
    
  ],
  providers: [NumberPanelService, 
    DataService, 
    CommonServices, 
    AsynchProcessExecutorService,
    AppUserDataService,
    
  ],
  exports: [
    NumberControlComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   constructor(appUserDataService: AppUserDataService, entityDataService: EntityDataService) {
       entityDataService.registerService('AppUser', appUserDataService);
   }

 }
