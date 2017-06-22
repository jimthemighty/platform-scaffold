/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

let connector = {}

export const register = (commands) => {
    connector = commands
}

/**
 * Suggests products as the user types their search query
 * @function
 * @param {String} args Query string of what the user is typing
 */
export const getSearchSuggestions = (...args) => connector.getSearchSuggestions(...args)

/**
 * Submits a search for products
 * @function
 * @param {String} searchQuery product's ID
 */

export const searchProducts = (searchQuery) => connector.searchProducts(searchQuery)

/**
 * Initializes the connector during app startup. This command dispatched
 * be called before any other integration manager commands are.
 * @function
 */
export const initApp = () => connector.initApp()
