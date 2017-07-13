/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from '../../test-utils'
import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'

// Components
import Lightbox from './index.jsx'

test('Lightbox renders without errors', () => {
    const wrapper = mount(<Lightbox />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Lightbox />)

    expect(wrapper.hasClass('a-lightbox')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Lightbox />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Lightbox className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
