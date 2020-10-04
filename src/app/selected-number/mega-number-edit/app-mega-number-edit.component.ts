import { AfterViewInit, Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonServices } from 'src/app/common/common.services';
import { fromActions } from 'src/app/store';


export interface DialogData {
    megaNumber: string
}

@Component({
    selector: 'app-mega-number-edit',
    templateUrl: 'app-mega-number-edit.component.html',
    styleUrls: ['app-mega-number-edit.component.css'],

})
export class AppMegaNumberEditComponent implements AfterViewInit, OnInit {

    megaNumber = "";
    editMode = false;

    constructor (private dialog: MatDialog,
        private commonServices: CommonServices, 
        private showMegaNumberSelectionPanelStore: Store<fromActions.AppState>,
        private selectedMegaNumberEffect: MegaNumberSelectionServiceEffect) {
            selectedMegaNumberEffect.selectedMegaNumber$.subscribe((number) => this.megaNumber = commonServices.pullNumberOut(number))
    }

    /**
     * 
     */
    openDialog() {
        const dialogRef = this.dialog.open(MegaSelectionDialog, {
            data: {megaNumber: this.megaNumber}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.megaNumber = result;
        });
    }

    /**
     * 
     */
    onfocus() {
        //this.openDialog();
        this.showMegaNumberSelectionPanelStore.dispatch(fromActions.showMegaNumberSelectionPanelAction({number: this.megaNumber}))

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }



}

@Component({
    selector: 'mega-selection-dialog',
    templateUrl: 'mega-selection-dialog.html',

})
export class MegaSelectionDialog {

    constructor(public dialogRef: MatDialogRef<MegaSelectionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
        ) {

    }

    onClose() {
        this.dialogRef.close();
    }

}

@Injectable()
export class MegaNumberSelectionServiceEffect {

    selectedMegaNumber$ = new Subject<string>();

    constructor(private actions$: Actions) {

    }

    megaNumberSelectionEffect$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.selectMegaNumberAction),
        tap(action => this.selectedMegaNumber$.next(action.megaNumber))
    ), {dispatch: false});

    }
