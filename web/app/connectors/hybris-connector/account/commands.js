/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {SubmissionError} from 'redux-form'
import {makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {setRegisterLoaded, setSigninLoaded} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveUserEmail} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {getAuthEndPoint, getHomeURL} from '../config'
import {getRegisterUserErrorData} from './utils'
import {createCart, handleCartData, mergeCart} from '../cart/utils'
import {getCart} from '../cart/commands'

import {
    calculateCartID,
    deleteCartID,
    deleteSession,
    getCartID,
    makeApiRequest,
    makeUnAuthenticatedApiRequest,
    storeAuthTokenAndExpiration,
    storeCartID,
    storeUserType,
    USER_REGISTERED} from '../utils'
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
    const body = {
        client_id: 'mobile_android',
        grant_type: 'password',
        client_secret: 'secret',
        username,
        password
    }
    let oldCartID
    return makeFormEncodedRequest(getAuthEndPoint(), body, {method: 'POST'})
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
            oldCartID = getCartID()
            return deleteCartID()
        })
        // Check if the user has a cart already
        .then(() => makeApiRequest(`/users/current/carts`, {method: 'GET'}))
        .then((response) => response.json())
        .then(({carts}) => {
            let newCart
            if (!carts || !carts.length) {
                newCart = createCart()
            } else {
                const userCart = carts[0]
                if (oldCartID) {
                    newCart = mergeCart(userCart.guid, oldCartID)
                } else {
                    newCart = userCart
                    storeCartID(calculateCartID(newCart))
                }
            }
            return newCart
        })
        .then((cart) => dispatch(handleCartData(cart)))
        .then(() => {
            // Navigate to the homepage, since we haven't made an account page yet
            // and demandware's account page is at the same URL as their login page
            return getHomeURL()
        })
}

export const logout = () => (dispatch) => {
    deleteSession()
    dispatch(getCart())
    dispatch(setLoggedIn(false))
    dispatch(fetchNavigationData())
    return Promise.resolve()
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
                const errorData = getRegisterUserErrorData(response)
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
