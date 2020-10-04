import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/selected-numbers.action';
import { DataService } from 'src/app/tools/data-service';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { parseConfigFileTextToJson } from 'typescript';


@Injectable()
export class AppLastDrawnNumbersEffect {

    constructor(private actions$: Actions, 
        private dataService: DataService,
        private store: Store<fromActions.AppState>
        ){

    }


    loadLastDrawnNumbers$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadLastDrawnNumberAction),
        tap(action => console.log(">>>[AppLastDrawnNumbersEffect] Trigged by action:", action.type)),
        mergeMap(action => {
            const myAction = action as {type: string, gameName: string}
            //(">>>[AppLastDrawnNumbersEffect] invoke data service for:", myAction.gameName)
            this.postMsg("Fetching data from the backent");
            return this.dataService.getLastResults_usingRxjs(myAction.gameName)
             .pipe(
                 mergeMap(data => {
                     //console.log(">>>[AppLastDrawnNumbersEffect] data received:", data)
                     return of(fromActions.saveLastDrawnNumberAction({lastDrawnNumbers: data}));  
                 }),
                 catchError((err, caught) => {
                    console.log(">>>[AppLastDrawnNumbersEffect] Error encountered: ", err);
                     return of(fromActions.errorLastDrawnNumberAction({msg:"unable to fetch the data"}))
                 }),
                                  
             )
            })
        )

    , {dispatch: true} );

    saveLastDrawnNumbers$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.saveLastDrawnNumberAction),
        map(action => fromActions.sendSystemMessageAction({systemMessage: "Data retrieved successfully."}))
    ), {dispatch: true});


     private postMsg(msg) {
         this.store.dispatch(fromActions.sendSystemMessageAction({systemMessage: msg}));
     }

}