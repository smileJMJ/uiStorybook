import React from 'react';
import BrowserDetect from "./BrowserDetect";

const Component = () => {
    const browserDetect = new BrowserDetect();
    const {browser, phone} = browserDetect;

    return (
        <div>
            <p>브라우저: {browser}</p>
            <p>휴대폰 기종: {phone}</p>
        </div>
    );
};

export default {
    component: Component,
    title: 'Pure/BrowserDetect'
};

const Template = args => <Component/>;

export const Default = Template.bind({});