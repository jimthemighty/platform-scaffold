/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'

import * as appActions from './actions'

import {setCheckoutShippingURL, setCartURL, setCurrentURL, receiveCurrentProductId} from '../../integration-manager/results'
import {CURRENT_URL} from './constants'

export const initialState = fromJS({
    [CURRENT_URL]: window.location.href,
    sprite: '',
    hideApp: true
})

export default handleActions({
    [setCheckoutShippingURL]: mergePayload,
    [setCartURL]: mergePayload,
    [setCurrentURL]: mergePayload,
    [receiveCurrentProductId]: mergePayload,

    [appActions.onRouteChanged]: mergePayload,
    [appActions.updateSvgSprite]: mergePayload,
    [appActions.toggleHideApp]: mergePayload
}, initialState)
