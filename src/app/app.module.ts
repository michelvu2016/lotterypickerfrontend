import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberPanelComponent } from './number-panel/number-panel.component';
import {NumberPanelService} from './number-panel/number-panel.service';
import { NumberControlComponent } from './number-panel/number-control/number-control.component';
import { NumberDecorDirective } from './tools/number-decor.directive';
import { NumberQuadrantComponent } from './number-panel/number-quadrant/number-quadrant.component';
import { NumberQuadrantManagerComponent } from './number-panel/number-quadrant-manager/number-quadrant-manager.component';
import { CurrentDrawnNumberComponent } from './number-panel/current-drawn-number/current-drawn-number.component';
import { SelectedNumberComponent } from './selected-number/selected-number.component';
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
import { selectedNumbersReducer } from './store/reducers/selected-numbers.reducer';
import { NumberQuadrantAnalysisCompoennt } from './number-panel/number-quadrant-analysis/number-quadrant-analysis.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule}  from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NumberPanelComponent,
    // NumberControlComponent,
    NumberDecorDirective,
    NumberDecorDirective,
    NumberQuadrantComponent,
    NumberQuadrantManagerComponent,
    CurrentDrawnNumberComponent,
    SelectedNumberComponent,
    MessageBoardComponent,
    SelectedNumberManagerComponent,
    TicketNumberSelectedDirective,
    NumberSelectionPanelComponent,
    HomeComponent,
    NumberQuadrantAnalysisCompoennt,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    CommonToolsModule,
    HttpClientJsonpModule,
    CommonMdules,
    AppDrawnNumberModule,
    AppNavigationModule,
    AppRoutingModule,
    StoreModule.forRoot({
      analyzedNumber: analyzedNumbersReducer,
      highlightCurDrawnNumber: highlightCurDrawnNumbersReducer,
      selectedNumbers: selectedNumbersReducer,
    }),
    MeganumberModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
       maxAge: 25,
       logOnly: environment.production,
    })


  ],
  providers: [NumberPanelService, DataService, CommonServices, AsynchProcessExecutorService],
  exports: [
    NumberControlComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
