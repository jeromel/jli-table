import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TData } from '../../entities/TData';
import { TColumn } from '../../entities/TColumn';

import { SortEvent } from 'node_modules/primeng/components/common/sortevent';
import { Table } from 'node_modules/primeng/table';

@Component({
  selector: 'lib-jli-table',
  templateUrl: './jli-table.component.html',
  styleUrls: ['./jli-table.component.scss']
})
export class JliTableComponent implements OnInit {
  @Input() TData: TData;

  @ViewChild('table') private _table: Table;

  constructor() { }

  ngOnInit() {
    this._table.dataKey = 'Data.'+this.TData.DataKey;
  }

  public customSort(event: SortEvent): void {
    let col: TColumn = this.TData.Columns.find(x => x.FieldName == event.field);
    
    if (null != col) {
      if (col.IsSortable) {
        col.customSort(event);
      }
    }
  }

  public customFilter(value, field, matchMode = ''): void {
    this._table.filter(value, 'Data.'+field, matchMode);
  }
}
