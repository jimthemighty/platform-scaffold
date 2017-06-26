/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {getAccountCustomContent} from '../../store/account/selectors'

export const getAccount = createSelector(
    getUi,
    ({account}) => account
)

export const getFirstName = createGetSelector(getAccountCustomContent, 'firstName')
export const getLastName = createGetSelector(getAccountCustomContent, 'lastName')
export const getUserName = createGetSelector(getAccountCustomContent, 'user')
