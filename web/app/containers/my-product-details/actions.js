/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {addToCart} from 'progressive-web-sdk/dist/integration-manager/cart/commands'
import {getCurrentProductId} from 'progressive-web-sdk/dist/store/products/selectors'

export const receiveData = createAction('Receive MyProductDetails data')

export const addProductToCart = () => (dispatch, getStore) => {
    const productId = getCurrentProductId(getStore())
    console.log(`Adding ${productId} to cart`)
    return dispatch(addToCart(productId, 1))
        .then(() => {
            console.log('successfully added to cart')
        })
        .catch((error) => {
            console.error('Error adding to cart', error)
        })
}
