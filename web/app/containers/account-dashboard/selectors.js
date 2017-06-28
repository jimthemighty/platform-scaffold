/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getAccount = createSelector(
    getUi,
    ({account}) => account
)

export const getDashboardInfo = createGetSelector(getAccount, 'dashboardInfo', Immutable.Map())

export const getTitle = createGetSelector(getDashboardInfo, 'title')

const PLACEHOLDER = {
    text: undefined,
    href: undefined
}

export const getLink = createGetSelector(getDashboardInfo, 'links', Immutable.List(new Array(7).fill(PLACEHOLDER)))
