import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TableModule } from 'primeng/table';

import { JliTableComponent } from '../lib/components/table/jli-table.component';
import { ValuesPipe } from '../lib/pipes/values.pipe';

@NgModule({
  declarations: [JliTableComponent, ValuesPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    TableModule,
  ],
  providers: [],
  exports: [JliTableComponent]
})
export class JliTableModule { }
