import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { TData } from '../../entities/TData';

import { Table } from 'primeng/table';
import { TColumn } from '../../entities/TColumn';
import { FooterType } from '../../entities/FooterType';
import { TRow } from '../../entities/TRow';
import { IDictionary } from '../../entities/IDictionary';
import { SortEvent } from 'primeng';

@Component({
  selector: 'lib-jli-table',
  templateUrl: './jli-table.component.html',
  styleUrls: ['./jli-table.component.scss']
})

export class JliTableComponent implements OnInit, AfterViewInit {
  @Input() TData: TData;
  @Input() rowsPerPageDefault: number;
  @Input() public rowExpandMode: string;
  @Input() public showExpandAllLinesButton: boolean = false;

  @ViewChild('jliTable', { static: true }) _table: Table;

  public FooterType = FooterType;

  public footerValues: IDictionary<string>;
  private expandAllRowsLabel: string = "Développer toutes les lignes";
  private collapseAllRowsLabel: string = "Réduire toutes les lignes";
  public expandedRows: { [key: string]: boolean } = {};
  private allLinesAreExpanded: boolean = false;
  public expandCollapseAllLinesButtonText: string;

  constructor() { }

  ngAfterViewInit() {
    this._table.dataKey = 'Data.' + this.TData.DataKey;
  }

  ngOnInit() {
    this.expandCollapseAllLinesButtonText = this.expandAllRowsLabel;
    this.TData.OnChange().subscribe(x => {
      console.log(this.expandedRows);
      this.TData.Columns.filter(x => x.FooterType === FooterType.SumPage).forEach(x => {
        this.footerValues[x.FieldName] = this.SumPage(x.FieldName);
      });
      if (this.showExpandAllLinesButton) {
        this.shouldExpandAllLines(false);
      }
    });

    this.firstRow = 0;
    if (undefined != this.TData.Rows) {
      this.lastRow = Math.min(this.TData.Rows.length, this.rowsPerPageDefault);
    }
    else {
      this.lastRow = this.rowsPerPageDefault;
    }

    this.footerValues = {};
  }

  public resetSort() {
    this._table.sortOrder = 0;
    this._table.sortField = '';
    this._table.reset();
  }

  public customSort(event: SortEvent): void {

    let col: TColumn = this.TData.Columns.find(x => x.Id == event.field);

    if (null != col) {
      if (col.IsSortable) {
        event.field = col.FieldName;
        col.customSort(event);
      }
    }
  }

  public customFilter(value, field, matchMode = ''): void {
    // this._table.filter(value, 'Data.'+field, matchMode);
  }

  public SumAll(fieldName: string): string {
    let sum: number = 0;

    let samples: Array<TRow> = this.TData.Rows;

    if (undefined != samples && null != samples) {
      samples.forEach(x => {
        sum += x.Data[fieldName];
      });
    }

    let ret: string = sum.toString();

    let col: TColumn = this.TData.Columns.find(x => x.FieldName == fieldName);
    if (null != col) {
      if (null != col.Format) {
        ret = col.Format.transform(sum);
      }
    }

    return ret;
  }

  public SumPage(fieldName: string, samples: Array<TRow> = undefined): string {
    let sum: number = 0;

    if (undefined == samples) {
      if (undefined != this.TData.Rows) {
        samples = this.TData.Rows.slice(this.firstRow, this.lastRow);
      }
    }

    if (undefined != samples && null != samples) {
      samples.forEach(x => {
        sum += x.Data[fieldName];
      });
    }

    let ret: string = sum.toString();

    let col: TColumn = this.TData.Columns.find(x => x.FieldName == fieldName);
    if (null != col) {
      if (null != col.Format) {
        ret = col.Format.transform(sum);
      }
    }

    return ret;
  }

  public getRowStyle(data: TData, rowData: TRow): string {
    return data.RowStyleCondition(rowData);
  }

  public firstRow: number;
  public lastRow: number;

  public onPage(event) {
    this.firstRow = event.first;
    this.lastRow = event.first + event.rows;

    this.TData.Columns.filter(x => x.FooterType === FooterType.SumPage).forEach(x => {
      this.footerValues[x.FieldName] = this.SumPage(x.FieldName);
    });
  }

  public onSort(event) {
    this.TData.Columns.filter(x => x.FooterType === FooterType.SumPage).forEach(x => {
      this.footerValues[x.FieldName] = this.SumPage(x.FieldName);
    });
  }

  public onFilter(event) {
    let filtered: Array<TRow> = event.filteredValue;
    this.TData.Columns.filter(x => x.FooterType === FooterType.SumPage).forEach(x => {
      this.footerValues[x.FieldName] = this.SumPage(x.FieldName, filtered);
    });
  }

  public toogleExpandCollapsAllLines() {
    if (this.TData.Rows && this.TData.Rows.length > 0)
      this.shouldExpandAllLines(!this.allLinesAreExpanded);
  }

  /**
 * 
 * @param shouldExpandAll true if you want to expand all lines, false if you want to close all lines
 */
  private shouldExpandAllLines(shouldExpandAll: boolean) {
    this.expandCollapseAllLinesButtonText = shouldExpandAll ? this.collapseAllRowsLabel : this.expandAllRowsLabel;
    this.TData.Rows.forEach(row => {
      this.expandedRows[row.Data[this.TData.DataKey]] = shouldExpandAll ? true : null;
    });
    this.allLinesAreExpanded = shouldExpandAll;
  }
}
