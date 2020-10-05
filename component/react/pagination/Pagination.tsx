import React, {useCallback} from 'react';
import {observer} from "mobx-react";
import PaginationButton from "../paginationButton/PaginationButton";
import {IPaginiationProps} from './type';
import {EPaginationBtnType} from "../paginationButton/type";

import css from './Pagination.scss';

const Pagination = observer((props: IPaginiationProps) => {
    const {paginationVM} = props;
    const {curIdx, startIdx, endIdx, option} = paginationVM;
    const {pageUtil} = option;
    const {blockSize, lastPage} = pageUtil;

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
                <PaginationButton
                    isActive={i + startIdx === curIdx ? css.on : ''}
                    onClick={clickBtnPage}
                    idx={i + startIdx}
                >
                    {i + startIdx}
                </PaginationButton>
            </li>
        ));
        return buttons;
    };

    return (
        <div className={`${css.pagination}`}>
            <PaginationButton type={EPaginationBtnType.prev} onClick={clickBtnPage} title="이전 페이지" disabled={curIdx === 1 ? true : false} hidden={true}>이전 페이지</PaginationButton>
            <ul>
                {curIdx > blockSize && <li><PaginationButton onClick={clickBtnPage} idx={1}>1</PaginationButton></li>}
                {curIdx > blockSize && <li key="first">
                    <PaginationButton onClick={clickBtnPage} type={EPaginationBtnType.first} title={`${pageUtil.blockSize}페이지 전`} hidden={true}>{pageUtil.blockSize}페이지 전</PaginationButton>
                </li>}
                {btnPage()}
                {curIdx < lastPage - blockSize && <li key="last">
                    <PaginationButton onClick={clickBtnPage} type={EPaginationBtnType.last} title={`${pageUtil.blockSize}페이지 후`} hidden={true}>{pageUtil.blockSize}페이지 후</PaginationButton>
                </li>}
                {curIdx < lastPage - blockSize &&
                <li><PaginationButton onClick={clickBtnPage} idx={lastPage}>{lastPage}</PaginationButton></li>}
            </ul>
            <PaginationButton onClick={clickBtnPage} type={EPaginationBtnType.next} title="다음 페이지" disabled={curIdx === lastPage ? true : false} hidden={true}>다음 페이지</PaginationButton>
        </div>
    );
});

export default Pagination;