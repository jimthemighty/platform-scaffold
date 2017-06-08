import {mount, shallow} from 'enzyme'
/* eslint-env jest */
import React from 'react'

import Nav from './index.jsx'

test('Nav renders without errors', () => {
    const wrapper = mount(<Nav />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Nav />)

    expect(wrapper.hasClass('amp-nav')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Nav />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Nav className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
