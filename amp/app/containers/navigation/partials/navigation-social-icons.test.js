/* eslint-env jest */
import {shallowHOC as shallow} from 'mobify-amp-sdk/dist/test-utils'
import React from 'react'

import NavigationSocialIcons from './navigation-social-icons'

test('NavigationSocialIcons renders without errors', () => {
    const wrapper = shallow(<NavigationSocialIcons />)
    expect(wrapper.length).toBe(1)
})
