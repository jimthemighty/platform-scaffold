/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {getCartID, getUserType, makeApiRequest} from '../utils'
import {getCart as getCartUtility, handleCartData} from './utils'

export const initCartPage = (url, routeName) => (dispatch) => {
    console.log('[Hybris Connector] Called initCartPage stub with arguments:', url, routeName)
    return Promise.resolve()
}

export const getCart = () => (dispatch) =>
    getCartUtility().then((cart) => dispatch(handleCartData(cart)))

export const addToCart = (code, qty) => (dispatch) => {
    return getCartUtility()
        .then((cart) => makeApiRequest(`/users/${getUserType()}/carts/${getCartID()}/entries`, {method: 'POST'}, {code, qty}))
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Unable to add item to cart')
            } else {
                return response.json()
            }
        })
        .then((responseJSON) => {
            const {quantityAdded, statusCode} = responseJSON
            if (quantityAdded === 0) {
                throw new Error(`Unable to add item to cart due to ${statusCode}`)
            }
        })
        .then(() => getCartUtility())
        .then((cart) => dispatch(handleCartData(cart)))
        .catch((err) => {
            console.log('Error adding product to cart', err)
            throw new Error('Unable to add item to cart')
        })
}

export const removeFromCart = (entryNumber) => (dispatch) => (
    makeApiRequest(`/users/${getUserType()}/carts/${getCartID()}/entries/${entryNumber}`, {method: 'DELETE'})
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Unable to delete item from cart')
            }
        })
        .then(() => getCartUtility())
        .then((cart) => dispatch(handleCartData(cart)))
        .catch((err) => {
            console.log('Error removing product from cart', err)
            throw new Error('Unable to delete item from cart')
        })
)

export const updateItemQuantity = (entryNumber, qty) => (dispatch) => (
    makeApiRequest(`/users/${getUserType()}/carts/${getCartID()}/entries/${entryNumber}`, {method: 'PUT'}, {qty})
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Unable to update item quantity')
            } else {
                return response.json()
            }
        })
        .then((responseJSON) => {
            const {quantityAdded, statusCode} = responseJSON
            if (quantityAdded === 0) {
                throw new Error(`Unable to update item quantity due to ${statusCode}`)
            }
        })
        .then(() => getCartUtility())
        .then((cart) => dispatch(handleCartData(cart)))
        .catch((err) => {
            console.log('Error updating cart item quantity', err)
            throw new Error('Unable to update item quantity')
        })
)

export const fetchTaxEstimate = (address, shippingMethod) => (dispatch) => {
    console.log('[Hybris Connector] Called fetchTaxEstimate stub with arguments:', address, shippingMethod)
    return Promise.resolve()
}

export const putPromoCode = (couponCode) => (dispatch) => {
    console.log('[Hybris Connector] Called putPromoCode stub with arguments:', couponCode)
    return Promise.resolve()
}

export const deletePromoCode = (couponCode) => (dispatch) => {
    console.log('[Hybris Connector] Called deletePromoCode stub with arguments:', couponCode)
    return Promise.resolve()
}
