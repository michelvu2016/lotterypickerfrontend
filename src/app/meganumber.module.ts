import {NgModule} from '@angular/core';
import {MegaManagerComponent} from './mega/mega-manager/mega-manager.component';
import {MegaListComponent} from './mega/mega-list/mega-list.component';
import {AppModule} from './app.module';
import {CommonMdules} from './common.mdules';
import {BrowserModule} from '@angular/platform-browser';



@NgModule({

  declarations: [
     MegaManagerComponent,
     MegaListComponent
  ],

  imports: [

    CommonMdules,
    BrowserModule

  ],

  exports: [
    MegaManagerComponent

  ],

  providers: []

})
export class MeganumberModule {

}
