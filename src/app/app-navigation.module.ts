import {NgModule} from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {NavigationControllerDirective} from './navigation/navigation-controller.directive';
import {BrowserModule} from '@angular/platform-browser';
import { NavbarOperationDirective } from './navigation/navbar-operation.directive';
import { CommonMdules } from './common.mdules';
import { RouterModule } from '@angular/router';
import { AppUserModule } from './app-user/app-user.module';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    NavigationComponent,
    NavigationControllerDirective,
    NavbarOperationDirective,
   
  ],
  exports: [
    NavigationComponent,
    NavigationControllerDirective,
    NavbarOperationDirective,
    AppUserModule
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppUserModule,
  ]
})
export class AppNavigationModule {
  
}
