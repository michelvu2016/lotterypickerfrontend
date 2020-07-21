import {NgModule} from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {NavigationControllerDirective} from './navigation/navigation-controller.directive';
import {BrowserModule} from '@angular/platform-browser';
import { NavbarOperationDirective } from './navigation/navbar-operation.directive';



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
  ],
  imports: [
    BrowserModule
  ]
})
export class AppNavigationModule {
  
}
