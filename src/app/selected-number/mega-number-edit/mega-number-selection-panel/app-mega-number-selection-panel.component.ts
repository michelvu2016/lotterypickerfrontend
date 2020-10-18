import { AfterViewInit, Component, Injectable, Input, OnInit, Output } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonServices } from 'src/app/common/common.services';
import { fromActions, fromSelectors } from 'src/app/store';

@Component({
    selector: 'app-mega-number-selection-panel',
    styleUrls: ['app-mega-number-selection-panel.component.css'],
    templateUrl: 'app-mega-number-selection-panel.component.html'
})
export class AppMegaNumberSelectionPanelComponent implements AfterViewInit, OnInit {

    number: string;
    @Input() corRelNumberSubject : Subject<string>;

    corRelNumber: string;

    private numberSelectedSubject = new Subject<string>();

    constructor(private selectedMegaNumberStore: Store<fromActions.AppState>,
        private commonServices: CommonServices) {
            this.corRelNumberHookup();
        
    }
    /**
     * 
     * @param number 
     */
    selectedMegaNumber(megaNumber) {
        console.log('[AppMegaNumberSelectionPanelComponent] selectedMegaNumber:', megaNumber);
        this.numberSelectedSubject.next(megaNumber);
    }

    private corRelNumberHookup() {
        console.log('[AppMegaNumberSelectionPanelComponent] subscribe corRelNumberSubject');
        this.selectedMegaNumberStore.select(fromSelectors.selectMegaCorRelNumberSelector).subscribe(crlNumber => {
            console.log('[AppMegaNumberSelectionPanelComponent] corRelNumber pushed:', crlNumber);
            this.corRelNumber = crlNumber
        });
    }

    ngOnInit() {

    }

    /**
     * 
     */
    ngAfterViewInit() {

        this.numberSelectedSubject.subscribe((megaNumber) => {
            this.selectedMegaNumberStore.dispatch(fromActions.selectMegaNumberAction({megaNumber, corRelNumber: this.corRelNumber}))
        });
    }

    closePanel() {
        this.selectedMegaNumberStore.dispatch(fromActions.hideMegaNumberSelectionPanelAction());
    }

}


