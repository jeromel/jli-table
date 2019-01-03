import { TRow } from '../entities/TRow';
import { TData } from '../entities/TData';
import { IFillExpandableContent } from '../entities/IFillExpandableContent';
import { ISortEvent } from '../entities/ISortEvent';

export class TDataService {
    public static FormatData(data: any, td: TData, fill:IFillExpandableContent): void {
        let formattedData: Array<TRow> = [];
        data.forEach((res) => {
            let row: TRow = new TRow;
            Object.keys(res).forEach(key => {
                row.Data[key] = res[key];
            });

            formattedData.push(row);
        });

        td.Rows = formattedData;
        fill(td);
    }

    public static SimpleSort(event: ISortEvent): void {
        event.data.sort((data1, data2) => {
            let result = 0;

            let v1 = data1.Data[event.field];
            let v2 = data2.Data[event.field];

            if ((null == v1) && (null != v2)) {
                result = -1;
            }
            else
            if ((null != v1) && (null == v2)) {
                result = 1;
            }
            else
            if ((null == v1) && (null == v2)) {
                result = 0;
            }
            else {
                result = (v1 == v2) ? 0 : (v1 > v2) ? 1 : -1;
            }

            return event.order * result;
        });
    }

    public static DateSort(event: ISortEvent): void {
        event.data.sort((data1, data2) => {
            let result = 0;

            let v1 = data1.Data[event.field];
            let v2 = data2.Data[event.field];

            if ((null == v1) && (null != v2)) {
                result = -1;
            }
            else
            if ((null != v1) && (null == v2)) {
                result = 1;
            }
            else
            if ((null == v1) && (null == v2)) {
                result = 0;
            }
            else {
                let d1: Date = v1;
                let d2: Date = v2;

                result = +new Date(d1) - +new Date(d2);
            }

            return event.order * result;
        });
    }
}