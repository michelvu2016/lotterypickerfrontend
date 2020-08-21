import { createAction, props } from '@ngrx/store'
import { Update, EntityState } from '@ngrx/entity';
import { SelectedTickets } from '../models/selected-tickets.models';



export const actionNames = {
    addTickets: "[app-selected-tickets] addTickets action",
    updateTickets: "[app-selected-tickets updateTickets action",
    deleteTickets: "[app-selected-tickets] addTickets action",
    
}




export const addTicketAction = createAction(actionNames.addTickets,
    props<{selectedTicket: SelectedTickets}>());


export const updateTicketAction = createAction(actionNames.updateTickets,
    props<{updateSelectedTicket: Update<SelectedTickets>}>());
    
    
export const deleteTicketsAction = createAction(actionNames.deleteTickets,
     props<{datePicked: string}>()
    );


