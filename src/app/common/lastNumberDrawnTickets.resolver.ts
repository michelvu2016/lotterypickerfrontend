import { Injectable } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { from, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import {LastNumberOfTicketInfo} from '../common/appTypes'
import { DataService } from '../tools/data-service'

@Injectable({providedIn: 'root'})
export class LastNumberDrawnTicketResolver implements Resolve<LastNumberOfTicketInfo> {
    
    constructor(private dataService: DataService) {
        console.log(">>>[LastNumberDrawnTicketResolver] constructor called");
    }
/**
 * 
 * @param activatedRouteSnapShoot 
 * @param routerStateSnapShot 
 */
    resolve(activatedRouteSnapShoot: ActivatedRouteSnapshot, routerStateSnapShot: RouterStateSnapshot): Observable<LastNumberOfTicketInfo> {
        const lotterTypeId = activatedRouteSnapShoot.params['id'];
        const numberOfTickets = 5;
        console.log(">>>[LastNumberDrawnTicketResolver] resolver triggered");
        return from(
            this.dataService.getDrawnNumbers(numberOfTickets, lotterTypeId)
        ).pipe(
            tap(data => console.log(">>>[LastNumberDrawnTicketResolver] data retrieved:", data)),
            map(data => {
                const retObj : LastNumberOfTicketInfo = {
                    numberOfTicket: numberOfTickets,
                    data
                };
                return retObj;
            })
        )
    }
    


}