/* eslint-disable newline-per-chained-call, max-nested-callbacks */
import {shallowHOC as shallow} from '../../test-utils'
import React from 'react'

import Carousel from './index'

describe('Carousel', () => {
    test('renders without errors', () => {
        const wrapper = shallow(<Carousel id="id" height="10" />)
        expect(wrapper.length).toBe(1)
    })

    test('includes the component class name with no className prop', () => {
        const wrapper = shallow(<Carousel id="id" height="10" />)
        expect(wrapper.hasClass('amp-carousel')).toBe(true)
    })

    test('does not render an \'undefined\' class with no className', () => {
        const wrapper = shallow(<Carousel id="id" height="10" />)
        expect(wrapper.hasClass('undefined')).toBe(false)
    })

    test('renders the contents of the className prop if present', () => {
        const name = 'test'
        const wrapper = shallow(<Carousel id="id" height="10" className={name} />)
        expect(wrapper.hasClass(name)).toBe(true)
    })
})
