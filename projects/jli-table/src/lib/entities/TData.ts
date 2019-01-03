import { TColumn } from './TColumn';
import { TRow } from './TRow';
import { IDictionary } from './IDictionary';

export class TData {
    DataKey: string;
    Columns: Array<TColumn>;
    Rows: Array<TRow>;

    ExpandedRows: IDictionary<number>;

    constructor() {}
}