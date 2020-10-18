import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypescriptPlayground } from './typescript-playground/typecript-playground.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TypescriptPlayground
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ]
})
export class PlaygroundModule { }
