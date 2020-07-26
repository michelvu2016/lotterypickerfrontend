import { Action, createAction, props } from '@ngrx/store';
import { SelectedNumbers } from '../../models/SelectedNumbers';
import * as constants from '../../constants/constants';
import { NumberSelectionPanelComponent } from 'src/app/number-selection-panel/number-selection-panel.component';

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
}




export const ticketSelectingAction = createAction(
  "[selected-number component] save",
  props<TicketState>()

);

export const setHighlightTicketAction = createAction(
  "[application-flow logic] set",
  props<TicketToHighLightState>()
)

export const clearHightlightTicketAction = createAction(
  "[NumberSelectionPanelComponent] component clear"
);

