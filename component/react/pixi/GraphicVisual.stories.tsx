import React, {useEffect, useRef} from 'react';
import GraphicVisual from './GraphicVisual';

export default {
    component: GraphicVisual,
    title: 'React/Pixi'
}

const Template = args => <GraphicVisual {...args}/>;

export const Default = Template.bind({});
