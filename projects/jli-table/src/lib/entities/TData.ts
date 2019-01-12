import { TColumn } from './TColumn';
import { TRow } from './TRow';
import { IDictionary } from './IDictionary';
import { Subject, Observable } from 'rxjs';

export class TData {
    DataKey: string;
    Columns: Array<TColumn>;
    VisibleColumns: Array<TColumn>;
    Rows: Array<TRow>;

    ExpandedRows: IDictionary<number>;

    OnChangeSub: Subject<TData>;
    
    OnChange(): Observable<TData> {
        return this.OnChangeSub.asObservable();
    }

    constructor() {
        this.OnChangeSub = new Subject<TData>();
    }
}