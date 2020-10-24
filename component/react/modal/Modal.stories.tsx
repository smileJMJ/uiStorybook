import React from 'react';
import Modal from "./view/Modal";
import DefaultModal from "./view/DefaultModal";

export default {
    component: Modal,
    title: 'React/Modal'
}

export const Default = (args) => <DefaultModal {...args}/>;
Default.args = {
    title: '타이틀',
    content: `<p>콘텐츠 영역입니다.</p>`
};


