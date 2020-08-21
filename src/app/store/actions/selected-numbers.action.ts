import { Action, createAction, props } from '@ngrx/store';
import { SelectedNumbers } from '../../models/SelectedNumbers';
import * as constants from '../../constants/constants';
import { NumberSelectionPanelComponent } from 'src/app/number-selection-panel/number-selection-panel.component';
import { LastDrawnNumber } from 'src/app/models/LastDrawnNumber';

export class SelectedNumbersAction implements Action {
  type: string;
  
  selectedNumber: SelectedNumbers;

  static createAction(numbers: String[], ticketId: String, highlighted: boolean): SelectedNumbersAction {
    const selectedNumbersAction = new SelectedNumbersAction();
    selectedNumbersAction.type = constants.INSERT_SELECTED_NUMBERS;
    selectedNumbersAction.selectedNumber = new SelectedNumbers(ticketId, numbers, highlighted)

    return selectedNumbersAction;
    
  }
}

export const actionNames = {
  selectedComponent_save: "[selected-number component] save",
  application_flow_logic_set: "[application-flow logic] set",
  numberSelectionPanelComponent_clear: "[NumberSelectionPanelComponent] component clear",
  numberPanelService_load: "[NumberPanelService] service] load",
  numberPanelService_save: "[NumberPanelService] service] save",
  numberPanelService_reset: "[NumberPanelService] service] reset",
  numberPanelService_error: "[NumberPanelService] service] error",
  message: "[MessageBoardComponent] component] message",
}


export interface TicketState {
  selectedNumber: string[]

}

export interface TicketToHighLightState {
  ticketNumbers: string[]
}

export interface SelectedHighLightNumberState {
  
}



export interface AppState {
    analyzedNumber: any,
    highlightCurDrawnNumber: any,
    selectedNumbers: any,
    selectedTicket: TicketState,
    ticketToHighLight: TicketToHighLightState,
    lastDrawnNumbers: LastDrawnNumberState,
    errors: ErrorState,
    message: MessageState,
}

export interface MessageState {
  msg: string
}

export interface ErrorState extends MessageState {
   
}
export interface LastDrawnNumberState {
    lastDrawnNumbers: any;
}


export const ticketSelectingAction = createAction(
   actionNames.selectedComponent_save,
  props<TicketState>()

);

export const setHighlightTicketAction = createAction(
  actionNames.application_flow_logic_set,
  
  props<TicketToHighLightState>()
)

export const clearHightlightTicketAction = createAction(
  actionNames.numberSelectionPanelComponent_clear,
  
);

export const loadLastDrawnNumberAction = createAction(
  actionNames.numberPanelService_load, 
   props<{gameName: string}>() 
);

export const saveLastDrawnNumberAction = createAction (
   actionNames.numberPanelService_save,
   props<LastDrawnNumberState>()
)

export const resetLastDrawnNumberAction = createAction (

  actionNames.numberPanelService_reset
)

export const errorLastDrawnNumberAction = createAction (

  actionNames.numberPanelService_error,
  props<ErrorState>()
)

export const messageAction = createAction (

  actionNames.message,
  props<MessageState>()
)