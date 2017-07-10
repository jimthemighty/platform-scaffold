/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getAccountInfo = createGetSelector(getUi, 'accountInfo', Immutable.Map())
export const getAccountFormInfo = createGetSelector(getAccountInfo, 'accountFormInfo', Immutable.Map())
