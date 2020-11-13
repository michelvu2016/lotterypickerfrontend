import {NgModule} from '@angular/core';
import {DrawnNumberUpdateComponent} from './drawn-number-update/drawn-number-update.component';
import {CommonModule} from '@angular/common';
import {CommonToolsModule} from './CommonTools.module';
import { FormsModule } from '@angular/forms';


@NgModule({
   declarations: [
     DrawnNumberUpdateComponent,

   ],
  imports: [
    CommonModule,
    FormsModule,
    CommonToolsModule,

  ],
   exports: [
     DrawnNumberUpdateComponent
   ]
})
export class AppDrawnNumberModule {

}
