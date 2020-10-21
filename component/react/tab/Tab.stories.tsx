import React from 'react';
import Tab from './Tab';
import {ITabContents} from "./type";

export default {
    component: Tab,
    title: 'React/Tab'
};

const Template = (args: ITabContents) => <Tab {...args}/>;

export const Default = Template.bind({});
Default.args = {
    tabContents: [
        {name: 'Tab 1'},
        {name: 'Tab 2'},
        {name: 'Tab 3'}
    ]
};