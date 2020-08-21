import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from '../../actions/selected-numbers.action';
import * as fromReducer from '../reducers/SelectedTickets.reducers';


const ticketState = createFeatureSelector<fromReducer.SelectedTicketState>('SelectedTicketState');

export const queryAllSelectedTicketSelector = createSelector (
    ticketState,
    fromReducer.selectAllPickedTickets
);


