/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {setRegisterLoaded, setSigninLoaded} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveUserEmail} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {getAuthEndPoint, getHomeURL} from '../config'

import {deleteSession, storeAuthTokenAndExpiration, storeUserType, deleteBasketID, USER_REGISTERED} from '../utils'
import {fetchNavigationData} from '../app/commands'

/* eslint-disable no-unused-vars */

export const initLoginPage = (url, routeName) => (dispatch) => {
    console.log('[Hybris Connector] Called initLoginPage stub with parameters:', url, routeName)
    dispatch(setSigninLoaded())
    return Promise.resolve()
}

export const initRegisterPage = (url, routeName) => (dispatch) => {
    console.log('[Hybris Connector] Called initRegisterPage stub with parameters:', url, routeName)
    dispatch(setRegisterLoaded())
    return Promise.resolve()
}

export const navigateToSection = (router, routes, sectionName) => (dispatch) => {
    console.log('[Hybris Connector] Called navigateToSection stub with parameters:', router, routes, sectionName)
    return Promise.resolve()
}

export const login = (username, password) => (dispatch) => {
    let responseHeaders
    let basketContents
    let customerID
    const body = {
        client_id: 'mobile_android',
        grant_type: 'password',
        client_secret: 'secret',
        username,
        password
    }
    const requestCartData = () => Promise.resolve()
    return requestCartData()
        .then((basket) => {
            basketContents = basket

            // Actual login call
            return makeFormEncodedRequest(getAuthEndPoint(), body, {method: 'POST'})
        })
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.error) {
                let errorMessage = 'Username or password is incorrect'
                if (/internal server/i.test(responseJSON.error.message)) {
                    errorMessage = 'There was a problem logging in. Please try again.'
                }
                throw new SubmissionError({_error: errorMessage})
            }
            storeAuthTokenAndExpiration(responseJSON)
            customerID = responseJSON.uid
            dispatch(setLoggedIn(true))
            dispatch(receiveUserEmail(responseJSON.uid))
            storeUserType(USER_REGISTERED)
            dispatch(fetchNavigationData())
            return deleteBasketID()
        })
            /*
        // Check if the user has a basket already
        .then(() => makeApiRequest(`/customers/${customerID}/baskets`, {method: 'GET'}))
        .then((response) => response.json())
        .then(({baskets}) => {
            if (!baskets || baskets.length === 0) {
                return createBasket(basketContents)
            }

            const basketID = baskets[0].basket_id
            storeBasketID(basketID)
            if (!basketContents.product_items) {
                // There is no basket to merge, so return the existing one
                return Promise.resolve(baskets[0])
            }
            // update basket with contents (product_items)
            return makeApiJsonRequest(
                `/baskets/${basketID}/items`,
                basketContents.product_items,
                {method: 'POST'}
            )
                .then(checkForResponseFault)
        })
        .then((basket) => dispatch(handleCartData(basket)))
        */
        .then(() => {
            // Navigate to the homepage, since we haven't made an account page yet
            // and demandware's account page is at the same URL as their login page
            return getHomeURL()
        })
}

export const logout = () => (dispatch) => {
    deleteSession()
    dispatch(setLoggedIn(false))
    dispatch(fetchNavigationData())
    return Promise.resolve()
}

export const registerUser = (firstname, lastname, email, password) => (dispatch) => {
    console.log('[Hybris Connector] Called registerUser stub with parameters:', firstname, lastname, email, password)

    // This promise should resolve to the URL of the account page
    // to redirect the user to.
    return Promise.resolve()
}

export const updateShippingAddress = (formValues) => (dispatch) => {
    console.log('[Hybris Connector] Called updateShippingAddress stub with parameters:', formValues)
    return Promise.resolve()
}

export const updateBillingAddress = (formValues) => (dispatch) => {
    console.log('[Hybris Connector] Called updateBillingAddress stub with parameters:', formValues)
    return Promise.resolve()
}

export const initAccountDashboard = (url) => (dispatch) => {
    console.log('[Hybris Connector] Called initAccountDashboard stub with parameters:', url)
    return Promise.resolve()
}
