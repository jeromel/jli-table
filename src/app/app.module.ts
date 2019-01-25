import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from 'src/app/app.component';

import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JliTableModule } from 'projects/jli-table/src/public_api';
import { CarService } from 'src/services/car.service';
import { TableModule } from 'primeng/table';

import { FrenchDecimalPipe } from 'src/pipes/french-decimal.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    JliTableModule,
    TableModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
