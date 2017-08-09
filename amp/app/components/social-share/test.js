/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils' // change to `import {shallowHOC as shallow} from '../../test-utils'` when move to SDK
import {mount} from 'enzyme'
/* eslint-env jest */
import React from 'react'
import {appIdPropType} from './social-share-item'

// Components
import SocialShare from './index.js'

test('SocialShare renders without errors', () => {
    const wrapper = mount(<SocialShare />)
    expect(wrapper.length).toBe(1)
})

/* eslint-disable newline-per-chained-call */
test('includes the component class name with no className prop', () => {
    const wrapper = shallow(<SocialShare />)

    expect(wrapper.hasClass('a-social-share')).toBe(true)
})

test('does not render an \'undefined\' class with no className', () => {
    const wrapper = shallow(<SocialShare />)

    expect(wrapper.hasClass('undefined')).toBe(false)
})

test('renders the contents of the className prop if present', () => {
    [
        'test',
        'test another'
    ].forEach((name) => {
        const wrapper = shallow(<SocialShare className={name} />)

        expect(wrapper.hasClass(name)).toBe(true)
    })
})

test('check if return the isBlock class correcty', () => {
    const wrapper = shallow(<SocialShare isBlock />)

    expect(wrapper.hasClass('a--block')).toBe(true)
})

test('check if return the isInline class correcty', () => {
    const wrapper = shallow(<SocialShare isInline />)

    expect(wrapper.hasClass('a--inline')).toBe(true)
})

test('check if the options passing to the social share component', () => {
    const twitter = 'twitter'
    const twitterURL = 'someURL'
    const twitterText = 'some text here'
    const options = [
        {type: twitter, url: twitterURL, text: twitterText},
        {type: 'facebook', url: 'someURLhere', text: 'some text here', isInline: true, appId: 'foo'}
    ]

    const wrapper = shallow(<SocialShare options={options} />)
    const items = wrapper.children()
    const twitterItem = wrapper.children().first()

    expect(items.length).toBe(2)
    expect(twitterItem.prop('type')).toBe(twitter)
    expect(twitterItem.prop('url')).toBe(twitterURL)
    expect(twitterItem.prop('text')).toBe(twitterText)
})

//
test('only includes isInline class when both isInline and isBlock are present', () => {
    const wrapper = shallow(<SocialShare isInline isBlock />)
    expect(wrapper.hasClass('a--inline')).toBe(true)
    expect(wrapper.hasClass('a--block')).toBe(false)
})

test('check if socialItemClass is included when passing options', () => {
    const twitter = 'twitter'
    const socialItemClass = 'test'
    const options = [
        {type: twitter, socialItemClass},
    ]

    const wrapper = mount(<SocialShare options={options} />)
    expect(wrapper.find('SocialShareItem').prop('socialItemClass')).toBe('test')
})

test('check if text class is included when passing option with text', () => {
    const twitter = 'twitter'
    const options = [
        {type: twitter, text: 'testing twitter'},
    ]

    const wrapper = mount(<SocialShare options={options} />)
    expect(wrapper.find('.a-social-share__text').length).toBe(1)
})

test('fails propType validation id appId is not passed for facebook', () => {
    expect(
        appIdPropType({type: 'facebook'})
    ).toEqual(new Error('appId is required for facebook'))
})
