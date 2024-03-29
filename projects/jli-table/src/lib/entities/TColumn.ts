import { ISortEvent } from './ISortEvent';
import { TemplateRef, PipeTransform } from '@angular/core';
import { FooterType } from './FooterType';

export abstract class TColumn {
    Id: string = '';
    FieldName: string = '';
    HeaderName: string = '';
    IsExpandColumn: boolean = false;
    IsSortable: boolean = true;
    IsFilterable: boolean = false;
    IsVisible: boolean = true;
 

    public RowExpandedInputs: TemplateRef<any> = null;

    
    
    public FooterType: FooterType = null;

    public FooterTitle: TemplateRef<any> = null;

    public abstract customSort(event: ISortEvent);

    public Inputs: TemplateRef<any> = null;

    public ClassData: string;
    
    public Format: PipeTransform;
}