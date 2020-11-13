import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";
import {  AppUser } from '../models/app-user.model';

export const entityMetadata: EntityMetadataMap = {
    AppUser : {
        selectId: (appUser: AppUser) => appUser.username
    }
}

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata
}