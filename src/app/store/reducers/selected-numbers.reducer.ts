// import { SelectedNumbersAction, TicketState, ticketSelectingAction,
//   TicketToHighLightState,getHighlightTicketAction } from "../actions/selected-numbers.action";
import * as fromActions  from "../actions/selected-numbers.action";
  
  
import * as constants from '../../constants/constants';
import { createReducer, on } from '@ngrx/store';
import { from } from 'rxjs';

const initialState = {
  selectedNumbers: {},
}

export function selectedNumbersReducer(state = initialState, action: fromActions.SelectedNumbersAction) {
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

const initialSelectedTicketState : fromActions.TicketState = {
  selectedNumber: []
};

const _ticketSelectingReducer = createReducer(initialSelectedTicketState,
  on(fromActions.ticketSelectingAction, (state, action) => {
     console.log("[ticketSelectingReducer] invoked: ", action.selectedNumber);
    return ({...state, selectedNumber: action.selectedNumber}) 
  })
   );


const initialTicketToBeHighLightState : fromActions.TicketToHighLightState = {
  ticketNumbers: []
}


  //Return the reducer
export function ticketSelectingReducer(state, action) {
   return _ticketSelectingReducer(state, action);
}


export const ticketHighLightReducer = createReducer(
  initialTicketToBeHighLightState,
  on(fromActions.setHighlightTicketAction, (state, action) => ({...state, ticketNumbers: action.ticketNumbers})),
  on(fromActions.clearHightlightTicketAction, (state, action) => ({...state, ticketNumbers: null}))

)
