import { ISortEvent } from './ISortEvent';

export abstract class TColumn {
    FieldName: string;
    HeaderName: string;
    IsVisible: boolean = true;
    IsSortable: boolean = true;
    IsFilterable: boolean = false;

    abstract customSort(event: ISortEvent);
}