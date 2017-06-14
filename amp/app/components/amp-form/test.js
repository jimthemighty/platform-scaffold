import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'

import AmpForm from './index.jsx'

test('AmpForm renders without errors', () => {
    const wrapper = mount(<AmpForm />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = mount(<AmpForm />)
    expect(wrapper.hasClass('c-amp-form')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = mount(<AmpForm />)
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'name'
    const wrapper = mount(<AmpForm className={name} />)
    expect(wrapper.hasClass(name)).toBe(true)
})
