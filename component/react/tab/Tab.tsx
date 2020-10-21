import React, {useState} from 'react';
import { ITabProps } from './type';

import css from './Tab.scss';

const Tab = (props: ITabProps) => {
    const {tabContents} = props;
    const [curIdx, setCurIdx] = useState(0);

    const handleClick = (e: MouseEvent) => {
        const idx = parseInt(e.target.dataset.idx);
        setCurIdx(idx);
    };

    return (
        <div className={css.tab}>
            <ul>
                {
                    tabContents.map((tab, i) => <li key={tab.name}><button type="button" className={i === curIdx ? css.on : ''} data-idx={i} onClick={handleClick}>{tab.name}</button></li>)
                }
            </ul>
        </div>
    );
};

export default Tab;