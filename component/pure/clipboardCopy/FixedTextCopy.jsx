import React, {useEffect, useRef} from 'react';
import ClipBoardCopy from "./ClipBoardCopy";

import css from './ClipBoardCopy.scss';


const FixedTextCopy = () => {
    const textareaRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        new ClipBoardCopy({
            textareaHidden: false,
            textarea: textareaRef.current,
            readonly: true,
            value: '가나다라마바사아',
            btnCopy: btnRef.current,
            callback: function(){alert('복사되었습니다.');}
        });
    }, []);

    return (
        <div className={css.clipboardCopy}>
            <h2>textarea 노출 - 텍스트 영역의 고정값 복사</h2>
            <div>
                <textarea ref={textareaRef}></textarea>
                <button type="button" data-copy="false" ref={btnRef}>클립보드 복사</button>
            </div>
        </div>
    );
};

export default FixedTextCopy;