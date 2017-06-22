/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable newline-per-chained-call */
import {shallowHOC as shallow} from '../../test-utils'
import React from 'react'

import Icon from './index.jsx'

test('Icon renders without errors', () => {
    const wrapper = shallow(<Icon name="cart-add" title="Add to Cart" />)
    expect(wrapper.length).toBe(1)
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Icon name="test" />)
    expect(wrapper.hasClass('amp-icon')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Icon name="test" />)
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'test'
    const wrapper = shallow(<Icon name="test" className={name} />)
    expect(wrapper.hasClass(name)).toBe(true)
})
