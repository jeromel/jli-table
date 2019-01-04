import { Component, ViewChild, TemplateRef } from '@angular/core';
import { TDataService } from 'projects/jli-table/src/lib/services/tdata.service';
import { TColumn } from 'projects/jli-table/src/lib/entities/TColumn';
import { TData } from 'projects/jli-table/src/lib/entities/TData';
import { TRow } from 'projects/jli-table/src/lib/entities/TRow';

import { CarService } from 'src/services/car.service';

import {faEdit, faLock, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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
  
  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carTableColumns = [
     { FieldName:'id', HeaderName:'Id', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'action', HeaderName:'Action', IsVisible: true, IsSortable: false, IsFilterable: false, customSort: (event => {}), Inputs: [this.greetTpl]},
      { FieldName:'date', HeaderName:'Date', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.DateSort(event)), Inputs: []},
      { FieldName:'vin', HeaderName:'Vin', IsVisible: true, IsSortable: true, IsFilterable: true, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'year', HeaderName:'Year', IsVisible: true, IsSortable: true, IsFilterable: true, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'brand', HeaderName:'Brand', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
      { FieldName:'color', HeaderName:'Color', IsVisible: true, IsSortable: true, IsFilterable: false, customSort: (event => TDataService.SimpleSort(event)), Inputs: []},
  ];
    this.data = new TData();
    this.data.DataKey = this.carTableColumns[0].FieldName;
    this.data.Columns = this.carTableColumns;
    this.data.ExpandedRows = {};
    for(let col of this.data.Columns) {
      this.data.ExpandedRows[col.FieldName] = 0;
    }
  }
  
  public OnClick(): void {
    this.carService.getCarsSmall().then(result => {
      TDataService.FormatData(result, this.data, x => {
        x.ExpandedRows = {};
        x.Rows.forEach(function (row) {
            let expandableContent: Array<TRow> = x.Rows.filter(y => y.Data[x.DataKey] >= row.Data[x.DataKey] && y.Data[x.DataKey] < row.Data[x.DataKey]+100 ); 
            row.ExpandableContent = expandableContent;
        });
        x.Rows = x.Rows.filter(y => y.Data[x.DataKey] % 100 == 0);
      });

      console.debug(this.data);
    });
  }
}
