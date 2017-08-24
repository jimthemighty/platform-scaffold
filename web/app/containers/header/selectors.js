/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {getBrowsingHistory} from 'progressive-web-sdk/dist/store/app/selectors'
import {isStandaloneApp} from '../app/selectors'

export const getHeader = createSelector(getUi, ({header}) => header)

export const getIsCollapsed = createGetSelector(getHeader, 'isCollapsed')
export const getSearchIsOpen = createGetSelector(getHeader, 'searchIsOpen')
export const getSearchSuggestions = createGetSelector(getHeader, 'searchSuggestions')
export const showBackButton = createSelector(
    getBrowsingHistory,
    isStandaloneApp,
    (browsingHistory, isStandaloneApp) => {
        debugger
        debugger
        return isStandaloneApp
    })
