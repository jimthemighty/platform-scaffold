/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import {receiveProductDetailsUIData} from '../../../web/app/integration-manager/products/results'

import {mergePayload} from '../../../web/app/utils/reducer-utils'

const reducer = handleActions({
    [receiveProductDetailsUIData]: mergePayload,
}, Immutable.Map())

export default reducer
