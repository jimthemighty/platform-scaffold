/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'

import * as appActions from './actions'

import {setCheckoutShippingURL, setCartURL, setCurrentURL, setURL} from '../../integration-manager/results'
import {CURRENT_URL} from './constants'

export const initialState = fromJS({
    [CURRENT_URL]: window.location.href,
    sprite: '',
    hideApp: true,
    urls: {}
})

export default handleActions({
    [setCheckoutShippingURL]: mergePayload,
    [setCartURL]: mergePayload,
    [setCurrentURL]: mergePayload,
    [setURL]: (state, {payload: {name, url}}) => {
        return state.setIn(['urls', name], url)
    },

    [appActions.onRouteChanged]: mergePayload,
    [appActions.updateSvgSprite]: mergePayload,
    [appActions.toggleHideApp]: mergePayload
}, initialState)
