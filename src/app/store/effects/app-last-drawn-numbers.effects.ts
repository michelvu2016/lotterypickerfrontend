import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/selected-numbers.action';
import { DataService } from 'src/app/tools/data-service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AppLastDrawnNumbersEffect {

    constructor(private actions$: Actions, private dataService: DataService){}


    loadLastDrawnNumbers$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.actionNames.numberPanelService_load),
        map(action => {
            const myAction = action as {type: string, gameName: string}
            return this.dataService.getLastResults_usingRxjs(myAction.gameName)
        }),

        map(dataObs => {
            dataObs.pipe(
                map(data => {
                    return fromActions.saveLastDrawnNumberAction({lastDrawnNumbers:data});
                })
            )
        }),
        catchError((error, caughtObs ) => {
            return [];
        })


    ), {dispatch: true} );

}