/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction as createReduxAction} from 'redux-actions'

/**
 * Wraps an action creator function so that the React synthetic action
 * is not passed in. This is necessary to avoid spurious warnings from
 * the React code.
 * @param {function} fn - an action creator function
 * @returns {function} - the wrapped action creator
 */
export const stripEvent = (fn) =>
/* istanbul ignore next */
    () => fn()

/**
 * Returns a path given a `location` object.
 * @param {object} location - a location object from React Router
 * @returns {string} - the `path` and `search` concatenated together
 */
export const getPath = ({pathname, search}) => pathname + search

/**
 * Returns a full URL given a `location` object.
 * @param {object} location - a location object from React Router
 * @returns {string} - the full URL for the given location
 */
export const getURL = (location) =>
    window.location.origin + getPath(location)

/**
 * Returns query string given an object of parameters
 * @param {object} params - contains list of keys and values
 * @returns {string} - url query string
 */
export const makeQueryString = (params) => {
    if (typeof params === 'undefined' || typeof params !== 'object') {
        return ''
    }

    let query = '?'
    let index = 0

    for (const key in params) {
        if (params[key]) {
            index++
            const param = key
            const value = params[key]
            if (index === 1) {
                query += `${param}=${value}`
            } else {
                query += `&${param}=${value}`
            }
        }
    }
    if (query.length <= 1) {
        return ''
    }
    return query
}


// Regex courtesy of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
export const getCookieValue = (cookieName) => {
    const result = document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1')
    return result
}

export const splitFullName = (fullname) => {
    let names = fullname.trim().split(' ')

    // filter out any empty strings
    names = names.filter((name) => name)

    return {
        firstname: names.slice(0, 1).join(' '),
        lastname: names.slice(1).join(' ')
    }
}

/**
 * Currently requestIdleCallback is only supported in Chrome,
 * TODO: We'll have to provide a fallback for iOS Safari
 * https://developers.google.com/web/updates/2015/08/using-requestidlecallback
 * http://caniuse.com/#feat=requestidlecallback
 */
export const requestIdleCallback = (fn) => {
    if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(fn)
    } else {
        return setTimeout(() => fn(), 1)
    }
}

export const typecheck = (type, value) => {
    try {
        type.check(value)
    } catch (e) {
        console.error('Type check failed: ', e, '\n\nValue: ', value)
    }
    return value
}

/**
 * Create an action creator that typechecks its argument.
 *
 * The action creator argument is passed unchanged as the payload if
 * no key is passed, while if a key is provided the action creator
 * argument is wrapped in an object under that key. This allows the
 * action to set a specific key within the Redux store using mergePayload.
 *
 * @param description {string} The description of the action (seen in dev tools)
 * @param type {Runtype} The type to check the action argument against
 * @param key {string} (optional) The key in the store to set with the payload
 * @returns {function} The action creator.
 */
export const createTypedAction = (description, type, key) => createReduxAction(
    description,
    key
        ? (payload) => { return {[key]: typecheck(type, payload)} }
        : (payload) => typecheck(type, payload)
)

export const buildQueryString = (query) => {
    return `?q=${query.replace(/ /g, '+')}`
}

export const isStandalone = () => {
    return /homescreen=1/.test(window.location.href) || window.matchMedia('(display-mode: standalone)').matches
}

// Converts a string into title case
// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
export const stringToTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
