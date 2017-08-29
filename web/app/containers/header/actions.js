/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */


import {createAction, createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'
import {getSearchSuggestions, searchProducts} from 'progressive-web-sdk/dist/integration-manager/app/commands'
import {EVENT_ACTION} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

export const pushHistoryItem = createAction('Added item to history stack')

export const popHistoryItem = createAction('Removed item from history stack')

export const setIsHistoryPage = createAction('Navigated to page from history', ['isHistoryPage'])

const searchAnalytics = createActionWithAnalytics(
    'Send search analytics', [],
    EVENT_ACTION.search,
    (query) => ({query})
)

export const toggleHeader = createAction('Toggled the header', ['isCollapsed'])

export const openSearch = createAction('Open header search')
export const closeSearch = createAction('Close header search')
export const clearSuggestions = createAction('Clear search suggestion')

export const searchQueryChanged = (query) => (dispatch) => (
    dispatch(getSearchSuggestions(query))
)

export const searchSubmit = (query) => (dispatch) => {
    dispatch(searchAnalytics(query))
    dispatch(searchProducts(query))
}

export const goBack = () => (dispatch) => {
    dispatch(popHistoryItem())
    dispatch(setIsHistoryPage(true))
    return browserHistory.goBack()
}
