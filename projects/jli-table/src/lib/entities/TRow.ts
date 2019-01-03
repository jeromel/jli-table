import { IDictionary } from './IDictionary';

export class TRow {
    Data: IDictionary<any> = [];
    ExpandableContent: Array<TRow> = [];
}