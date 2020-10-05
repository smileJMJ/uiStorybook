import React from 'react';
import PaginationButton from './PaginationButton';
import {EPaginationBtnType, IPButtonProps} from './type';
import {action} from "@storybook/addon-actions";
import css from './PaginationButton.scss';

export default {
    component: PaginationButton,
    title: 'React/Pagination/PaginationButton',
}

const Template = (args: IPButtonProps) => <PaginationButton {...args}/>;

export const Default = Template.bind({});
Default.args = {
    onClick: action('clicked'),
    idx: 1,
    title: '1',
    children: '1',
    className: css.paginationButton
};

export const Prev = Template.bind({});
Prev.args = {
    onClick: action('prev clicked'),
    type: EPaginationBtnType.prev,
    title: '이전 페이지',
    children: '이전 페이지',
    hidden: true,
    className: css.paginationButton
};