/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils' // Change to '../../test-utils' when move to SDK
import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'

// Components
import Lightbox from './index.jsx'

test('Lightbox renders without errors', () => {
    const wrapper = mount(<Lightbox id="id" />)
    expect(wrapper.length).toBe(1)
})

test('includes the component class name with no className prop', () => {
    const wrapper = mount(<Lightbox id="id" />)
    expect(wrapper.hasClass('a-lightbox')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = mount(<Lightbox id="id" />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = mount(<Lightbox id="id" className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('`scrollable` prop set as true, it should add scrollable attribute', () => {
    const wrapper = mount(<Lightbox id="id" height="10" scrollable={true} />)

    expect(wrapper.find('#id').prop('scrollable')).toBe('')
})
