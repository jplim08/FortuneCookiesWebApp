import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FortunesRoutingModule } from './fortunes-routing.module';
import { FortunesComponent } from './fortunes.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FortunesComponent],
  imports: [
    CommonModule,
    FortunesRoutingModule,
    NgxWebstorageModule.forRoot(),
    TooltipModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder],
})
export class FortunesModule { }
