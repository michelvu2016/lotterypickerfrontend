import {NgModule} from '@angular/core';
import {DrawnNumberUpdateComponent} from './drawn-number-update/drawn-number-update.component';
import {CommonModule} from '@angular/common';
import {CommonToolsModule} from './CommonTools.module';
import { FormsModule } from '@angular/forms';
import { DrawnNumberMassUpdateComponent } from './drawn-number-update/mass-update/drawn-number-mass-update.component';
import { DrawnNumberMassUpdateDetailsComponent } from './drawn-number-update/mass-update/mass-update-details/drawn-number-mass-update-details.component';
import { MVSpinnerModule } from './common/spinners/mv-spinner/mv-spinner.module';


@NgModule({
   declarations: [
     DrawnNumberUpdateComponent,
     DrawnNumberMassUpdateComponent,
     DrawnNumberMassUpdateDetailsComponent,
   ],
  imports: [
    CommonModule,
    FormsModule,
    CommonToolsModule,
    MVSpinnerModule,

  ],
   exports: [
     DrawnNumberUpdateComponent,
     DrawnNumberMassUpdateComponent,
     DrawnNumberMassUpdateDetailsComponent,
   ]
})
export class AppDrawnNumberModule {

}
