import { Component, ViewChild, TemplateRef } from '@angular/core';
import { TDataTool } from 'projects/jli-table/src/public_api';
import { TColumn } from 'projects/jli-table/src/public_api';
import { TData } from 'projects/jli-table/src/public_api';
import { TRow } from 'projects/jli-table/src/public_api';

import { CarService } from 'src/services/car.service';

import {faEdit, faLock, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FooterType } from 'projects/jli-table/src/public_api';
import { FrenchDecimalPipe } from 'src/pipes/french-decimal.pipe';
import { THeaderRow } from 'projects/jli-table/src/lib/entities/THeaderRow';
import { JliTableComponent } from 'projects/jli-table/src/lib/components/table/jli-table.component';
import { DialogService,DynamicDialogRef } from 'primeng';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('greet', {static: false}) greetTpl: TemplateRef<any>;
  @ViewChild('FooterTitle' , {static: false}) FooterTitleTpl: TemplateRef<any>;
  @ViewChild('IsClickableTpl', {static: false}) IsClickableTpl: TemplateRef<any>;
  @ViewChild('table') tableTpl: JliTableComponent;

  
  faEdit = faEdit;
  faLock = faLock;
  faTrashAlt = faTrashAlt;

  public EditDemande(id: number) {
    console.debug(id);
  }

  title = 'test-jli-table';

  columnsConfig: Array<TColumn> = [];
    

  headerConfig: Array<THeaderRow> = [];

  data: TData;

  



  constructor(private carService: CarService) {
  }

  ngOnInit() {

    this.headerConfig = [
      { Cells: [ { HeaderName: 'MHR1', ColSpan: 1, RowSpan: 2} , { HeaderName: 'MHR2', ColSpan: 7, RowSpan: 1} ] },
      { Cells: [ { HeaderName: 'MasterHeaderRow3', ColSpan: 4, RowSpan: 1}, { HeaderName: 'MasterHeaderRow4', ColSpan: 3, RowSpan: 1} ] },
    ];

    this.columnsConfig = [
      { Id: '0', FieldName:'id', HeaderName:'Histo', IsVisible : true,IsExpandColumn: true, IsSortable: false, IsFilterable: false, IsClickableTpl: null, customSort: (() => {}), Inputs: null, FooterType: FooterType.Title, FooterTitle: this.FooterTitleTpl, Format: null, ClassData: 'td-center' },
      { Id: '1', FieldName:'id', HeaderName:'Id', IsVisible : true, IsExpandColumn: false, IsSortable: true, IsFilterable: false, IsClickableTpl: null, customSort: (event => {console.debug(event); TDataTool.SimpleSort(event)}), Inputs: null, FooterType: FooterType.SumPage, FooterTitle: null, Format: null, ClassData: 'td-center' },
      { Id: '2', FieldName:'action', HeaderName:'Action', IsVisible : true, IsExpandColumn: false, IsSortable: false, IsFilterable: false,  IsClickableTpl: null, customSort: (() => {}), Inputs: this.greetTpl, FooterType: FooterType.RepeatHeader, FooterTitle: null, Format: null, ClassData: 'td-center' },
      { Id: '3', FieldName:'date', HeaderName:'Date', IsVisible : true, IsExpandColumn: false, IsSortable: true, IsFilterable: false, IsClickableTpl: null, customSort: (event => TDataTool.DateSort(event)), Inputs: null, FooterType: FooterType.None,FooterTitle: null, Format: null, ClassData: 'td-center' },
      { Id: '4', FieldName:'vin', HeaderName:'Vin',  IsVisible : true,IsExpandColumn: false, IsSortable: true, IsFilterable: true,  IsClickableTpl: this.IsClickableTpl, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.None,FooterTitle: null, Format: null, ClassData: 'td-center' },
      { Id: '5', FieldName:'year', HeaderName:'Year',  IsVisible : true,IsExpandColumn: false, IsSortable: true, IsFilterable: true, IsClickableTpl: null, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.SumPage,FooterTitle: null, Format: new FrenchDecimalPipe, ClassData: 'td-right' },
      { Id: '6', FieldName:'brand', HeaderName:'Brand', IsVisible : true, IsExpandColumn: false, IsSortable: true, IsFilterable: false, IsClickableTpl: null, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.None,FooterTitle: null, Format: null, ClassData: 'td-center' },
      { Id: '7', FieldName:'color', HeaderName:'Color',  IsVisible : true,IsExpandColumn: false, IsSortable: true, IsFilterable: false,  IsClickableTpl: null, customSort: (event => TDataTool.SimpleSort(event)), Inputs: null, FooterType: FooterType.None,FooterTitle: null, Format: null, ClassData: 'td-center' },
  ];

    
    this.data = new TData();
    this.data.DataKey = this.columnsConfig[0].FieldName;
    this.data.HeaderConfig = this.headerConfig;
    this.data.Columns = this.columnsConfig;
    this.data.ExpandedRows = {};
    for(let col of this.data.Columns) {
      this.data.ExpandedRows[col.FieldName] = 0;
    }
    this.data.RowsPerPageOptions = [5, 10, 100];

    TDataTool.configureColumns(this.data);
    

    this.OnClick();
  }


  public ShowVin() {
 
    this.data.VisibleColumns = TDataTool.HideColumn('4', this.data);
    this.data.VisibleColumns = TDataTool.HideColumn('5', this.data);


  }

  public OnClick(): void {
  
    this.carService.getCars().then(result => {
      TDataTool.FormatData(result, this.data, x => {
        this.tableTpl.resetSort();
        x.ExpandedRows = {};
        x.Rows.forEach(function (row) {
            let expandableContent: Array<TRow> = x.Rows.filter(y => y.Data[x.DataKey] >= row.Data[x.DataKey] && y.Data[x.DataKey] < row.Data[x.DataKey]+100 ); 
            row.ExpandableContent = expandableContent;
        });
        x.Rows = x.Rows.filter(y => y.Data[x.DataKey] % 100 == 0);
      });     
    });
  }

  public OnClickTest(){
    console.debug("ALLLLLO");
  }

  public reset(){

    TDataTool.resetVisibleColumns(this.data);
    //this.data.VisibleColumns = this.columnsConfig;

  }
}
