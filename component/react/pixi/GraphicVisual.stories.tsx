import React, {useEffect, useRef} from 'react';
import {visual} from './GraphicVisual';

export const GrapicVisual = args => {
    const ref = useRef(null);

    useEffect(() => {
        visual.init(ref.current);
    }, []);

    return (
        <>
            <div ref={ref}></div>
        </>
    )
};

export default {
    component: GrapicVisual,
    title: 'React/Pixi'
}

const Template = args => <GrapicVisual/>;

const Default = Template.bind({});
