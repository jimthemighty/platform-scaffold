/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload, mergeSkipLists} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {setLoggedIn, receiveUserCustomContent} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveAccountInfoData, receiveWishlistData, removeWishlistItem} from 'progressive-web-sdk/dist/integration-manager/account/results'

const initialState = Immutable.Map()

const userReducer = handleActions({
    [setLoggedIn]: mergePayload,
    [receiveUserCustomContent]: mergePayload,
    [receiveAccountInfoData]: mergePayload,
    [receiveWishlistData]: (state, {payload}) => state.mergeWith(mergeSkipLists, payload),
    [removeWishlistItem]: (state, {payload: {removeItemId}}) => {
        const wishlistProductsPath = ['wishlist', 'products']
        return state.setIn(
            wishlistProductsPath,
            state.getIn(wishlistProductsPath).filter(
                (item) => item.get('productId') !== removeItemId)
            )
    }
}, initialState)

export default userReducer
