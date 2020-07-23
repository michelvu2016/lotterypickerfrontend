import { SelectedNumbersAction, TicketState, ticketSelectingAction } from "../actions/selected-numbers.action";
import * as constants from '../../constants/constants';
import { createReducer, on } from '@ngrx/store';

const initialState = {
  selectedNumbers: {},
}

export function selectedNumbersReducer(state = initialState, action: SelectedNumbersAction) {
  let newState = state;
  switch (action.type) {
    case constants.INSERT_SELECTED_NUMBERS:
      newState = {
        ...state
      };
      const selectedNumbers = action.selectedNumber;
      newState.selectedNumbers[selectedNumbers.ticketId.toString()] = selectedNumbers;

      //console.log(">>>>>selected-number.reducer: ", newState);

      break;

  }
  return newState;
}

const initialSelectedTicketState : TicketState = {
  selectedNumber: []
};

const _ticketSelectingReducer = createReducer(initialSelectedTicketState,
  on(ticketSelectingAction, (state, action) => {
     console.log("[ticketSelectingReducer] invoked: ", action.selectedNumber);
    return ({...state, selectedNumber: action.selectedNumber}) 
  })
   );


  //Return the reducer
export function ticketSelectingReducer(state, action) {
   return _ticketSelectingReducer(state, action);
}