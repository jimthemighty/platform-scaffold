/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from '../../test-utils'
import {mount} from 'enzyme'
import React from 'react'

import ListTile from '../list-tile'

import NavItem from './index.jsx'

/* eslint-disable newline-per-chained-call */

test('NavItem renders without errors', () => {
    const wrapper = shallow(<NavItem />)

    expect(wrapper.length).toBe(1)
})

test('it renders a ListTile component', () => {
    const wrapper = shallow(<NavItem content="title" />)

    expect(wrapper.type()).toBe(ListTile)

    expect(wrapper.childAt(0).text()).toBe('title')
})

test('renders extra content correctly', () => {
    const overrideContent = (<span>override content</span>)
    const wrapper = mount(
        <NavItem beforeContent="before" content={overrideContent} />
    )
    const primaryWrapper = wrapper.find('.a-list-tile__primary')

    // Check the before content
    expect(primaryWrapper.childAt(0).type()).toBe('div')
    expect(primaryWrapper.childAt(0).text()).toBe('before')

    // Check the main content
    expect(primaryWrapper.find('.a-list-tile__content').children().length).toBe(1)
    expect(primaryWrapper.find('.a-list-tile__content').childAt(0).type()).toBe('span')
    expect(primaryWrapper.find('.a-list-tile__content').childAt(0).text()).toBe('override content')
})

test('renders a childIcon if hasChild is true', () => {
    const wrapper = mount(<NavItem hasChild childIcon=">>" />)

    expect(wrapper.hasClass('a--has-child')).toBe(true)

    const icon = wrapper.find('.a-list-tile__action')
    expect(icon.length).toBe(1)
    expect(icon.text()).toBe('>>')
})

test('does not render a childIcon if hasChild is false', () => {
    const wrapper = mount(<NavItem hasChild={false} childIcon=">>" />)
    const primaryWrapper = wrapper.find('.a-list-tile__primary')

    expect(wrapper.find('.a-list-tile').hasClass('a--has-child')).toBe(false)
    expect(primaryWrapper.children().length).toBe(1)
    expect(primaryWrapper.childAt(0).hasClass('a-list-tile__content')).toBe(true)
})

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<NavItem />)
    expect(wrapper.hasClass('a-nav-item')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<NavItem />)
    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    const name = 'name'
    const wrapper = shallow(<NavItem className={name} />)
    expect(wrapper.hasClass(name)).toBe(true)
})
