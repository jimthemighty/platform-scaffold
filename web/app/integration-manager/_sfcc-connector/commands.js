/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as homeCommands from './home/commands'
import * as productsCommands from './products/commands'
import * as categoriesCommands from './categories/commands'
import * as cartCommands from './cart/commands'
import * as appCommands from './app/commands'
import * as checkoutCommands from './checkout/commands'
import * as accountCommands from './account/commands'

import {makeApiRequest} from './utils'
import {receiveSearchSuggestions} from '../results'
import {receiveSearchResults} from '../categories/results'
import {parseSearchSuggestions, parseSearchResults} from './parsers'

export const getSearchSuggestions = (query) => (dispatch) => {
    // SFCC API requires min length of 3
    if (query.length < 3) {
        return dispatch(receiveSearchSuggestions(null))
    }
    const queryURL = `/search_suggestion?q=${query}`
    return makeApiRequest(queryURL)
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveSearchSuggestions(parseSearchSuggestions(responseJSON))))
}

export const submitSearch = (query) => (dispatch) => {
    const searchUrl = `/product_search?q=${query}&expand=availability,images,prices`
    return makeApiRequest(searchUrl)
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveSearchResults(parseSearchResults(responseJSON))))
}

export default {
    home: homeCommands,
    products: productsCommands,
    categories: categoriesCommands,
    cart: cartCommands,
    app: appCommands,
    checkout: checkoutCommands,
    account: accountCommands,
    getSearchSuggestions,
    submitSearch
}
