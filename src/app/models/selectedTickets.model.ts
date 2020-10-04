export interface Ticket {
    number : string[],
    mega: string 
}

export interface TicketSet {
    numberList : Ticket[]
}

export interface SelectedTicketForSubmit {
    ticketSet: TicketSet,
    drawingDate: Date
}
