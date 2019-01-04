import { ISortEvent } from './ISortEvent';
import { TemplateRef } from '@angular/core';

export abstract class TColumn {
    FieldName: string = '';
    HeaderName: string = '';
    IsVisible: boolean = true;
    IsSortable: boolean = true;
    IsFilterable: boolean = false;

    abstract customSort(event: ISortEvent);

    Inputs: Array<TemplateRef<any>> = [];
}