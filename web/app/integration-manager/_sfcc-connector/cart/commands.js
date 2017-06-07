/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeApiRequest, makeApiJsonRequest, getAuthTokenPayload} from '../utils'
import {populateLocationsData} from '../checkout/utils'
import {requestCartData, createBasket, handleCartData, createNewBasket} from './utils'

export const getCart = () => (dispatch) =>
    requestCartData().then((basket) => dispatch(handleCartData(basket)))


const isCartExpired = ({fault}) => {
    if (fault) {
        if (fault.type === 'InvalidCustomerException') {
            return true
        }
        throw new Error(fault.message)
    }
    return false
}

const addToCartRequest = (productId, quantity, basketId) => {
    const requestBody = [{
        product_id: productId,
        quantity
    }]
    // Use makeApiRequest here instead of makeAPIJsonRequest so we can deal with errors ourselves
    return makeApiRequest(`/baskets/${basketId}/items`, {method: 'POST', body: JSON.stringify(requestBody)})
        .then((response) => response.json())
}

export const addToCart = (productId, quantity) => (dispatch) => (
    createBasket()
        .then((basket) => addToCartRequest(productId, quantity, basket.basket_id))
        .then((basket) => {
            const cartExpired = isCartExpired(basket)

            if (cartExpired) {
                // the basket has expired create a new one and try adding to cart again
                return dispatch(createNewBasket())
                    .then((basket) => addToCartRequest(productId, quantity, basket.basket_id))
            }
            return basket
        })
        .then((basket) => dispatch(handleCartData(basket)))
        .catch(() => { throw new Error('Unable to add item to cart') })
)

const createNewBasketWithError = () => (dispatch) => {
    return dispatch(createNewBasket())
        .then((basket) => dispatch(handleCartData(basket)))
        .then(() => { throw new Error('Your cart has expired.') })
}

export const removeFromCart = (itemId) => (dispatch) => (
    createBasket()
        .then((basket) => makeApiRequest(`/baskets/${basket.basket_id}/items/${itemId}`, {method: 'DELETE'}))
        .then((response) => {
            return response.json()
        })
        .then((basket) => {
            const cartExpired = isCartExpired(basket)

            if (cartExpired) {
                return dispatch(createNewBasketWithError())
            }
            return basket
        })
        .then((basket) => dispatch(handleCartData(basket)))
)

export const updateItemQuantity = (itemId, quantity) => (dispatch) => (
    createBasket()
        .then((basket) => makeApiRequest(`/baskets/${basket.basket_id}/items/${itemId}`, {method: 'PATCH', body: JSON.stringify({quantity})}))
        .then((response) => response.json())
        .then((basket) => {
            const cartExpired = isCartExpired(basket)

            if (cartExpired) {
                return dispatch(createNewBasketWithError())
            }
            return basket
        })
        .then((basket) => dispatch(handleCartData(basket)))
)

export const initCartPage = () => (dispatch) => Promise.resolve(dispatch(populateLocationsData()))

const NEW_WISHILIST_PAYLOAD = {
    type: 'wish_list',
    name: 'Saved for Later'
}

export const addToWishlist = (productId) => (dispatch) => {
    const {sub} = getAuthTokenPayload()
    const customerID = JSON.parse(sub).customer_info.customer_id

    return makeApiRequest(`/customers/${customerID}/product_lists`, {method: 'GET'})
        .then((response) => response.json())
        .then(({count, data}) => {
            if (count) {
                return data[0]
            }
            // create a list if one doesn't exist
            return makeApiJsonRequest(
                `/customers/${customerID}/product_lists`,
                NEW_WISHILIST_PAYLOAD,
                {method: 'POST'}
            )
        })
        .then(({id}) => {
            const requestBody = {
                type: 'product',
                product_id: productId,
                quantity: 1
            }

            return makeApiJsonRequest(
                `/customers/${customerID}/product_lists/${id}/items`,
                requestBody,
                {method: 'POST'}
            )
        })
        .catch(() => { throw new Error('Unable to add item to wishlist.') })
}

export const fetchTaxEstimate = () => Promise.reject('Method not implemented')
