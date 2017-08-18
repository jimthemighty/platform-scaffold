/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {calculateCartID, deleteCartID, makeApiRequest, getCartID, getUserType, storeCartID} from '../utils'
import {getCartItems} from 'progressive-web-sdk/dist/store/cart/selectors'
import {getProductById} from 'progressive-web-sdk/dist/store/products/selectors'
import {receiveCartProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {receiveCartContents, receiveCartItems, receiveCartTotals} from 'progressive-web-sdk/dist/integration-manager/cart/results'
import {getProductEndPoint} from '../config'
import {parseCartProducts, parseCartContents} from './parsers'
import {parseProductDetails} from '../parsers'

const makeCartRequest = () => {
    return makeApiRequest(`/users/${getUserType()}/carts/${getCartID()}?fields=FULL`, {method: 'GET'})
        .then((response) => {
            if (response.status === 404) {
                deleteCartID()
                throw new Error('Cart not found')
            }
            return response
        })
        .then((response) => response.json())
}

export const createCart = () => {
    let body
    // if there's an previous cart on session, we merge it
    if (getCartID()) {
        body = {oldCartId: getCartID()}
    }
    return makeApiRequest(`/users/${getUserType()}/carts`, {method: 'POST'}, body)
        .then((response) => response.json())
        .then((cart) => {
            storeCartID(calculateCartID(cart))
            return makeCartRequest()
        })
}

export const mergeCart = (toMergeCartGuid, oldCartId) => {
    const body = {
        toMergeCartGuid,
        oldCartId
    }
    return makeApiRequest(`/users/${getUserType()}/carts`, {method: 'POST'}, body)
        .then((response) => response.json())
        .then((cart) => {
            storeCartID(calculateCartID(cart))
            return makeCartRequest()
        })
}

export const fetchCartItemData = () => (dispatch, getState) => {
    const currentState = getState()
    const items = getCartItems(currentState).toJS()
    const updatedProducts = {}
    const updatedCartItems = []
    return Promise.all(
        items.map((cartItem) => {
            const productId = cartItem.productId
            const productState = getProductById(productId)(currentState).toJS()
            const productIsCompleteAction = () => {
                updatedProducts[productId] = productState
                updatedCartItems.push({
                    ...cartItem,
                    thumbnail: productState.thumbnail,
                    title: productState.title
                })
                return Promise.resolve()
            }
            const productIsNotCompleteAction = () => {
                const productEndpoint = getProductEndPoint(productId)
                return makeApiRequest(productEndpoint, {method: 'GET'})
                    .then((response) => {
                        if (response.status === 400) {
                            throw new Error(response.statusText)
                        } else {
                            return response.json()
                        }
                    })
                    .then((json) => {
                        const parsedProduct = {...parseProductDetails(json, true)}
                        updatedProducts[productId] = parsedProduct
                        updatedCartItems.push({
                            ...cartItem,
                            thumbnail: parsedProduct.thumbnail,
                            title: parsedProduct.title
                        })
                    })
                    .catch((err) => {
                        console.log('Error retrieving product', err)
                        throw new Error(`Unable to find product with ID ${productId}`)
                    })
            }
            return productState.full ? productIsCompleteAction() : productIsNotCompleteAction()
        })
    )
    .then(() => {
        dispatch(receiveCartProductData(updatedProducts))
        dispatch(receiveCartItems(updatedCartItems))
    })
}

const requestCartData = () =>
    makeCartRequest()
        .catch(() => createCart())


export const getCart = () => {
    return getCartID() ? requestCartData() : createCart()
}

export const handleCartData = (cart) => (dispatch) => {
    // Note: These need to be dispatched in this order, otherwise there's
    //       a chance we could try to render cart items and not have product
    //       data in the store for it.
    dispatch(receiveCartProductData(parseCartProducts(cart)))
    dispatch(receiveCartContents(parseCartContents(cart)))

    return dispatch(fetchCartItemData())
}

export const getCartTotals = () => (dispatch) => {
    return getCart()
        .then((cart) => {
            const shipping = {amount: ''}
            let discount = {amount: '', code: '', label: ''}
            const {
                appliedVouchers = [],
                subTotal: {formattedValue: subtotal = ''} = {},
                orderDiscounts: {formattedValue: orderDiscount = ''} = {},
                totalPriceWithTax: {formattedValue: orderTotal = ''} = {},
                totalTax: {formattedValue: taxes = ''} = {}} = cart
            if (appliedVouchers.length) {
                const appliedVoucher = appliedVouchers[0]
                discount = {
                    label: appliedVoucher.voucherCode,
                    code: appliedVoucher.code,
                    amount: orderDiscount
                }
            }
            return dispatch(receiveCartTotals(shipping, discount, subtotal, taxes, orderTotal))
        })
}
