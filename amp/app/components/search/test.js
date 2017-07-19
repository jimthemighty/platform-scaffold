/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils' // change to '../../test-utils' when move to SDK
import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'

// Components
import Search from './index.jsx'

test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<Search />)

    expect(wrapper.hasClass('a-search')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<Search />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('Search renders without errors', () => {
    const wrapper = mount(<Search lightboxId="id" />)
    expect(wrapper.length).toBe(1)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<Search className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('if isOverlay is true and lightboxId is required', () => {
    const lightboxIdString = 'lightbox'
    const wrapper = mount(<Search isOverlay lightboxId={lightboxIdString} />)

    expect(wrapper.prop('lightboxId')).toBe(lightboxIdString)
})

test('check for formProps to be working', () => {
    const get = 'GET'
    const target = '_top'
    const action = '#'

    const wrapper = mount(<Search formProps={{method: {get}, target: {target}, action: {action}}} />)
    const getFormProps = wrapper.props()
    const formPropsObject = getFormProps.formProps

    expect(formPropsObject.method.get).toBe(get)
    expect(formPropsObject.target.target).toBe(target)
    expect(formPropsObject.action.action).toBe(action)
})
