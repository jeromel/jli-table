import { Component, ViewChild, TemplateRef } from '@angular/core';
import { TDataTool } from 'projects/jli-table/src/public_api';
import { TColumn } from 'projects/jli-table/src/public_api';
import { TData } from 'projects/jli-table/src/public_api';
import { TRow } from 'projects/jli-table/src/public_api';

import { CarService } from 'src/services/car.service';

import {faEdit, faLock, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FooterType } from 'projects/jli-table/src/public_api';
import { FrenchDecimalPipe } from 'src/pipes/french-decimal.pipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('greet') greetTpl: TemplateRef<any>;
  faEdit = faEdit;
  faLock = faLock;
  faTrashAlt = faTrashAlt;

  public EditDemande(id: number) {
    console.debug(id);
  }

  title = 'test-jli-table';

  carTableColumns: Array<TColumn> = [];
    

  data: TData;


  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.isVin = false;
    this.carTableColumns = [
      { FieldName:'id', HeaderName:'Histo', IsExpandColumn: true, IsSortable: false, IsFilterable: false, customSort: (() => {}), Inputs: null, FooterType: FooterType.None, Format: null, ClassData: 'td-center' },
      { FieldName:'id', HeaderName:'Id', IsExpandColumn: false, IsSortable: true, IsFilterable: false, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.SumPage, Format: null, ClassData: 'td-center' },
      { FieldName:'action', HeaderName:'Action', IsExpandColumn: false, IsSortable: false, IsFilterable: false, customSort: (() => {}), Inputs: this.greetTpl, FooterType: FooterType.RepeatHeader, Format: null, ClassData: 'td-center' },
      { FieldName:'date', HeaderName:'Date', IsExpandColumn: false, IsSortable: true, IsFilterable: false, customSort: (event => TDataTool.DateSort(event)), Inputs: null, FooterType: FooterType.None, Format: null, ClassData: 'td-center' },
      { FieldName:'vin', HeaderName:'Vin', IsExpandColumn: false, IsSortable: true, IsFilterable: true, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.None, Format: null, ClassData: 'td-center' },
      { FieldName:'year', HeaderName:'Year', IsExpandColumn: false, IsSortable: true, IsFilterable: true, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.SumPage, Format: new FrenchDecimalPipe, ClassData: 'td-right' },
      { FieldName:'brand', HeaderName:'Brand', IsExpandColumn: false, IsSortable: true, IsFilterable: false, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.None, Format: null, ClassData: 'td-center' },
      { FieldName:'color', HeaderName:'Color', IsExpandColumn: false, IsSortable: true, IsFilterable: false, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.None, Format: null, ClassData: 'td-center' },
  ];
    this.data = new TData();
    this.data.DataKey = this.carTableColumns[0].FieldName;
    this.data.Columns = this.carTableColumns;
    this.data.ExpandedRows = {};
    for(let col of this.data.Columns) {
      this.data.ExpandedRows[col.FieldName] = 0;
    }
    this.data.RowsPerPageOptions = [5, 10, 100];
  }
  
  public isVin: boolean;
  public ShowVin() {
    this.isVin = !this.isVin;
    
    TDataTool.HideColumn('vin', this.data);
  }

  public OnClick(): void {
    this.carService.getCars().then(result => {
      TDataTool.FormatData(result, this.data, x => {
        x.ExpandedRows = {};
        x.Rows.forEach(function (row) {
            let expandableContent: Array<TRow> = x.Rows.filter(y => y.Data[x.DataKey] >= row.Data[x.DataKey] && y.Data[x.DataKey] < row.Data[x.DataKey]+100 ); 
            row.ExpandableContent = expandableContent;
        });
        x.Rows = x.Rows.filter(y => y.Data[x.DataKey] % 100 == 0);
      });
    });
  }
}
