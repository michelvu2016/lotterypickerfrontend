//import { highlightCurrDrawnNumbersAction } from '../actions/HighlightCurrDrawnNumbersAction';
import * as constants from '../../constants/constants';
import { createReducer, on, State , Action} from '@ngrx/store';
import * as fromHighlightCurrDrawnNumbersAction from '../actions/HighlightCurrDrawnNumbersAction';



export const initialState: fromHighlightCurrDrawnNumbersAction.HighlightState = {
    highlightCurrentDrawnNumber: true
};
  
const _highlightCurDrawnNumbersReducer = createReducer(initialState,
  on(fromHighlightCurrDrawnNumbersAction.highlightCurrDrawnNumbersAction, (state, action) => {
        console.log("_highlightCurDrawnNumbersReducer  triggered");
        return    ( {...state, highlightCurrentDrawnNumber: action.highlightCurrentDrawnNumber})
      }
      )
  
  );

export function highlightCurDrawnNumbersReducer(state: fromHighlightCurrDrawnNumbersAction.HighlightState | undefined, action: Action) {
  return _highlightCurDrawnNumbersReducer(state, action);
}