import {NgModule} from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {NavigationControllerDirective} from './navigation/navigation-controller.directive';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [
    NavigationComponent,
    NavigationControllerDirective
  ],
  exports: [
    NavigationComponent,
    NavigationControllerDirective
  ],
  imports: [
    BrowserModule
  ]
})
export class AppNavigationModule {
  
}
