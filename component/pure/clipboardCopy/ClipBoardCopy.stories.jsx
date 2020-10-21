import React from 'react';
import UrlCopy from "./UrlCopy";
import TextCopy from "./TextCopy";
import FixedTextCopy from "./FixedTextCopy";

export default {
    title: 'Pure/ClipBoardCopy'
}

const urlCopyTemplate = () => <UrlCopy/>;
export const urlCopy = urlCopyTemplate.bind({});

const textCopyTemplate = () => <TextCopy/>;
export const textCopy = textCopyTemplate.bind({});

const fixedTextCopyTemplate = () => <FixedTextCopy/>;
export const fixedTextCopy = fixedTextCopyTemplate.bind({});