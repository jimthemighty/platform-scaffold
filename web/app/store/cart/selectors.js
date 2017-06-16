/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getCart} from '../selectors'
import {getProducts} from 'progressive-web-sdk/dist/store/products/selectors'

export const getCartCustomContent = createGetSelector(getCart, 'custom')

export const getCartLoaded = createSelector(getCart, (cart) => {
    return cart.get('items') !== undefined
})

const getCartItemsPrivate = createGetSelector(getCart, 'items', Immutable.List())
export const getCartItems = createSelector(
    getCartItemsPrivate,
    getProducts,
    (items, products) => items.map((item) => {
        const productId = item.get('productId')
        return item.set('product', products.find((product) => productId === product.get('id')))
    })
)

export const getCartHasItems = createSelector(
    getCartItems,
    (items) => items.size > 0
)

export const getCartSummaryCount = createSelector(
    getCartItems,
    (items) => items.reduce((quantity, cartItem) => quantity + cartItem.get('quantity'), 0)
)

export const getSubtotal = createGetSelector(getCart, 'subtotal')
export const getOrderTotal = createGetSelector(getCart, 'orderTotal')
export const getTax = createGetSelector(getCart, 'tax')

export const getDiscount = createGetSelector(getCart, 'discount', Immutable.Map())
export const getDiscountAmount = createGetSelector(getDiscount, 'amount')
export const getDiscountLabel = createGetSelector(getDiscount, 'label')
export const getDiscountCode = createGetSelector(getDiscount, 'code')

export const getShipping = createGetSelector(getCart, 'shipping', Immutable.Map())
export const getShippingAmount = createGetSelector(getShipping, 'amount')
export const getShippingLabel = createGetSelector(getShipping, 'label')
