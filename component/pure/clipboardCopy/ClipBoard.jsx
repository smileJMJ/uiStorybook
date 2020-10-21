import React from 'react';
import ClipBoardCopy from "./ClipBoardCopy";





const FixedTextCopy = () => {
    return (
        <>
            <h2>textarea 노출 - 텍스트 영역의 고정값 복사</h2>
            <div id="fixedTextCopy">
                <button type="button" className="btn_copy" data-copy="false">클립보드 복사</button>
            </div>
        </>
    );
};