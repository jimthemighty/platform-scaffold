/* eslint-env jest */
import {shallowHOC as shallow} from '../../test-utils'
import React from 'react'

import AmpForm from './index.jsx'

test('AmpForm renders without errors', () => {
    const wrapper = shallow(<AmpForm />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<AmpForm />)
    expect(wrapper.hasClass('a-form')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<AmpForm />)
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'name'
    const wrapper = shallow(<AmpForm className={name} />)
    expect(wrapper.hasClass(name)).toBe(true)
})
