import { createReducer, on } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { addTicketAction, updateTicketAction, deleteTicketAction, deleteAllTicketAction} from '../actions/app-selected-tickets.actions';
import { AppState } from '../../actions/selected-numbers.action';
import { Ticket } from '../models/selected-tickets.models';


export interface SelectedTicketState extends EntityState<Ticket> {
     
}

//export interface SelectedTicketsState extends AppState {
//    selectedTickets: SelectedTicketState
//}


function selectTicketId(ticket: Ticket) {
    return ticket.ticketId;
}


const ticketEntityAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>({
    selectId: selectTicketId
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
    on(deleteTicketAction, (state, {ticketId}) => {
        return ticketEntityAdapter.removeOne(ticketId, state);
    }),
    on(deleteAllTicketAction, (state, {mode}) => {
        return ticketEntityAdapter.removeAll(state);
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

export const selectTicketIds = selectIds;
export const selectAllTicketEntities = selectEntities;
export const selectAllTickets = selectAll;
export const selectNumberOfTickets = selectTotal;
