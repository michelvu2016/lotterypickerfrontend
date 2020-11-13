import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, Logger, QueryParams } from '@ngrx/data';
import { EMPTY, interval, Observable } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';
import { AppUser } from '../models/app-user.model';


@Injectable()
export class AppUserDataService extends DefaultDataService<AppUser> {


    private sampleData: AppUser = {
         username: 'mvu',
         name: 'Michel Vu',
         email: 'anhsaodem@yahoo.com',
         isLoggedOn: true,
         role: 'admin'
    }

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger ) {

        super("AppUser", http, httpUrlGenerator);
        logger.log("Exitting constructor of AppUserDataService");
    }

    getAll(): Observable<AppUser[]> {
         return interval(100).pipe(
             take(1),
             mapTo([this.sampleData])
         )
    }

    getById(key: number | string): Observable<AppUser> {
        return interval(100).pipe(
            take(1),
            mapTo(this.sampleData)
        )
    }

    getWithQuery(queryParams: QueryParams | string): Observable<AppUser[]> {
        return interval(100).pipe(
            take(1),
            mapTo([this.sampleData])
        )
    }


}