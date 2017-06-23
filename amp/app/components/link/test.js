/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from '../../test-utils'
import React from 'react'

import Link from './index.jsx'

/* eslint-disable jsx-a11y/anchor-has-content */

test('Link renders without errors', () => {
    const wrapper = shallow(<Link href="test" />)
    expect(wrapper.length).toBe(1)
})

test('If no children are passed, it renders the link with the text prop', () => {
    const wrapper = shallow(<Link href="https://google.com/" text="Test" />)

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.prop('href')).toBe('https://google.com/?mobify_id=CLIENT_ID(sandy-client-id)')
    expect(wrapper.children().text()).toBe('Test')
})

test('If a http URL is passed, it renders a https one', () => {
    const wrapper = shallow(<Link href="http://google.com/" text="Test" />)

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.prop('href')).toBe('https://google.com/?mobify_id=CLIENT_ID(sandy-client-id)')
})

test('Renders the appropriate properties for the resulting <a> tag', () => {
    const wrapper = shallow(<Link href="https://google.com/" text="Test" />)

    const outboundLink = 'https://google.com/?mobify_id=CLIENT_ID(sandy-client-id)'
    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.prop('href')).toBe(outboundLink)
    expect(wrapper.prop('data-vars-outbound-link')).toBe(outboundLink)
    expect(wrapper.prop('data-amp-replace')).toBe('CLIENT_ID')
})

test('If no href is passed, it renders a link with #', () => {
    const wrapper = shallow(<Link text="test" />)

    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.prop('href')).toBe('#')
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Link />)

    expect(wrapper.hasClass('amp-link')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Link />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Link className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('the openInNewTab prop adds the right attributes', () => {
    const wrapper = shallow(<Link href="http://google.com" openInNewTab />)

    expect(wrapper.prop('target')).toBe('_blank')
    expect(wrapper.prop('rel')).toBe('noopener')
})

test('passes arbitrary props to the `a` element', () => {
    const onFocus = () => {}
    const wrapper = shallow(<Link data-foo="bar" data-spam="cheese" data-pigeon onFocus={onFocus} />)

    expect(wrapper.type()).toBe('a')
    expect(wrapper.prop('data-foo')).toBe('bar')
    expect(wrapper.prop('data-spam')).toBe('cheese')
    expect(wrapper.prop('data-pigeon')).toBe(true)
    expect(wrapper.prop('onFocus')).toBe(onFocus)
})
