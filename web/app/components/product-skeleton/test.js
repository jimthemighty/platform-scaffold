/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {mount, shallow} from 'enzyme'
/* eslint-env jest */
import React from 'react'

import ProductSkeleton from './index.jsx'

test('ProductSkeleton renders without errors', () => {
    const wrapper = mount(<ProductSkeleton />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<ProductSkeleton />)

    expect(wrapper.hasClass('c-product-skeleton')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<ProductSkeleton />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<ProductSkeleton className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
