import { TColumn } from './TColumn';
import { TRow } from './TRow';
import { IDictionary } from './IDictionary';
import { Subject, Observable } from 'rxjs';
import { THeaderRow } from './THeaderRow';

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
    
    RowStyleCondition: string;

    getRowStyleCondition(data: Array<any>, key: string) {
        console.debug(data[key]);
         return (data[key] % 100 == 99) ? 'bg-red-italic': null;
        // console.debug(this.RowStyleCondition);
        // return this.RowStyleCondition;

    }

    constructor() {
        this.OnChangeSub = new Subject<TData>();
    }
}