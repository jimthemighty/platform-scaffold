/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* eslint-disable newline-per-chained-call */
import {shallowHOC as shallow} from '../../test-utils'
import React from 'react'

import FieldRow from './index.jsx'

test('FieldRow renders without errors', () => {
    const wrapper = shallow(<FieldRow />)
    expect(wrapper.length).toBe(1)
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<FieldRow />)
    expect(wrapper.hasClass('a-field-row')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<FieldRow />)
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'test'
    const wrapper = shallow(<FieldRow className={name} />)
    expect(wrapper.hasClass(name)).toBe(true)
})
