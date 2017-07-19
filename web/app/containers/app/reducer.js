/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'

import * as appActions from './actions'

import {setCheckoutShippingURL, setCartURL, setWishlistURL, setSignInURL, setAccountInfoURL, setAccountAddressURL} from 'progressive-web-sdk/dist/integration-manager/results'

export const initialState = fromJS({
    sprite: '',
    hideApp: true
})

export default handleActions({
    [setCheckoutShippingURL]: mergePayload,
    [setCartURL]: mergePayload,
    [setWishlistURL]: mergePayload,
    [setSignInURL]: mergePayload,
    [setAccountInfoURL]: mergePayload,
    [setAccountAddressURL]: mergePayload,
    [appActions.updateSvgSprite]: mergePayload,
    [appActions.toggleHideApp]: mergePayload
}, initialState)
