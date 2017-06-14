/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {receiveSearchSuggestions} from '../results'
import {buildQueryString} from '../../utils/utils'
import {parseSearchSuggestions} from './parsers'
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {QUERY_URL, SUGGESTION_URL} from './config'
import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'
import * as categoriesCommands from './categories/commands'
import * as cartCommands from './cart/commands'
import * as appCommands from './app/commands'
import * as checkoutCommands from './checkout/commands'
import * as accountCommands from './account/commands'


export const submitNewsletter = (formData) => {
    return makeFormEncodedRequest('/newsletter/subscriber/new/', formData, {method: 'POST'})
}

export const getSearchSuggestions = (query) => (dispatch) => {
    // Mimic desktop behaviour, only make request search when query is 2 characters or more.
    // Empty list if less than 2 characters
    if (query.length < 2) {
        return dispatch(receiveSearchSuggestions(null))
    }

    const queryURL = `${QUERY_URL}${buildQueryString(query)}&_=${Date.now()}`
    return makeRequest(queryURL)
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveSearchSuggestions(parseSearchSuggestions(responseJSON))))
}

export const submitSearch = (query) => (dispatch) => {
    browserHistory.push({pathname: `${SUGGESTION_URL}${buildQueryString(query)}`})
}

export default {
    checkout: checkoutCommands,
    home: homeCommands,
    products: productsCommands,
    categories: categoriesCommands,
    cart: cartCommands,
    app: appCommands,
    account: accountCommands,
    submitNewsletter,
    getSearchSuggestions,
    submitSearch
}
