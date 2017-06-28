/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from '../../test-utils'
import React from 'react'

import Link from '../link'
import Breadcrumbs from './index'

test('Breadcrumbs renders without errors', () => {
    const wrapper = shallow(<Breadcrumbs />)
    expect(wrapper.length).toBe(1)
})

test('creates an li for each item in items', () => {
    const items = [
        {
            text: 'Home',
            href: 'http://www.mobify.com'
        },
        {
            text: 'Cat',
            href: 'http://www.mobify.com'
        },
        {
            text: 'Food'
        }
    ]
    const wrapper = shallow(<Breadcrumbs items={items} />)
    const listElements = wrapper.find('li')

    expect(listElements.length).toBe(items.length)
})

test('renders a Link', () => {
    const items = [
        {
            text: 'Home',
            href: 'http://www.mobify.com'
        }
    ]
    const wrapper = shallow(<Breadcrumbs items={items} />)

    expect(wrapper.find(Link).length).toBe(1)
})

test('wraps breadcrumb item content in a link if the href prop is passed', () => {
    const items = [
        {
            text: 'Home',
            href: 'http://www.mobify.com'
        }
    ]
    const wrapper = shallow(<Breadcrumbs items={items} />)
    const link = wrapper.find(Link)

    expect(link.length).toBe(1)
})

test('does not wrap breadcrumb item content in a link if the href prop is not passed', () => {
    const items = [
        {
            text: 'Home'
        }
    ]
    const wrapper = shallow(<Breadcrumbs items={items} />)
    const link = wrapper.find(Link)

    expect(link.length).toBe(0)
})

test('aria label contains the correct location', () => {
    const items = [
        {
            text: 'Home',
            href: 'http://www.mobify.com'
        },
        {
            text: 'Cat',
            href: 'http://www.mobify.com'
        },
        {
            text: 'Food'
        }
    ]

    const wrapper = shallow(<Breadcrumbs items={items} />)
    const label = wrapper.find('.a-breadcrumbs__label')
    const lastItemRegex = new RegExp(items[items.length - 1])

    expect(lastItemRegex.test(label.text())).toBe(true)
})

test('aria label contains the correct youAreHereMessage', () => {
    const items = [
        {
            text: 'Home'
        }
    ]
    const youAreHereMessage = 'You are at this location'
    const wrapper = shallow(<Breadcrumbs items={items} youAreHereMessage={youAreHereMessage} />)
    const label = wrapper.find('.a-breadcrumbs__label')
    const youAreHereMessageRegex = new RegExp(youAreHereMessage)

    expect(youAreHereMessageRegex.test(label.text())).toBe(true)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Breadcrumbs items={[{text: 'test'}]} />)

    expect(wrapper.hasClass('a-breadcrumbs')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Breadcrumbs items={[{text: 'test'}]} />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Breadcrumbs items={[{text: 'test'}]} className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})
