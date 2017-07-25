/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {getUi} from '../../store/selectors'
import {createGetSelector} from 'reselect-immutable-helpers'

export const getAccountAddress = createSelector(
    getUi,
    ({accountAddress}) => accountAddress
)

export const getAddressID = createGetSelector(getAccountAddress, 'addressID')

export const getIsEditing = createGetSelector(getAccountAddress, 'isEdit')
