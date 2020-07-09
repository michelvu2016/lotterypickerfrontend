import { Action } from '@ngrx/store';
import { AnalyzedNumberAction } from '../actions/AnalyzedNumberAction';
import  * as constants from '../../constants/constants';

const initialState = {
  analyzedNumber: null,
}

export function analyzedNumbersReducer (state = initialState, action: AnalyzedNumberAction) {
  let nextState = state;
  switch (action.type) {
    case constants.SAVE_NUMBER:
      nextState = {
         ...state
      }

      nextState.analyzedNumber = action.analyzedNumber;
      break;
    
    default:

  }
  return nextState;
}
