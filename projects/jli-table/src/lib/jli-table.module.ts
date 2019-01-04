import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TableModule } from 'primeng/table';

import { JliTableComponent } from '../lib/components/table/jli-table.component';
import { ValuesPipe } from '../lib/pipes/values.pipe';
import { TDataService } from '../lib/services/tdata.service';



@NgModule({
  declarations: [JliTableComponent, ValuesPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    TableModule,
  ],
  providers: [TDataService],
  exports: [JliTableComponent]
})
export class JliTableModule { }
