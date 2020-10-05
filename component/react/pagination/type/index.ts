import PaginationVM from "../PaginationViewModel";

export interface IPageUtil {
    currentPage: number;
    pageSize: number;
    lastPage: number;
    recordCount: number;
    blockSize: number;
}

export interface IPaginiationProps {
    paginationVM: PaginationVM;
}