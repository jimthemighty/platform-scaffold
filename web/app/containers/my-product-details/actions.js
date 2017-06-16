/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {addToCart} from '../../integration-manager/cart/commands'
import {getCurrentProductId} from '../../store/products/selectors'

export const receiveData = createAction('Receive MyProductDetails data')

const submitCartFormSelector = createPropsSelector({
    productId: getCurrentProductId,
})
export const addProductToCart = () => (dispatch, getStore) => {
    const {productId} = submitCartFormSelector(getStore())
    console.log(`Adding ${productId} to cart`)
    return dispatch(addToCart(productId, 1))
        .then(() => {
            console.log('successfully added to cart')
        })
        .catch((error) => {
            console.error('Error adding to cart', error)
        })
}
