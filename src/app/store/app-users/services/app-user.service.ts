import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { AppUser }  from '../models/app-user.model';

@Injectable({providedIn: 'root'})
export class AppUserService extends EntityCollectionServiceBase<AppUser> {

    constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
        super('AppUser', serviceElementFactory);
    }

    
    

}