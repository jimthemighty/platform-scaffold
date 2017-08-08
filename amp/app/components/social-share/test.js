/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from '../../test-utils'
import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'

// Components
import SocialShare from './index.jsx'

test('SocialShare renders without errors', () => {
    const wrapper = mount(<SocialShare />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<SocialShare />)

    expect(wrapper.hasClass('c-social-share')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<SocialShare />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<SocialShare className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
