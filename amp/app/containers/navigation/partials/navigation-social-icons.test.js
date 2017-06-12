/* eslint-env jest */
import {mount} from 'enzyme'
import React from 'react'

import NavigationSocialIcons from './navigation-social-icons'

test('NavigationSocialIcons renders without errors', () => {
    const wrapper = mount(<NavigationSocialIcons />)
    expect(wrapper.length).toBe(1)
})
