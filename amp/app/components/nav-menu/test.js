/* eslint-env jest */
/* eslint-disable newline-per-chained-call */
import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils'
import React from 'react'

import Nav from './index.jsx'

test('Nav renders without errors', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper.length).toBe(1)
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper.hasClass('a-nav-menu')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'test'
    const wrapper = shallow(<Nav className={name} />)
    expect(wrapper.hasClass(name)).toBe(true)
})
