import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminComponent } from './app-admin/app-admin.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [AppAdminComponent],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports: [
    AppAdminComponent,
  ]
})
export class AppUserModule { }
