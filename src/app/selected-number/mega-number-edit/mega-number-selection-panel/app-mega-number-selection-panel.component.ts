import { AfterViewInit, Component, Injectable, Output } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fromActions } from 'src/app/store';

@Component({
    selector: 'app-mega-number-selection-panel',
    styleUrls: ['app-mega-number-selection-panel.component.css'],
    templateUrl: 'app-mega-number-selection-panel.component.html'
})
export class AppMegaNumberSelectionPanelComponent implements AfterViewInit {

    number: string;

    private numberSelectedSubject = new Subject<string>();

    constructor(private selectedMegaNumberStore: Store<fromActions.AppState>) {
        
    }
    /**
     * 
     * @param number 
     */
    selectedMegaNumber(number) {
        console.log("[AppMegaNumberSelectionPanelComponent] selectedMegaNumber:", number);
        this.numberSelectedSubject.next(number);
    }

    /**
     * 
     */
    ngAfterViewInit() {
        this.numberSelectedSubject.subscribe((number) => {
            this.selectedMegaNumberStore.dispatch(fromActions.selectMegaNumberAction({megaNumber: number}))
        });
    }

    closePanel() {
        this.selectedMegaNumberStore.dispatch(fromActions.hideMegaNumberSelectionPanelAction());
    }

}


