import {mount, shallow} from 'enzyme'
/* eslint-env jest */
import React from 'react'

import NavItem from './index.jsx'

test('NavItem renders without errors', () => {
    const wrapper = mount(<NavItem />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<NavItem />)

    expect(wrapper.hasClass('c-nav-item')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<NavItem />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<NavItem className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
