import React, {useEffect, useRef} from 'react';
import {graphicVisualMotion} from './GraphicVisualMotion';

import css from './GraphicVisual.scss';

const GraphicVisual = () => {
    const ref = useRef(null);

    useEffect(() => {
        graphicVisualMotion.init(ref.current);
    }, []);

    return (
        <div className={css.graphicVisual} ref={ref}></div>
    )
};

export default GraphicVisual;