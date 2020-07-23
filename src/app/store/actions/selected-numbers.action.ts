import { Action, createAction, props } from '@ngrx/store';
import { SelectedNumbers } from '../../models/SelectedNumbers';
import * as constants from '../../constants/constants';

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
  selectedNumber: string[];

}

export const ticketSelectingAction = createAction(
  "[selected-number component] save",
  props<TicketState>()

);