/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {isSessionStorageAvailable} from 'progressive-web-sdk/dist/utils/utils'

import {getApiEndPoint, getAuthEndPoint, getRequestHeaders} from './config'

const AUTH_KEY_NAME = 'mob-auth'
const EXPIRES_KEY_NAME = 'mob-expires'
const BASKET_KEY_NAME = 'mob-basket'
const USER_KEY_NAME = 'mob-user'
export const USER_REGISTERED = 'registered'
export const USER_GUEST = 'guest'

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

export const deleteBasketID = () => {
    removeItemFromBrowserStorage(BASKET_KEY_NAME)
}

export const getBasketID = () => {
    return getItemFromBrowserStorage(BASKET_KEY_NAME)
}

export const storeBasketID = (basketID) => {
    if (basketID === undefined) {
        throw new Error('Storing basketID that is undefined!!')
    }

    setItemInBrowserStorage(BASKET_KEY_NAME, basketID)
}

export const deleteUserType = () => {
    removeItemFromBrowserStorage(USER_KEY_NAME)
}

export const getUserType = () => {
    return getItemFromBrowserStorage(USER_KEY_NAME)
}

export const storeUserType = (userType) => {
    if (userType === undefined) {
        throw new Error('Storing userType that is undefined!!')
    }

    setItemInBrowserStorage(USER_KEY_NAME, userType)
}

let refreshToken
const storeRefreshToken = (token) => { refreshToken = token }
const deleteRefreshToken = () => { refreshToken = '' }

export const isUserLoggedIn = () => getUserType() === USER_REGISTERED

export const deleteSession = () => {
    deleteAuthToken()
    deleteExpiresAt()
    deleteBasketID()
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

export const makeApiRequest = (path, options) => {
    return initHybrisAuth()
        .then((headers) => {
            const requestOptions = {
                ...options,
                headers
            }
            return makeRequest(getApiEndPoint() + path, requestOptions)
        })
}

export const makeApiJsonRequest = (path, body, options) => {
    return makeApiRequest(path, {
        ...options,
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
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
    return splitURL[splitURL.length - 1]
}
