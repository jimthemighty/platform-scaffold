import {mount, shallow} from 'enzyme'
/* eslint-env jest */
import React from 'react'

import AmpImage from './index.jsx'

test('AmpImage renders without errors', () => {
    const wrapper = mount(<AmpImage />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<AmpImage />)

    expect(wrapper.hasClass('amp-image')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<AmpImage />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<AmpImage className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
