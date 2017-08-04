/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {calculateCartID, deleteCartID, makeApiRequest, getCartID, getUserType, storeCartID} from '../utils'
import {getCartItems} from 'progressive-web-sdk/dist/store/cart/selectors'
import {getProductById} from 'progressive-web-sdk/dist/store/products/selectors'
import {receiveCartProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {receiveCartContents, receiveCartItems} from 'progressive-web-sdk/dist/integration-manager/cart/results'
import {parseCartProducts, parseCartContents} from './parsers'

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



const productIsComplete = (product) => {
    if (product.id) {
        return true
    }
    return false
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
                // const updatedCartItem = complete with productState
                // updatedCartItems.push(updatedCartItem)
                return Promise.resolve()
            }
            const productIsNotCompleteAction = () => {
                return makeApiRequest(`/products/${productId}?fields=FULL`, {method: 'GET'})
                    .then((response) => response.json())
                    .then((json) => {
                        console.log('Received product', json)
                        // updatedProducts[productId] = parse received product
                        // const updatedCartItem = complete with received product
                        // updatedCartItems.push(updatedCartItem)
                    })
                    .catch(() => {
                        // do something
                    })
            }
            return productIsComplete(productState) ? productIsCompleteAction() : productIsNotCompleteAction()
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
