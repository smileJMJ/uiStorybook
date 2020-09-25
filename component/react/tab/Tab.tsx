import React from 'react';
import { ITabProps } from './type';

import css from './Tab.scss';

const Tab = (props: ITabProps) => {
    const {tabContents} = props;

    const handleClick = (e: MouseEvent) => {
        console.log('click');
    };

    return (
        <div className={css.tab}>
            <ul>
                {
                    tabContents.map(tab => <li><button type="button" className={tab.className || ''} onClick={handleClick}>{tab.name}</button></li>)
                }
            </ul>
        </div>
    );
};

export default Tab;