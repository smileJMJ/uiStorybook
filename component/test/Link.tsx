import React, { useState } from 'react';

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal'
};

interface IProps {
    page: string;
    children: React.ReactNode;
}

const Link = (props: IProps) => {
    const [status, setStatus] = useState(STATUS.NORMAL);
    const {page, children} = props;

    const handleMouseEnter = (e) => {
        //e.preventDefault();
        setStatus(STATUS.HOVERED);
    };

    const handleMouseLeave = (e) => {
        //e.preventDefault();
        setStatus(STATUS.NORMAL);
    };

    return (
        <a
            className={status}
            href={page || '#'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </a>
    );
};

export default Link;