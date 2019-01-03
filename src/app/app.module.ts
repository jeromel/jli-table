import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from 'src/app/app.component';

import { HttpClientModule } from '@angular/common/http';


import { JliTableModule } from 'jli-table';
import { CarService } from 'src/services/car.service';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    JliTableModule,
    TableModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
