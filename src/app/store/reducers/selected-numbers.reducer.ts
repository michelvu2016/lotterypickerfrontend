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


const lastDrawnNumberStoreInitialState: fromActions.LastDrawnNumberState = {
  lastDrawnNumbers : null
}

const errorInitialState: fromActions.ErrorState = {
   msg: null
}

const messageInitialState: fromActions.MessageState = {
  msg: null
}

const numberQuadrantOffsetInitialState: fromActions.NumberPanelOffsetState = {
    offset: 0
}

  //Return the reducer
export function ticketSelectingReducer(state, action) {
   return _ticketSelectingReducer(state, action);
}


export const ticketHighLightReducer = createReducer(
  initialTicketToBeHighLightState,
  on(fromActions.setHighlightTicketAction, (state, action) => ({
    ...state, 
    ticketNumbers: action.ticketNumbers,
    
  })),
  on(fromActions.clearHightlightTicketAction, (state, action) => ({
                  ...state, 
                  ticketNumbers: null,
                  
                }))

)

export const lastDrawnNumberReducer = createReducer(
  lastDrawnNumberStoreInitialState,
  on(fromActions.saveLastDrawnNumberAction, (state, action) => ({
      ...state, 
      lastDrawnNumbers: action.lastDrawnNumbers,
      ticketNumbersForDisplay: action.lastDrawnNumbers,
    })),
  on(fromActions.resetLastDrawnNumberAction, (state, action) => ({
          ...state,
          lastDrawnNumbers: [],
          ticketNumbersForDisplay: null,
        }))
  )

  export const errorReducer = createReducer(
    errorInitialState,
    on(fromActions.errorLastDrawnNumberAction, (state, action) => ({...state, msg: action.msg}))
  )

export const messageReducer = createReducer(
    messageInitialState,
    on(fromActions.messageAction, (state, action) => ({...state, msg: action.msg}))
)

export const numberPanelOffsetReducer = createReducer(
  numberQuadrantOffsetInitialState,
  on(fromActions.saveNumberPanelOffsetAction, (state, action) => {
     return ({...state, offset: action.offset})
  })
)