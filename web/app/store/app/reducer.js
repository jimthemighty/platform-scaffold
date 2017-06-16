/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'

import * as appActions from './actions'

import {setCurrentURL, receiveCurrentProductId} from 'progressive-web-sdk/dist/integration-manager/results'
import {CURRENT_URL} from './constants'

export const initialState = fromJS({
    [CURRENT_URL]: window.location.href
})

export default handleActions({
    [setCurrentURL]: mergePayload,
    [receiveCurrentProductId]: mergePayload,
    [appActions.onRouteChanged]: mergePayload,
}, initialState)
