import { TSortMeta } from './TSortMeta';

export interface ISortEvent {
    data?: any[];
    mode?: string;
    field?: string;
    order?: number;
    multiSortMeta?: TSortMeta[];
}