/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getAccountAddress = createSelector(
    getUi,
    ({accountAddress}) => accountAddress
)

export const getTitle = createGetSelector(getAccountAddress, 'title')
export const getDefaultAddress = createGetSelector(getAccountAddress, 'defaultAddress', Immutable.Map())
export const getAddresses = createGetSelector(getAccountAddress, 'addresses', Immutable.List())
