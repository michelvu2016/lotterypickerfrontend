import {AfterContentInit, AfterViewInit, Component, Injectable, Output} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  @Output() megaNumberOut: string = "";

  constructor(private showMegaNumberSelectionpanelEffect: ShowMegaNumberSelectionPanelEffect,
    private numberPanelService: NumberPanelService) {
      showMegaNumberSelectionpanelEffect.selectedNumber$.subscribe(number => {
          this.number = number;
 
      })

      showMegaNumberSelectionpanelEffect.showPanelCommand$.subscribe(command => {
       
        this.showPanel = command == "open" ? true : false;
    })

  }
  selectedMegaNumber(number) {
      console.log("[AppMegaNumberSelectionPanelComponent] selectedMegaNumber:", number);
      this.megaNumberOut = number;
  }

  ngAfterViewInit(): void {


  }

}

@Injectable()
export class ShowMegaNumberSelectionPanelEffect {

    showPanelCommand$ = new Subject<string>();
    selectedNumber$ = new Subject<string>();

    constructor(private actions$: Actions) {}

    showMegaNumberSelectionPanelEffect$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.showMegaNumberSelectionPanelAction),
        tap(action => {
          this.showPanelCommand$.next(action.number)
          this.showPanelCommand$.next("open")
        })
    ), {dispatch: false});

    hideMegaNumberSelectionPanelEffect$ = createEffect(() => this.actions$.pipe(
      ofType(fromActions.hideMegaNumberSelectionPanelAction),
      tap(action => this.showPanelCommand$.next("close"))
  ), {dispatch: false});

  }