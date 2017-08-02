/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {setRegisterLoaded, setSigninLoaded} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveUserEmail} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {getAuthEndPoint, getHomeURL} from '../config'

import {deleteSession, makeApiRequest, makeUnAuthenticatedApiRequest, storeAuthTokenAndExpiration, storeUserType, deleteBasketID, USER_REGISTERED} from '../utils'
import {fetchNavigationData} from '../app/commands'

const initLoginData = () => (dispatch) => {
    dispatch(setSigninLoaded())
    dispatch(setRegisterLoaded())
    return Promise.resolve()
}

export const initLoginPage = initLoginData
export const initRegisterPage = initLoginData

export const navigateToSection = (router, routes, sectionName) => (dispatch) => {
    console.log('[Hybris Connector] Called navigateToSection stub with parameters:', router, routes, sectionName)
    return Promise.resolve()
}

export const login = (username, password) => (dispatch) => {
    /* eslint-disable no-unused-vars */
    let basketContents
    /* eslint-enable no-unused-vars */

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
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.error) {
                let errorMessage = 'Username or password is incorrect'
                if (/internal server/i.test(responseJSON.error.message)) {
                    errorMessage = 'There was a problem logging in. Please try again.'
                }
                throw new SubmissionError({_error: errorMessage})
            }
            storeAuthTokenAndExpiration(responseJSON)
            dispatch(setLoggedIn(true))
            dispatch(receiveUserEmail(responseJSON.uid))
            storeUserType(USER_REGISTERED)
            dispatch(fetchNavigationData())
            return deleteBasketID()
        })
        /*
        // Check if the user has a basket already
        .then(() => makeApiRequest(`/users/current/carts`, {method: 'GET'}))
        .then((response) => response.json())
        .then(({carts: baskets}) => {
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

const mapHybrisToMobifyParam = (param) => {
    switch (param) {
        case 'email':
            return 'uid'
        case 'password':
            return 'password'
        case 'firstname':
            return 'firstName'
        case 'lastname':
            return 'lastName'
        default:
            return false
    }
}

export const registerUser = (firstname, lastname, email, password) => (dispatch) => {
    return makeUnAuthenticatedApiRequest('/titles')
        .then((response) => response.json())
        .then((json) => json)
        .then(({titles}) => {
            if (!titles || !titles.length) {
                throw new SubmissionError({_error: 'Unable to create account.'})
            }
            const titleCode = titles[0].code
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    uid: email,
                    password,
                    firstName: firstname,
                    lastName: lastname,
                    titleCode
                })
            }
            return makeApiRequest('/users', requestOptions)
        })
        .then((response) => {
            let result
            if (response.status === 201) {
                result = Promise.resolve(response)
            } else {
                result = response.json()
            }
            return result
        })
        .then((response) => {
            if (response.status !== 201) {
                const errors = response.errors || {}
                const errorData = errors.reduce((acc, err) => {
                    if (err.type === 'DuplicateUidError') {
                        acc.email = 'This email already exists.'
                    } else {
                        const param = mapHybrisToMobifyParam(err.subject)
                        if (param) {
                            acc[param] = acc[param] || err.message
                        }
                    }
                    return acc
                }, {})
                errorData._error = 'Unable to create account.'
                throw new SubmissionError(errorData)
            }
            // Creating a user doesn't sign them in automatically, so dispatch the login command
            return dispatch(login(email, password, true))
        })
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
