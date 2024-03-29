import { TColumn } from './TColumn';
import { TRow } from './TRow';
import { IDictionary } from './IDictionary';
import { Subject, Observable } from 'rxjs';
import { THeaderRow } from './THeaderRow';

export interface RowStyleCondition {
    (rowData: TRow): string;
}

export class TData {
    DataKey: string;
    HeaderConfig: Array<THeaderRow>;
    Columns: Array<TColumn>;
    VisibleColumns: Array<TColumn>;
    Rows: Array<TRow>;

    ExpandedRows: IDictionary<number>;

    OnChangeSub: Subject<TData>;
    
    OnChange(): Observable<TData> {
        return this.OnChangeSub.asObservable();
    }

    RowsPerPageOptions: Array<number>;
    
    RowStyleCondition: RowStyleCondition;

    constructor() {
        this.OnChangeSub = new Subject<TData>();
    }
}