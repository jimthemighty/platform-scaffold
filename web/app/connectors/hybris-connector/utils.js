/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {isSessionStorageAvailable} from 'progressive-web-sdk/dist/utils/utils'

import {getApiEndPoint, getAuthEndPoint, getRequestHeaders} from './config'

const AUTH_KEY_NAME = 'mob-auth'
const EXPIRES_KEY_NAME = 'mob-expires'
const CART_KEY_NAME = 'mob-cart'
const USER_KEY_NAME = 'mob-user'
export const USER_REGISTERED = 'current'
export const USER_GUEST = 'anonymous'

const setCookieValue = (keyName, value) => {
    document.cookie = `${keyName}=${value}`
}

const getCookieValue = (keyName) => {
    const cookieRegex = new RegExp(`${keyName}=([^;]+);`)
    const cookieMatch = cookieRegex.exec(document.cookie)

    return cookieMatch ? cookieMatch[1] : ''
}

const removeCookieValue = (keyName) => {
    document.cookie = `${keyName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

const setItemInBrowserStorage = (keyName, value) => {
    // Use session storage if it's supported
    if (isSessionStorageAvailable()) {
        window.sessionStorage.setItem(keyName, value)
    } else {
        // Use Cookies otherwise
        setCookieValue(keyName, value)
    }
}

const getItemFromBrowserStorage = (keyName) => {
    if (isSessionStorageAvailable()) {
        return window.sessionStorage.getItem(keyName)
    }

    return getCookieValue(keyName)
}

const removeItemFromBrowserStorage = (keyName) => {
    if (isSessionStorageAvailable()) {
        window.sessionStorage.removeItem(keyName)
    } else {
        removeCookieValue(keyName)
    }
}

export const storeAuthToken = (authorization) => {
    if (authorization) {
        setItemInBrowserStorage(AUTH_KEY_NAME, authorization)
    }
}

export const getAuthToken = () => {
    return getItemFromBrowserStorage(AUTH_KEY_NAME)
}

export const deleteAuthToken = () => {
    removeItemFromBrowserStorage(AUTH_KEY_NAME)
}

export const storeExpiresAt = (expiresAt) => {
    if (expiresAt) {
        setItemInBrowserStorage(EXPIRES_KEY_NAME, expiresAt)
    }
}

export const getExpiresAt = () => {
    return getItemFromBrowserStorage(EXPIRES_KEY_NAME)
}

export const deleteExpiresAt = () => {
    removeItemFromBrowserStorage(EXPIRES_KEY_NAME)
}

export const deleteUserType = () => {
    removeItemFromBrowserStorage(USER_KEY_NAME)
}

export const getUserType = () => {
    return getItemFromBrowserStorage(USER_KEY_NAME) || USER_GUEST
}

export const storeUserType = (userType) => {
    if (userType === undefined) {
        throw new Error('Storing userType that is undefined!!')
    }

    setItemInBrowserStorage(USER_KEY_NAME, userType)
}

export const calculateCartID = (cart) => {
    return getUserType() === USER_REGISTERED ? cart.code : cart.guid
}

export const deleteCartID = () => {
    removeItemFromBrowserStorage(CART_KEY_NAME)
}

export const getCartID = () => {
    return getItemFromBrowserStorage(CART_KEY_NAME)
}

export const storeCartID = (cartID) => {
    if (cartID === undefined) {
        throw new Error('Storing cartID that is undefined!!')
    }

    setItemInBrowserStorage(CART_KEY_NAME, cartID)
}

let refreshToken
const storeRefreshToken = (token) => { refreshToken = token }
const deleteRefreshToken = () => { refreshToken = '' }

export const isUserLoggedIn = () => getUserType() === USER_REGISTERED

export const deleteSession = () => {
    deleteAuthToken()
    deleteExpiresAt()
    deleteCartID()
    deleteUserType()
    deleteRefreshToken()
}

export const storeAuthTokenAndExpiration = (data) => {
    const authorization = `Bearer ${data.access_token}`
    storeAuthToken(authorization)
    const currentTime = Math.floor(Date.now() / 1000)
    const expiresAt = currentTime + data.expires_in
    storeExpiresAt(expiresAt)
    storeRefreshToken(data.refresh_token)
}

export const initHybrisAuth = () => {
    if (getAuthToken()) {
        // Get current Unix time in seconds (not milliseconds)
        const currentTime = Math.floor(Date.now() / 1000)
        if (currentTime <= getExpiresAt()) {
            // The token is still valid
            return Promise.resolve({
                ...getRequestHeaders(),
                Authorization: getAuthToken()
            })
        }

        // The token has expired, get new token
        if (isUserLoggedIn() && refreshToken) {
            const body = {
                client_id: 'mobile_android',
                grant_type: 'password',
                client_secret: 'secret',
                refresh_token: refreshToken
            }
            return makeFormEncodedRequest(getAuthEndPoint(), body, {method: 'POST'})
                .then((response) => response.json())
                .then((json) => {
                    if (json.error) {
                        // The server did not accept the token, start from scratch
                        deleteSession()
                        return initHybrisAuth()
                    }
                    storeAuthTokenAndExpiration(json)
                    return {
                        ...getRequestHeaders(),
                        Authorization: getAuthToken()
                    }
                })
        }
        deleteSession()
        return initHybrisAuth()
    }
    const body = {
        client_id: 'client-side',
        grant_type: 'client_credentials',
        client_secret: 'secret'
    }

    return makeFormEncodedRequest(getAuthEndPoint(), body, {method: 'POST'})
        .then((res) => res.json())
        .then((json) => {
            storeAuthTokenAndExpiration(json)
            storeUserType(USER_GUEST)
            return {
                ...getRequestHeaders(),
                Authorization: getAuthToken()
            }
        })

}

export const makeApiRequest = (path, options, body) => {
    return initHybrisAuth()
        .then((headers) => {
            const requestOptions = {
                ...options,
                headers
            }
            return body
                ? makeFormEncodedRequest(getApiEndPoint() + path, body, requestOptions)
                : makeRequest(getApiEndPoint() + path, requestOptions)
        })
}

export const makeUnAuthenticatedApiRequest = (path, options) => {
    const requestOptions = {
        ...options,
        headers: getRequestHeaders()
    }
    return makeRequest(getApiEndPoint() + path, requestOptions)
}

export const extractLastPartOfURL = (url) => {
    if (!url) {
        return ''
    }

    const splitURL = url.split('/')
    const lastPartUrl = splitURL[splitURL.length - 1]
    const queryStringIndex = lastPartUrl.indexOf('?')

    // Check if there is a query string in URL
    if (queryStringIndex === -1) {
        return lastPartUrl
    } else {
        return lastPartUrl.substring(0, queryStringIndex)
    }
}


export const getQueryStringValue = (key) =>
    decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
