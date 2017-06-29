/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {getUserCustomContent} from '../../store/user/selectors'

export const getAccount = createSelector(
    getUi,
    ({account}) => account
)

export const getFirstName = createGetSelector(getUserCustomContent, 'firstName')
export const getLastName = createGetSelector(getUserCustomContent, 'lastName')
export const getUserName = createGetSelector(getUserCustomContent, 'user')
