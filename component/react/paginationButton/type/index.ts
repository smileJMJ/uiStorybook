import React from "react";

export enum EPaginationBtnType {prev = 'prev', next = 'next', first = 'first', last = 'last', number = 'number', all = 'all'};

export interface IPButtonProps {
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    type?: EPaginationBtnType;
    idx?: number;
    disabled?: boolean;
    hidden?: boolean;
    title?: string;
    isActive?: boolean;
    children: string | React.ReactNode;
}