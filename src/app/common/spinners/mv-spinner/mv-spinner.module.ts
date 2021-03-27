import { CommonModule } from '@angular/common';
import { AfterViewInit, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MVSpinnerComponent } from './mv-spinner.component';


@NgModule({
    declarations: [
        MVSpinnerComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
    ],
    exports: [
        MVSpinnerComponent
    ]
})
export class MVSpinnerModule {

}