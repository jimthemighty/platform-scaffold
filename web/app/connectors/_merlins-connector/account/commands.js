/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {extractPathFromURL} from 'progressive-web-sdk/dist/utils/utils'
import {SubmissionError} from 'redux-form'
import {browserHistory} from 'progressive-web-sdk/dist/routing'
import {getCookieValue, splitFullName} from '../../../utils/utils'
import {getFormKey, getUenc} from '../selectors'
import {fetchPageData} from '../app/commands'
import {getCart} from '../cart/commands'
import {extractMagentoJson} from '../../../utils/magento-utils'
import {
    setSigninLoaded,
    setRegisterLoaded,
    receiveAccountInfoData,
} from 'progressive-web-sdk/dist/integration-manager/account/results'

import {receiveCheckoutLocations} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {
    buildFormData,
    createAddressRequestObject,
    receiveWishlistResponse,
    updateCustomerAddresses
} from './utils'

import {jqueryAjaxWrapper, setLoggedInStorage} from '../utils'
import {LOGIN_POST_URL, CREATE_ACCOUNT_POST_URL, getDeleteAddressURL} from '../config'
import {isFormResponseInvalid, parseAccountInfo, parseAccountLocations} from './parsers'

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

export const initAccountInfoPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            return dispatch(receiveAccountInfoData(parseAccountInfo($, $response)))
        })
}

export const initAccountDashboardPage = (url) => (dispatch) => { // eslint-disable-line
    return Promise.resolve()
}

export const initAccountAddressPage = (url) => (dispatch) => { // eslint-disable-line
    return makeRequest('/customer/address/new/')
        .then(jqueryResponse)
        .then(([$, $response]) => { // eslint-disable-line no-unused-vars
            // we're going to fetch the cart page so we can re-use the country
            // parsing functionality from initCartPage
            const magentoFieldData = extractMagentoJson($response)
            return dispatch(receiveCheckoutLocations(parseAccountLocations(magentoFieldData, $response)))
        })
        .then(() => dispatch(updateCustomerAddresses()))
}

export const initWishlistPage = (url) => (dispatch) => {
    return (dispatch(fetchPageData(url)))
        .then(([$, $response]) => dispatch(receiveWishlistResponse($, $response)))
}

export const addToCartFromWishlist = ({itemId, productId, quantity}) => (dispatch, getState) => {
    const currentState = getState()
    const formKey = getFormKey(currentState)
    const uenc = getUenc(productId)(currentState)
    const href = '/wishlist/index/cart/'
    const requestData = {
        item: itemId,
        qty: quantity,
        uenc,
        form_key: formKey
    }
    return makeFormEncodedRequest(href, requestData, {method: 'POST'})
        .then((response) => {
            if (response.url.includes('configure')) {
                // the response is a redirect to the PDP
                // The user needs to select their options
                browserHistory.push({
                    pathname: extractPathFromURL(response.url)
                })
                // Throw an error to prevent showing the item added modal
                throw new Error('Redirecting to PDP, item not added')
            } else {
                return jqueryResponse(response)
                    .then((res) => {
                        const [$, $response] = res

                        // Don't return this promise because we don't
                        // need to wait until this returns to update the wishlist UI
                        dispatch(getCart())

                        dispatch(receiveWishlistResponse($, $response))
                    })
            }
        })
}

export const removeItemFromWishlist = () => (dispatch) => Promise.resolve()


const MAGENTO_MESSAGE_COOKIE = 'mage-messages'
const clearMessageCookie = () => {
    document.cookie = `${MAGENTO_MESSAGE_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
const DEFAULT_ERROR_TEXT = 'Username or password is incorrect'
const EXISTING_ACCT_REGEX = /already an account/

const submitForm = (href, formValues, formSelector, responseUrl) => (dispatch) => {
    clearMessageCookie()
    return makeFormEncodedRequest(href, formValues, {method: 'POST'})
        .then(jqueryResponse)
        .catch(() => {
            throw new SubmissionError({_error: 'Failed to login due to network error.'})
        })
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            setLoggedInStorage($, $response)

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
            return responseUrl
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

    return dispatch(submitForm(LOGIN_POST_URL, formData, '.form-login', '/customer/account'))
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
    return dispatch(submitForm(CREATE_ACCOUNT_POST_URL, formData, '.form-create-account', '/customer/account'))
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
            dispatch(setLoggedInInStorage(false))
            const magentoCacheStorage = JSON.parse(localStorage.getItem('mage-cache-storage'))
            magentoCacheStorage.customer.fullname = ''
            magentoCacheStorage.customer.email = ''
            localStorage.setItem('mage-cache-storage', JSON.stringify(magentoCacheStorage))
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
    const formKey = getFormKey(getState())
    return makeRequest(getDeleteAddressURL(addressId, formKey), {method: 'POST'})
        .then(() => dispatch(updateCustomerAddresses()))
}

export const editAddress = (address, addressId) => (dispatch, getState) => { // eslint-disable-line
    const formKey = getFormKey(getState())
    const formData = {
        form_key: formKey,
        ...createAddressRequestObject(address)
    }
    return dispatch(submitForm(`/customer/address/formPost/id/${addressId}`, formData, '.form-address-edit', '/customer/address/index/'))
        .then(() => dispatch(updateCustomerAddresses()))
}

export const addAddress = (address) => (dispatch, getState) => {
    const formKey = getFormKey(getState())
    const formData = {
        form_key: formKey,
        ...createAddressRequestObject(address)
    }
    return dispatch(submitForm('/customer/address/formPost/', formData, '.form-address-edit', '/customer/address/index/'))
        .then(() => dispatch(updateCustomerAddresses()))
}

/* eslint-disable camelcase */
export const updateAccountInfo = ({names, email, currentPassword, newPassword}) => (dispatch, getState) => {
    const formKey = getFormKey(getState())
    const {firstname, lastname} = splitFullName(names)
    const formData = {
        firstname,
        lastname,
        email,
        change_password: currentPassword && newPassword ? 1 : '',
        current_password: currentPassword ? currentPassword : '',
        password: newPassword ? newPassword : '',
        password_confirmation: newPassword ? newPassword : '',
        form_key: formKey
    }

    dispatch(receiveAccountInfoData({names, email}))
    return dispatch(submitForm('/customer/account/editPost/', formData, '.form-edit-account', '/customer/account/edit/'))
}


export const updateAccountPassword = (formValues) => (dispatch) => {
    dispatch(updateAccountInfo(formValues))
}
