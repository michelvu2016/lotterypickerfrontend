import { AfterViewInit, Component, EventEmitter, Inject, Injectable, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonServices } from 'src/app/common/common.services';
import { fromActions } from 'src/app/store';


export interface DialogData {
    megaNumber: string;
}

@Component({
    selector: 'app-mega-number-edit',
    templateUrl: 'app-mega-number-edit.component.html',
    styleUrls: ['app-mega-number-edit.component.css'],

})
export class AppMegaNumberEditComponent implements AfterViewInit, OnInit {

    @Output() selectedMegaNumber = new EventEmitter<string>();
    
    
    private uniqueId: string = ""; 

    @Input('ticketId')
    public get ticketId(): number {
        return +this.uniqueId;
    }
    public set ticketId(value: number) {
        console.log(`[AppMegaNumberEditComponent] ticketId input: ${value}`);
        this.uniqueId = value.toString();
    }

    megaNumber = "";
    editMode = false;

    constructor (private dialog: MatDialog,
        private commonServices: CommonServices, 
        private showMegaNumberSelectionPanelStore: Store<fromActions.AppState>,
        private selectedMegaNumberEffect: MegaNumberSelectionServiceEffect) {
            selectedMegaNumberEffect.selectedMegaNumber$.subscribe(({megaNumber, corRelNumber}) => 
                {
                    console.log(`[AppMegaNumberEditComponent] megaNumber: ${megaNumber} corRelNumber: ${corRelNumber} `)
                    if (this.uniqueId == corRelNumber)
                        this.setMegaNumber(commonServices.pullNumberOut(megaNumber))
                });
    }

    /**
     * 
     * @param number 
     */
    private setMegaNumber(number: string) {
        this.megaNumber = number;
        this.emitSelectedMegaNumber();
    }


    /**
     * 
     */
    private emitSelectedMegaNumber() {
        this.selectedMegaNumber.emit(this.megaNumber);
    }


    /**
     * 
     */
    openDialog() {
        const dialogRef = this.dialog.open(MegaSelectionDialog, {
            data: {megaNumber: this.megaNumber}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.setMegaNumber(result);
        });
    }

    /**
     * 
     */
    onfocus() {
        //this.openDialog();
        //this.showMegaNumberSelectionPanelStore.dispatch(fromActions.showMegaNumberSelectionPanelAction({number: this.megaNumber}))
        
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    selectFromPanel() {
        this.editMode = false;
        this.showMegaNumberSelectionPanelStore
           .dispatch(
               fromActions.showMegaNumberSelectionPanelAction({corRelnumber: this.uniqueId})
               )
    }

    manuallySelect() {
        this.editMode = true;
    }

    onBlur() {
        this.editMode = false;
        this.emitSelectedMegaNumber();
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

    selectedMegaNumber$ = new Subject<{megaNumber: string, corRelNumber: string}>();

    constructor(private actions$: Actions) {

    }

    megaNumberSelectionEffect$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.selectMegaNumberAction),
        tap(action => {
            this.selectedMegaNumber$.next({megaNumber: action.megaNumber, corRelNumber: action.corRelNumber})
        })
    ), {dispatch: false});

    }
