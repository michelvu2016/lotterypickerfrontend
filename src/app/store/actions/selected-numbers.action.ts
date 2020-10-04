import { Action, createAction, props } from '@ngrx/store';
import { SelectedNumbers } from '../../models/SelectedNumbers';
import * as constants from '../../constants/constants';
import { NumberSelectionPanelComponent } from 'src/app/number-selection-panel/number-selection-panel.component';
import { LastDrawnNumber } from 'src/app/models/LastDrawnNumber';
import { SelectedTicketState } from '../selected-tickets/reducers/SelectedTickets.reducers';
import { __String } from 'typescript';

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
  numberPanelOffset: "[NumberQuadrantComponent component] offset save",
  replayPastTicket: "[NumberPanelService] service replayPastTicket",
  resetToCurrentDrawnTicket: "[NumberPanelService] service restToCurrentDrawnTicket",
  sendSysemMessageAction : "[System] messaging send",
  selectMegaNumberAction: "[selected-number component] mega number select",
  showMegaNumberSelectionPanelAction: "[app-mega-number-selection-panel component] show",
  hideMegaNumberSelectionPanelAction: "[app-mega-number-selection-panel component] hide",
}


export interface TicketState {
  selectedNumber: string[]

}

export interface TicketToHighLightState {
  ticketNumbers: string[]
}

export interface SelectedHighLightNumberState {
  
}

export interface SystemMessageState {
  systemMessage: string
}

export interface SelectMegaNumberState {
  megaNumber: string
}

export interface AppState {
    analyzedNumber: any,
    highlightCurDrawnNumber: any,
    selectedNumbers: any,
    selectedTicket: TicketState,
    ticketToHighLight: TicketToHighLightState,
    lastDrawnNumbers: LastDrawnNumberState & LastDrawnNumbersDisplayState,
    errors: ErrorState,
    message: MessageState,
    numberPanelOffset: NumberPanelOffsetState,
    pickedTicket: SelectedTicketState,
    systemMessage: SystemMessageState,
    selectMegaNumber: SelectMegaNumberState,
}

export interface NumberPanelOffsetState {
    offset: number
}

export interface MessageState {
  msg: string
}

export interface ErrorState extends MessageState {
   
}
export interface LastDrawnNumberState {
    lastDrawnNumbers: any;
}

export interface LastDrawnNumbersDisplayState {
  ticketNumbersForDisplay: any;
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

export const replayPastTicketAction = createAction (
   actionNames.replayPastTicket,
   props<{ticketIndex: number}>()
)

export const resetToCurrentDrawnTicketAction = createAction (
  actionNames.resetToCurrentDrawnTicket
  )

export const messageAction = createAction (

  actionNames.message,
  props<MessageState>()
)


export const saveNumberPanelOffsetAction = createAction (
  actionNames.numberPanelOffset,
  props<NumberPanelOffsetState>()
)

export const sendSystemMessageAction = createAction(
   actionNames.sendSysemMessageAction,
   props<SystemMessageState>()
) 

export const selectMegaNumberAction = createAction (
  actionNames.selectMegaNumberAction,
  props<SelectMegaNumberState>()
)

export const showMegaNumberSelectionPanelAction = createAction (
  actionNames.showMegaNumberSelectionPanelAction,
  props<{number: string}>()
)

export const hideMegaNumberSelectionPanelAction = createAction (
  actionNames.hideMegaNumberSelectionPanelAction

)
