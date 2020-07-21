import * as  fromHighlightCurrDrawnNumbersAction from '../actions/HighlightCurrDrawnNumbersAction';
import { createSelector } from '@ngrx/store';



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

)
