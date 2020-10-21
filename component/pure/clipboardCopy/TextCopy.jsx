import React, {useEffect, useRef} from 'react';
import ClipBoardCopy from "./ClipBoardCopy";

import css from './ClipBoardCopy.scss';


const TextCopy = () => {
    const textareaRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        new ClipBoardCopy({
            textareaHidden: false,
            textarea: textareaRef.current,
            readonly: false,
            btnCopy: btnRef.current,
            callback: function(){console.log('copy')}
        });
    }, []);

    return (
        <div className={css.clipboardCopy}>
            <h2>textarea 노출 - 텍스트 영역에 입력한 값 복사</h2>
            <div>
                <textarea ref={textareaRef}></textarea>
                <button type="button" data-copy="false" ref={btnRef}>클립보드 복사</button>
            </div>
        </div>
    );
};

export default TextCopy;