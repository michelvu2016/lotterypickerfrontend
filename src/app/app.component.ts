import {AfterContentInit, AfterViewInit, Component, EventEmitter, Injectable, Output} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonServices } from './common/common.services';
import {NumberPanelService} from './number-panel/number-panel.service';
import {SelectedNumberService} from './selected-number-manager/selected-number-service';
import { fromActions } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SelectedNumberService]
})
export class AppComponent implements AfterViewInit{
  title = 'lottery-picker';


  showPanel = false;
  number: string;
  corRelNumber: string;


  @Output() megaNumberOut = "";

  constructor(private showMegaNumberSelectionpanelEffect: ShowMegaNumberSelectionPanelEffect,
    private numberPanelService: NumberPanelService,
    private corRelNumberStore: Store<fromActions.AppState>,
    private commonService: CommonServices) {
      showMegaNumberSelectionpanelEffect.corRelNumber$.subscribe(relNumber => {
          console.log('[AppComponent] push the relNumber:', relNumber);
          this.corRelNumber = relNumber;
 
      })

      showMegaNumberSelectionpanelEffect.showPanelCommand$.subscribe(command => {
        if (command === 'open') {
          this.showPanel = true;
          this.corRelNumberStore.dispatch(fromActions.setMegaCorRelNumberAction({corRelNumber: this.corRelNumber}))
        } else {
          this.showPanel = false;
          this.corRelNumberStore.dispatch(fromActions.clearMegaCorRelNumberAction())
        }
    })

  }
  selectedMegaNumber_x(aNumber) {
      console.log('[AppMegaNumberSelectionPanelComponent] selectedMegaNumber:', aNumber);
      this.megaNumberOut = aNumber;
  }

  ngAfterViewInit(): void {


  }

}

@Injectable()
export class ShowMegaNumberSelectionPanelEffect {

    showPanelCommand$ = new Subject<string>();
    corRelNumber$ = new Subject<string>();

    constructor(private actions$: Actions) {}

    showMegaNumberSelectionPanelEffect$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.showMegaNumberSelectionPanelAction),
        tap(action => {
          this.corRelNumber$.next(action.corRelnumber)
          this.showPanelCommand$.next("open")
        })
    ), {dispatch: false});

    hideMegaNumberSelectionPanelEffect$ = createEffect(() => this.actions$.pipe(
      ofType(fromActions.hideMegaNumberSelectionPanelAction),
      tap(action => this.showPanelCommand$.next("close"))
  ), {dispatch: false});

  }