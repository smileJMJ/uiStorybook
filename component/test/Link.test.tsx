import React from 'react';
import Link from './Link';
import renderer from 'react-test-renderer';
//import {act} from "react-dom/test-utils";
import TestRenderer from 'react-test-renderer';
const {act} = TestRenderer;

it('renders correnctly', () => {
    const tree = renderer
        .create(<Link page="http://www.facebook.com">FACEBOOK</Link>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders as an anchor when no page is set', () => {
    const tree = renderer.create(<Link>FACEBOOK</Link>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('changes the class when hovered', () => {
    const component = renderer.create(<Link page="https://www.naver.com">NAVER</Link>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    act(() => {tree.props.onMouseEnter();});
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    act(() => {tree.props.onMouseLeave();});
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});