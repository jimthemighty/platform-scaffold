import {mount, shallow} from 'enzyme'
import React from 'react'

import Link from '../../components/link'

import {HeaderBar, HeaderBarTitle} from './index'

/* eslint-disable newline-per-chained-call */

test('HeaderBarTitle renders without errors', () => {
    const wrapper = mount(<HeaderBarTitle><h1>Test</h1></HeaderBarTitle>)
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
    const wrapper = shallow(<HeaderBarTitle><span>a</span><div>b</div></HeaderBarTitle>)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.children().contains(<span>a</span>)).toBe(true)
    expect(wrapper.children().contains(<div>b</div>)).toBe(true)
})

test('HeaderBarTitle renders a Link with the given children with an href', () => {
    const wrapper = shallow(<HeaderBarTitle href="http://mobify.com/"><span>a</span><div>b</div></HeaderBarTitle>)

    expect(wrapper.is(Link)).toBe(true)
    expect(wrapper.prop('href')).toBe('http://mobify.com/')
    expect(wrapper.children().contains(<span>a</span>)).toBe(true)
    expect(wrapper.children().contains(<div>b</div>)).toBe(true)
})

test('HeaderBar renders without errors', () => {
    const wrapper = mount(<HeaderBar><h1>Test</h1></HeaderBar>)
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
