import React from 'react';
import Pagination from "./Pagination";
import PaginationViewModel from "./PaginationViewModel";
import { IPaginiationProps } from './type';


export default {
    component: Pagination,
    title: 'React/Pagination/Pagination'
}

const Template = (args: IPaginiationProps) => <Pagination {...args}/>;

export const Default = Template.bind({});
const defaultVM = new PaginationViewModel();
defaultVM.setOption({
    pageUtil: {
        currentPage: 1,
        pageSize: 20,
        lastPage: 20,
        recordCount: 1,
        blockSize: 5,
    }
});
Default.args = {
    paginationVM: defaultVM
};

