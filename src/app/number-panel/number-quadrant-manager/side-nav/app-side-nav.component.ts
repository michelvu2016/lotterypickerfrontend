import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Ticket as SelectedTicket, TicketSet, SelectedTicketForSubmit } from 'src/app/models/selectedTickets.model';
import { DataService } from 'src/app/tools/data-service';
import {selectedTicketActions, selectedTicketReducer, selectedTicketModels} from "../../../store/selected-tickets";

type Ticket = selectedTicketModels.Ticket

export interface TicketInfo  {
    number: string,
    mega: string,
    status: "Complete" | "Incomplete"
} 



@Component({
    selector: 'app-side-nav',
    templateUrl: 'app-side-nav.component.html',
    styleUrls: ['app-side-nav.component.css']
})
export class AppSideNavComponent implements OnInit, AfterViewInit {
    drawingDate = "";
    displayedColumns = ['number', "mega", 'status' ];
    columnNames = ['number', 'mega', 'status'];
    dataSource: TicketInfo[] = [
        {number: "12 34 56 23 12", mega: '12', status: 'Complete'}

    ];

    @ViewChild("drawDateInput") drawDateInput: ElementRef = null;

    noEdit = true;
    
    constructor(private store: Store<selectedTicketReducer.SelectedTicketState>, private dataService: DataService) {

    }
    
    ngOnInit() {

    }

    ngAfterViewInit() {
        

        this.getData$()
            .pipe(
                delay(100)
            )
            .subscribe((data) => {
                
                //console.log("[AppSideNavComponent] ngAfterViewInit data:", data);
                this.dataSource = data;
        })
        ;
    }
    
    /**
     * 
     */
    getData$() : Observable<TicketInfo[]> {

        const selectUserState = createFeatureSelector<selectedTicketReducer.SelectedTicketState>('selectedTickets');


        const selectAllTickets = createSelector(selectUserState,
                selectedTicketReducer.selectAllTickets
            ); 


        return this.store.select(selectAllTickets)
        .pipe(
            tap(ticketArray => console.log("[AppSideNavComponent] ngAfterViewInit selectAllTickets ticketArray:", ticketArray)),
            map(ticketArray => {

                const ticketInfoArray: TicketInfo[] = [];

                ticketArray.forEach(ticket => {
                    this.drawingDate = ticket.forDrawnDate.replace("-","/");
                    ticketInfoArray.push({
                        number: ticket.numbers.join(" "),
                        mega: ticket.mega,
                        status: "Complete"

                    })
                });

                return ticketInfoArray;
            }), 

            
            tap(ticketInfo => {
               // console.log("[AppSideNavComponent] ticketInfo:", ticketInfo); 
            })
            
        );

    }


    private test_selector() {
        const selectUserState = createFeatureSelector<selectedTicketReducer.SelectedTicketState>('selectedTickets');
        //console.log("[AppSideNavComponent] ngAfterViewInit selectUserState:", selectUserState); 
        const selectAllTickets = createSelector(selectUserState,
            selectedTicketReducer.selectAllTickets
        ); 

        //console.log("[AppSideNavComponent] ngAfterViewInit selectAllTickets:", selectAllTickets); 

        this.store.select(selectAllTickets)
        .subscribe((data) => {
            //console.log("[AppSideNavComponent] ngAfterViewInit selectAllTickets data:", data); 
        })
    }

    hasTickets() {
        return this.dataSource.length > 0;
    }

    drawingDateClick() {
        this.noEdit = false;
        //this.drawDateInput.nativeElement.focus();
    }

    onBlurDrawingDateInput() {
        this.noEdit = true;
    }

    clearList() {
        this.store.dispatch(selectedTicketActions.deleteAllTicketAction({mode: "all"}));
    }

    /**
     * 
     */
    saveSelectedTickets() {
        const ticketList = this.dataSource.map(ticketInfo => {
            let ticket: SelectedTicket = {
                mega: null,
                number: []
            };
            ticket.mega = ticketInfo.mega;
            ticket.number = ticketInfo.number.split(" ");
            return ticket;
        });
        const ticketSet: TicketSet = {numberList: ticketList};

        const selectedTicketForSubmit: SelectedTicketForSubmit = {drawingDate: new Date(this.drawingDate), ticketSet}

        this.dataService.saveSelectedTickets(selectedTicketForSubmit);


    }
}