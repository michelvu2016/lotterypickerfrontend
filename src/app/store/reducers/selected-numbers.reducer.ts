import { SelectedNumbersAction } from "../actions/selected-numbers.action";
import * as constants from '../../constants/constants';

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
