import { createReducer, on } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { SelectedTickets } from '../models/selected-tickets.models';
import { addTicketAction, updateTicketAction, deleteTicketsAction } from '../actions/app-selected-tickets.actions';
import { AppState } from '../../actions/selected-numbers.action';


export interface SelectedTicketState extends EntityState<SelectedTickets> {
    selectedPickedDate: string 
}

export interface SelectedTicketsState extends AppState {
    selectedTickets: SelectedTicketState
}


function selectPickDate(tickets: SelectedTickets) {
    return tickets.date;
}


const ticketEntityAdapter: EntityAdapter<SelectedTickets> = createEntityAdapter<SelectedTickets>({
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
    on(deleteTicketsAction, (state, {datePicked}) => {
        return ticketEntityAdapter.removeOne(datePicked, state);
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
