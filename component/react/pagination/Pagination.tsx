import React, {useCallback} from 'react';
import {observer} from "mobx-react";
import PaginationVM from './PaginationViewModel';
import {IPaginiationProps, PaginationType, EPaginationBtnType} from './type';

import css from './Pagination.scss';

interface IPButtonProps {
    className?: string;
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    type?: EPaginationBtnType;
    idx?: number;
    disabled?: boolean;
    hidden?: boolean;
    title?: string;
    children: string | React.ReactNode;
}

// 페이징 버튼 컴포넌트
const PButton = (props: IPButtonProps) => {
    const {className, onClick, type, idx, disabled, hidden, title, children} = props;

    return (
        <button type="button" className={className} onClick={onClick} data-type={type} data-idx={idx} title={title} disabled={disabled}>
            {hidden ? <span className={css.hidden}>{children}</span> : children}
        </button>);
};

const Pagination = observer((props: IPaginiationProps) => {
    const {paginationVM, paginationType = PaginationType.BASIC, className} = props;
    const {curIdx, startIdx, endIdx, option} = paginationVM;
    const {pageUtil} = option;
    const lastPage = option.pageUtil.lastPage;

    // 숫자 페이지 버튼 클릭 이벤트 콜백
    const clickBtnPage = useCallback((e) => {
        e.preventDefault();

        const idx = parseInt(e.target.getAttribute('data-idx')) || curIdx;
        const btnType = e.target.getAttribute('data-type') || EPaginationBtnType.number;

        paginationVM.changeCurIdx(btnType, idx);
        paginationVM.clickCallback(btnType);
    }, [curIdx]);

    // 숫자 페이지 버튼 생성
    const btnPage = () => {
        const btnLength = lastPage > pageUtil.blockSize ? pageUtil.blockSize : lastPage;
        const buttons = new Array(btnLength).fill(1).map((e, i) => (
            <li key={i}>
                <PButton
                    className={i + startIdx === curIdx ? css.on : ''}
                    onClick={clickBtnPage}
                    idx={i + startIdx}
                >
                    {i + startIdx}
                </PButton>
            </li>
        ));
        return buttons;
    };

    if(paginationType === PaginationType.SIMPLE)
        return (
            <div className={`${css.pagination} ${css.simplePagination} ${className || ''}`}>
                <span>{`${curIdx}/${option.pageUtil.lastPage}`}</span>
                <PButton className={`${css.prev}`} type={EPaginationBtnType.prev} onClick={clickBtnPage} title="이전" disabled={curIdx === 1 ? true : false} hidden={true}>이전 페이지</PButton>
                <PButton className={`${css.next}`} onClick={clickBtnPage} type={EPaginationBtnType.next} title="다음" disabled={curIdx === lastPage ? true : false} hidden={true}>다음 페이지</PButton>
            </div>
        );

    return (
        <div className={`${css.pagination} ${className || ''}`}>
            <PButton className={`${css.btn} ${css.prev}`} type={EPaginationBtnType.prev} onClick={clickBtnPage} title="이전 페이지" disabled={curIdx === 1 ? true : false} hidden={true}>이전 페이지</PButton>
            <ul>
                {curIdx > 5 && <li><PButton onClick={clickBtnPage} idx={1}>1</PButton></li>}
                {curIdx > 5 && <li key="first">
                    <PButton className={`${css.btn} ${css.first}`} onClick={clickBtnPage} type={EPaginationBtnType.first} title={`${pageUtil.blockSize}페이지 전`} hidden={true}>{pageUtil.blockSize}페이지 전</PButton>
                </li>}
                {btnPage()}
                {curIdx < lastPage - 5 && <li key="last">
                    <PButton className={`${css.btn} ${css.last}`} onClick={clickBtnPage} type={EPaginationBtnType.last} title={`${pageUtil.blockSize}페이지 후`} hidden={true}>{pageUtil.blockSize}페이지 후</PButton>
                </li>}
                {curIdx < lastPage - 5 &&
                <li><PButton onClick={clickBtnPage} idx={lastPage}>{lastPage}</PButton></li>}
            </ul>
            <PButton className={`${css.btn} ${css.next}`} onClick={clickBtnPage} type={EPaginationBtnType.next} title="다음 페이지" disabled={curIdx === lastPage ? true : false} hidden={true}>다음 페이지</PButton>
        </div>
    );
});

export default Pagination;