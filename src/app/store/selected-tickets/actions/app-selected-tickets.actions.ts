import { createAction, props } from '@ngrx/store'
import { Update, EntityState } from '@ngrx/entity';
import { Ticket } from '../models/selected-tickets.models';




export const actionNames = {
    addTicket: "[app-selected-tickets] addTicket action",
    updateTicket: "[app-selected-tickets updateTicket action",
    deleteTicket: "[app-selected-tickets] deleteTicket action",
    deleteAllTickets: "[app-selected-tickets] deleteTicket action"

}

export const addTicketAction = createAction(actionNames.addTicket,
    props<{selectedTicket: Ticket}>());
    


export const updateTicketAction = createAction(actionNames.updateTicket,
    props<{updateSelectedTicket: Update<Ticket>}>());
    
    
export const deleteTicketAction = createAction(actionNames.deleteTicket,
     props<{ticketId: number}>()
    );

export const deleteAllTicketAction = createAction(actionNames.deleteAllTickets,
    props<{mode: "all"}>()
    )
