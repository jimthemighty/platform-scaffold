/* eslint-env jest */
import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils'
import React from 'react'

import Form from './index.jsx'

test('Form renders without errors', () => {
    const wrapper = shallow(<Form />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Form />)
    expect(wrapper.hasClass('a-form')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Form />)
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'name'
    const wrapper = shallow(<Form className={name} />)
    expect(wrapper.hasClass(name)).toBe(true)
})
