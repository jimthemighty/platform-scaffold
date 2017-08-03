/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload, mergeSkipLists} from 'progressive-web-sdk/dist/utils/reducer-utils'
import {setLoggedIn, receiveUserCustomContent} from 'progressive-web-sdk/dist/integration-manager/results'
import {
    receiveAccountOrderListData,
    receiveAccountInfoData,
    receiveAccountAddressData,
    receiveWishlistData
} from 'progressive-web-sdk/dist/integration-manager/account/results'

const initialState = Immutable.Map()

const userReducer = handleActions({
    [setLoggedIn]: mergePayload,
    [receiveUserCustomContent]: mergePayload,
    [receiveAccountAddressData]: (state, {payload}) => state.mergeWith(mergeSkipLists, payload),
    [receiveAccountInfoData]: mergePayload,
    [receiveWishlistData]: mergePayload,
    [receiveAccountOrderListData]: mergePayload
}, initialState)

export default userReducer
