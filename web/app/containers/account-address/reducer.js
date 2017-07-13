/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from 'progressive-web-sdk/dist/utils/reducer-utils'
import * as accountAddressActions from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [accountAddressActions.receiveData]: mergePayload
}, initialState)
