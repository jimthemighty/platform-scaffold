/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {SubmissionError} from 'redux-form'

import {fetchCustomerAddresses} from '../checkout/commands'
import {getCookieValue} from '../../../utils/utils'
import {getFormKey} from '../selectors'
import {fetchPageData} from '../app/commands'
import {getCart} from '../cart/commands'
import {
    setSigninLoaded,
    setRegisterLoaded,
    receiveAccountAddressData
} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {buildFormData, createAddressRequestObject} from './utils'
import {jqueryAjaxWrapper, parseAddress} from '../utils'
import {LOGIN_POST_URL, CREATE_ACCOUNT_POST_URL, getDeleteAddressURL} from '../config'
import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'

import {isFormResponseInvalid} from './parsers'

export const initLoginPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(() => {
            dispatch(setSigninLoaded())
        })
}

export const initRegisterPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(() => {
            dispatch(setRegisterLoaded())
        })
}

export const initAccountDashboardPage = (url) => (dispatch) => { // eslint-disable-line
    return Promise.resolve()
}

export const initAccountAddressPage = (url) => (dispatch) => { // eslint-disable-line
    return fetchCustomerAddresses()
        .then(({customer: {addresses}}) => {
            const parsedAddresses = addresses.map((address) => parseAddress(address))
            const addressInfo = {
                addresses: parsedAddresses.filter((address) => !address.default),
                defaultAddress: parsedAddresses.filter((address) => address.default)[0]
            }
            return dispatch(receiveAccountAddressData(addressInfo))
        })
}

const MAGENTO_MESSAGE_COOKIE = 'mage-messages'
const clearMessageCookie = () => {
    document.cookie = `${MAGENTO_MESSAGE_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
const DEFAULT_ERROR_TEXT = 'Username or password is incorrect'
const EXISTING_ACCT_REGEX = /already an account/

const submitForm = (href, formValues, formSelector) => {
    clearMessageCookie()
    return makeFormEncodedRequest(href, formValues, {method: 'POST'})
        .then(jqueryResponse)
        .catch(() => {
            throw new SubmissionError({_error: 'Failed to login due to network error.'})
        })
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            if (isFormResponseInvalid($response, formSelector)) {
                const messages = JSON.parse(decodeURIComponent(getCookieValue(MAGENTO_MESSAGE_COOKIE)))

                if (messages.length === 0) {
                    throw new SubmissionError({_error: DEFAULT_ERROR_TEXT})
                }

                let message = messages[0].text.replace(/\+/g, ' ')
                // This message has HTML in it, just patch it up for now
                if (EXISTING_ACCT_REGEX.test(message)) {
                    message = `${message.split('.')[0]}.`
                }

                throw new SubmissionError({
                    _error: message
                })
            }
            return '/customer/account'
        })
}

export const login = (username, password, rememberMe) => (dispatch, getState) => {
    const currentState = getState()
    const formKey = getFormKey(currentState)

    const formData = {
        'login[username]': username,
        'login[password]': password,
        form_key: formKey,
        send: ''
    }

    if (rememberMe) {
        formData.persistent_remember_me = 'on'
    }

    return submitForm(LOGIN_POST_URL, formData, '.form-login')
}

export const registerUser = (firstname, lastname, email, password, rememberMe) => (dispatch, getState) => {
    const currentState = getState()
    const formKey = getFormKey(currentState)

    const formData = {
        firstname,
        lastname,
        email,
        password,
        password_confirmation: password,
        form_key: formKey
    }
    if (rememberMe) {
        formData.persistent_remember_me = 'on'
    }
    return submitForm(CREATE_ACCOUNT_POST_URL, formData, '.form-create-account')
}

const findPathForRoute = (routes, routeName) => {
    const path = routes[0].childRoutes.find((route) => route.routeName === routeName).path
    return `/${path}`
}

/**
 * Uses React router to ensure browser history remains consistent with the
 * selected section.
 */
export const navigateToSection = (router, routes, sectionName) => {
    return () => {
        router.push(findPathForRoute(routes, sectionName))
    }
}

export const logout = () => (dispatch) => (
    makeRequest('/customer/account/logout/')
        // Don't wait for the cart to do everything else
        .then(() => {
            dispatch(getCart())
            dispatch(setLoggedIn(false))
        })
        // Update navigation menu and logged in flag
        // Need to request current location so that the right entry is active
        .then(() => dispatch(fetchPageData(window.location.href)))
)

export const updateShippingAddress = (shippingData) => (dispatch) => {
    const formData = buildFormData({
        success_url: '',
        error_url: '',
        ...createAddressRequestObject(shippingData),
        default_billing: 1,
        default_shipping: 1,
    })

    const postUpdateCustomerAddressURL = '/customer/address/formPost/'

    return jqueryAjaxWrapper({
        url: postUpdateCustomerAddressURL,
        data: formData,
        method: 'POST',
        processData: false,
        contentType: false
    })
        .catch((error) => {
            console.error('Updating the user Shipping and Billing address failed. Response log:')
            console.error(error)
            throw new Error('Unable to save Shipping and Billing Address')
        })
}

export const updateBillingAddress = (paymentData) => (dispatch) => {
    const formData = buildFormData({
        success_url: '',
        error_url: '',
        ...createAddressRequestObject(paymentData),
        default_billing: 1,
        default_shipping: 1,
    })

    const postUpdateCustomerAddressURL = '/customer/address/formPost/id/46/'
    return jqueryAjaxWrapper({
        url: postUpdateCustomerAddressURL,
        data: formData,
        method: 'POST',
        processData: false,
        contentType: false
    })
        .catch((error) => {
            console.error('Updating the user Shipping/Billing address failed. Response log:')
            console.error(error)
            throw new Error('Unable to save Billing Address')
        })
}

export const deleteAddress = (addressId) => (dispatch, getState) => { // eslint-disable-line
    const currentState = getState()
    const formKey = getFormKey(currentState)


    return makeRequest(getDeleteAddressURL(addressId, formKey), {method: 'POST'})
}

export const editAddress = (addressId) => (dispatch) => { // eslint-disable-line
    /*
        Request URL: https://www.merlinspotions.com/customer/address/formPost/id/8/
        Request Method: POST

        BODY
        name="form_key" 4urFpCoWc9DN3MnF
        name="success_url"
        name="error_url"
        name="firstname" test
        name="lastname" test
        name="company"
        name="telephone" (431) 423-4234
        name="fax"
        name="street[]" 1234 test street
        name="street[]"
        name="city" Seattle
        name="region_id" 62
        name="region" Washington
        name="postcode" 98121
        name="country_id" US
*/
    return Promise.resolve()
}
