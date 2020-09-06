import { createReducer, on } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { addTicketAction, updateTicketAction, deleteTicketsAction} from '../actions/app-selected-tickets.actions';
import { AppState } from '../../actions/selected-numbers.action';
import { Ticket } from '../models/selected-tickets.models';


export interface SelectedTicketState extends EntityState<Ticket> {
    selectedPickedDate: string 
}

export interface SelectedTicketsState extends AppState {
    selectedTickets: SelectedTicketState
}


function selectPickDate(ticket: Ticket) {
    return ticket.forDrawnDate;
}


const ticketEntityAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>({
    selectId: selectPickDate
});


const initialState = ticketEntityAdapter.getInitialState();


const reducerHub = createReducer(
    initialState,
    on(addTicketAction, (state, {selectedTicket}) => {
         return ticketEntityAdapter.addOne(selectedTicket, state);
        }
    ),
    on(updateTicketAction, (state, {updateSelectedTicket}) => {
        return ticketEntityAdapter.updateOne(updateSelectedTicket, state);
    }),
    on(deleteTicketsAction, (state, {ticketId}) => {
        return ticketEntityAdapter.removeOne(ticketId, state);
    }),
    on(addTicketAction, (state, {selectedTicket}) => {
        return ticketEntityAdapter.addOne(selectedTicket, state);
    })


)

export function selectedTicketReducer(state, action) {
    return  reducerHub(state, action);
}

// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = ticketEntityAdapter.getSelectors();

export const selectPickDateSelector = selectIds;
export const selectAllPickedTickets = selectEntities;
export const selectAllTickets = selectAll;
export const selectNumberOfTickedPicked = selectTotal;
