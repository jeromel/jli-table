import { ISortEvent } from './ISortEvent';
import { TemplateRef, PipeTransform } from '@angular/core';
import { FooterType } from './FooterType';

export abstract class TColumn {
    FieldName: string = '';
    HeaderName: string = '';
    IsVisible: boolean = true;
    IsSortable: boolean = true;
    IsFilterable: boolean = false;
    
    public FooterType: FooterType = FooterType.None;

    public abstract customSort(event: ISortEvent);

    public Inputs: TemplateRef<any> = null;

    public Format: PipeTransform;
}