/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {receiveCartContents, receiveCartCustomContent, receiveCartTotals} from '../../integration-manager/cart/results'
import {mergeSkipLists, mergePayload} from '../../utils/reducer-utils'

const cartReducer = handleActions({
    [receiveCartContents]: (state, {payload}) => state.mergeWith(mergeSkipLists, payload),
    [receiveCartCustomContent]: mergePayload,
    [receiveCartTotals]: mergePayload
}, Immutable.Map())

export default cartReducer
