/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {mount, render} from 'enzyme'
import React from 'react'

import Analytics from './index.jsx'


test('Analytics renders without errors', () => {
    const wrapper = mount(<Analytics templateName="test" />)
    expect(wrapper.length).toBe(1)
})

test('If only projectSlug passed, it renders as expected', () => {
    const result = render(<Analytics templateName="test" projectSlug="testSlug" />)

    expect(result.children().is('div')).toBe(true)
    expect(result.children().children().length).toBe(1)
    expect(result.children().children()
        .is('amp-analytics')).toBe(true)
})

test('If only GA Account passed, it renders as expected', () => {
    const result = render(<Analytics templateName="test" gaAccount="UA-12345" />)

    expect(result.children().is('div')).toBe(true)
    expect(result.children().children().length).toBe(1)
    expect(result.children().children()
        .is('amp-analytics')).toBe(true)
})

test('If both projectSlug and GA account passed, it renders as expected', () => {
    const result = render(<Analytics templateName="test" projectSlug="testSlug" gaAccount="UA-12345" />)

    expect(result.children().is('div')).toBe(true)
    expect(result.children().children().length).toBe(2)
    expect(result.children().children()
        .is('amp-analytics')).toBe(true)
})
