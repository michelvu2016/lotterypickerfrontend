import { HighlightCurrDrawnNumbersAction } from '../actions/HighlightCurrDrawnNumbersAction';
import * as constants from '../../constants/constants';

const initialState = true;
  

export function highlightCurDrawnNumbersReducer(state = initialState, action: HighlightCurrDrawnNumbersAction) {
  let nextState = state;
  switch (action.type) {
    
    case constants.UPDATE_HIGHLIGHT_CURR_NUMBERS:
      nextState = action.highlightCurrentDrawnNumber;
      break;
    default:

  }
  return nextState;
}
