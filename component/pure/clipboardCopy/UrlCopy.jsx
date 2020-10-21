import React, {useEffect, useRef} from 'react';
import ClipBoardCopy from "./ClipBoardCopy";

import css from './ClipBoardCopy.scss';

const UrlCopy = () => {
    const ref = useRef(null);

    useEffect(() => {
        new ClipBoardCopy({
            textareaHidden: true,
            value: location.href,
            btnCopy: ref.current,
            callback: function(){
                let btn = ref.current;
                btn.textContent = '주소가 복사되었습니다.';
            }
        });
    }, []);

    return (
        <div className={css.clipboardCopy}>
            <h2>textarea 비노출 - 현재 url 복사</h2>
            <div>
                <button type="button" data-copy="false" ref={ref}>클립보드 복사</button>
            </div>
        </div>
    );
};

export default UrlCopy;