/* eslint-env jest */
import {shallowHOC as shallow} from '../../test-utils'
import {mount} from 'enzyme'
import React from 'react'

import AmpLightbox from './index.jsx'

describe('AmpLightbox', () => {

    test('renders without errors', () => {
        expect(shallow(<AmpLightbox />).length).toBe(1)
    })

    test('renders css classes properly', () => {
        expect(mount(<AmpLightbox />).hasClass('c-amp-lightbox')).toBe(true)
        expect(mount(<AmpLightbox />).hasClass('undefined')).toBe(false)
        expect(mount(<AmpLightbox className={'foo'} />).hasClass('foo')).toBe(true)
    })
})

