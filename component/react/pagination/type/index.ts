import PaginationVM from "../PaginationViewModel";

export interface IPageUtil {
    currentPage: number;
    pageSize: number;
    lastPage: number;
    recordCount: number;
    blockSize: number;
}

export enum EPaginationBtnType {prev = 'prev', next = 'next', first = 'first', last = 'last', number = 'number', all = 'all'};

export enum PaginationType {
    BASIC = 'basic',
    SIMPLE = 'simple'
}

export interface IPaginiationProps {
    paginationVM: PaginationVM;
    paginationType?: PaginationType;
    className?: string;
}