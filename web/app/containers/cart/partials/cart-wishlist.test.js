import React from 'react'
import CartWishlistModal from './cart-wishlist'
import {mount, shallow} from 'enzyme'

test('renders without errors', () => {
    const wrapper = mount(<CartWishlistModal />)

    expect(wrapper.length).toBe(1)
})

test('renders without errors with one item', () => {
    const wrapper = mount(<CartWishlistModal />)

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__wishlist-modal'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartWishlistModal />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})
