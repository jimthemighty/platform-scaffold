import {shallowHOC as shallow} from '../../test-utils'
import {mount} from 'enzyme'
import React from 'react'

import {HeaderBar, HeaderBarTitle} from './index'

/* eslint-disable newline-per-chained-call */

test('HeaderBarTitle renders without errors', () => {
    const wrapper = shallow(<HeaderBarTitle><h1>Test</h1></HeaderBarTitle>)
    expect(wrapper.length).toBe(1)
})

test('HeaderBarTitle includes the component class name with no className prop', () => {
    const wrapper = shallow(<HeaderBarTitle><h1>Test</h1></HeaderBarTitle>)

    expect(wrapper.hasClass('amp-header-bar__title')).toBe(true)
})

test('HeaderBarTitle does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<HeaderBarTitle><h1>Test</h1></HeaderBarTitle>)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('HeaderBarTitle renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<HeaderBarTitle className={name}><h1>Test</h1></HeaderBarTitle>)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('HeaderBarTitle renders a div with the given children with no href', () => {
    const wrapper = mount(<HeaderBarTitle>some title</HeaderBarTitle>)
    const node = wrapper.getDOMNode()
    expect(node.tagName.toLowerCase()).toBe('div')
    expect(node.hasAttribute('href')).toBe(false)
    expect(wrapper.text()).toBe('some title')
})

test('HeaderBarTitle renders a Link with the given children with an href', () => {
    const wrapper = mount(<HeaderBarTitle href="http://mobify.com/">some title</HeaderBarTitle>)
    const node = wrapper.getDOMNode()
    expect(node.tagName.toLowerCase()).toBe('a')
    expect(node.hasAttribute('href')).toBe(true)
    expect(wrapper.text()).toBe('some title')
})

test('HeaderBar renders without errors', () => {
    const wrapper = shallow(<HeaderBar><h1>Test</h1></HeaderBar>)
    expect(wrapper.length).toBe(1)
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<HeaderBar><h1>Test</h1></HeaderBar>)

    expect(wrapper.hasClass('amp-header-bar')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<HeaderBar><h1>Test</h1></HeaderBar>)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<HeaderBar className={name}><h1>Test</h1></HeaderBar>)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('HeaderBar renders a div with the given children', () => {
    const wrapper = shallow(<HeaderBar><span>a</span><div>b</div></HeaderBar>)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.children().contains(<span>a</span>)).toBe(true)
    expect(wrapper.children().contains(<div>b</div>)).toBe(true)
})
