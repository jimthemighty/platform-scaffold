/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import {mergePayload} from '../../utils/reducer-utils'
import * as myProductDetailsActions from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [myProductDetailsActions.receiveData]: mergePayload,
    [myProductDetailsActions.changeTitle]: mergePayload
}, initialState)
