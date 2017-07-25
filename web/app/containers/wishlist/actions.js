/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {
    addToCartFromWishlist as addToCartFromWishlistCommand
} from 'progressive-web-sdk/dist/integration-manager/account/commands'

export const addToCartFromWishlist = (itemID, quantity) => (dispatch) => {
    return dispatch(addToCartFromWishlistCommand({itemID, quantity}))
}
