import React from 'react';
import css from "./PaginationButton.scss";
import {IPButtonProps} from "./type";

const PaginationButton = (props: IPButtonProps) => {
    const {onClick, type, idx, disabled, hidden, title, isActive, children} = props;

    return (
        <button type="button" className={`${css.paginationButton} ${type ? css[type] : ''} ${isActive ? css.on : ''}`} onClick={onClick} data-type={type} data-idx={idx} title={title} disabled={disabled}>
            {hidden ? <span className={css.hidden}>{children}</span> : children}
        </button>
    );
};

export default PaginationButton;