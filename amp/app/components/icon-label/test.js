/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* eslint-disable newline-per-chained-call */
import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils'
import React from 'react'

import Icon from '../icon/'
import IconLabel from './index.jsx'

test('IconLabel renders without errors', () => {
    const wrapper = shallow(<IconLabel iconName="person" label="person" />)
    expect(wrapper.length).toBe(1)
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<IconLabel iconName="person" label="person" />)

    expect(wrapper.hasClass('a-icon-label')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<IconLabel iconName="person" label="person" />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<IconLabel className={name} iconName="person" label="person" />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('renders the icon and label with the correct values', () => {
    const wrapper = shallow(<IconLabel iconName="tester" iconSize="small" label="Label" />)

    expect(wrapper.find(Icon).prop('name')).toBe('tester')
    expect(wrapper.find(Icon).prop('size')).toBe('small')
    expect(wrapper.find('.a-icon-label__label').length).toBe(1)
    expect(wrapper.find('.a-icon-label__label').text()).toBe('Label')
})
