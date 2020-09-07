import * as  fromHighlightCurrDrawnNumbersAction from '../actions/HighlightCurrDrawnNumbersAction';
import { createSelector } from '@ngrx/store';
import { AppState, TicketState } from '../actions/selected-numbers.action';
import * as fromActions from '../actions/selected-numbers.action';
import { state } from '@angular/animations';


export const highlightCurrDrawnNumbers = (state) => {
    console.log("[highlightCurrDrawnNumbers]  state:", state);
    console.log("[highlightCurrDrawnNumbers]  state.highlightCurDrawnNumber", state.highlightCurDrawnNumber);
    return state.highlightCurDrawnNumber;
}


export const selectHighlightCurrDrawnNumbers = createSelector(
    highlightCurrDrawnNumbers,
    (highlightCurDrawnNumber) => {
        console.log("[selectHighlightCurrDrawnNumbers] selectedFlagValue:",  highlightCurDrawnNumber);
        return highlightCurDrawnNumber.highlightCurrentDrawnNumber;
    }
);

export const selectedTicketSelector = createSelector(
    (state: AppState) => state.selectedTicket,
    (selectedTicket: TicketState) => selectedTicket.selectedNumber

);

export const selectTicketToHighLight = createSelector (
    (state: AppState) => state.ticketToHighLight,
    (state: fromActions.TicketToHighLightState ) => state.ticketNumbers

)

export const selectLastDrawnNumber = createSelector

export const lastDrawnNumberSelector = createSelector (
    (state: AppState) => state.lastDrawnNumbers,
    (state: fromActions.LastDrawnNumberState & fromActions.LastDrawnNumbersDisplayState) => {
        return state.ticketNumbersForDisplay;
        
        //state.lastDrawnNumbers
        ;
    }
)

export const errorSelector = createSelector (
    (state: AppState) => state.errors,
    (state: fromActions.ErrorState) => state.msg
)

export const messageSelector = createSelector (
    (state: AppState) => state.message,
    (state: fromActions.MessageState) => state.msg
)