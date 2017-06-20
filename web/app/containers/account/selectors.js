/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {getAccountCustomContent} from '../../store/account/selectors'

export const getAccount = createSelector(
    getUi,
    ({account}) => account
)

export const getTitle = createGetSelector(getAccount, 'title')
export const getText = createGetSelector(getAccount, 'text', Immutable.List())

export const getUserName = createGetSelector(getAccountCustomContent, 'user')
