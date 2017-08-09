/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {SubmissionError} from 'redux-form'

import {getCookieValue, splitFullName} from '../../../utils/utils'
import {getFormKey} from '../selectors'
import {fetchPageData} from '../app/commands'
import {parseLocations} from '../checkout/parsers'
import {getCart} from '../cart/commands'
import {extractMagentoJson} from '../../../utils/magento-utils'
import {
    setSigninLoaded,
    setRegisterLoaded,
    receiveAccountInfoData,
    receiveWishlistData,
    receiveWishlistUIData,
    receiveAccountOrderListData,
    receiveCurrentOrderNumber
} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {receiveWishlistProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'

import {receiveCheckoutLocations} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {
    buildFormData,
    createAddressRequestObject,
    updateCustomerAddresses
} from './utils'

import {
    isFormResponseInvalid,
    parseWishlistProducts,
    parseAccountInfo,
    parseOrderListData
} from './parsers'
import {jqueryAjaxWrapper} from '../utils'
import {LOGIN_POST_URL, CREATE_ACCOUNT_POST_URL, getDeleteAddressURL} from '../config'
import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'
import {isFormResponseInvalid, parseWishlistProducts, parseAccountInfo, parseOrder} from './parsers'

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
    return makeRequest('https://www.merlinspotions.com/checkout/cart/')
        .then(jqueryResponse)
        .then(([$, $response]) => { // eslint-disable-line no-unused-vars
            // we're going to fetch the cart page so we can re-use the country
            // parsing functionality from initCartPage
            const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']
            const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)

            return dispatch(receiveCheckoutLocations(parseLocations(magentoFieldData)))
        })
        .then(() => dispatch(updateCustomerAddresses()))
}

export const initWishlistPage = (url) => (dispatch) => {
    return (dispatch(fetchPageData(url)))
        .then(([$, $response]) => {
            const {
                wishlistItems,
                products
            } = parseWishlistProducts($, $response)
            const formURL = $response.find('#wishlist-view-form').attr('action')
            const wishlistData = {
                title: $response.find('.page-title').text(),
                products: wishlistItems,
                shareURL: formURL ? formURL.replace('update', 'share') : ''
            }
            dispatch(receiveWishlistProductData(products))
            dispatch(receiveWishlistData(wishlistData))
            dispatch(receiveWishlistUIData({contentLoaded: true}))
        })
}


const MAGENTO_MESSAGE_COOKIE = 'mage-messages'
const clearMessageCookie = () => {
    document.cookie = `${MAGENTO_MESSAGE_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
const DEFAULT_ERROR_TEXT = 'Username or password is incorrect'
const EXISTING_ACCT_REGEX = /already an account/

const submitForm = (href, formValues, formSelector, responseUrl) => {
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

    return submitForm(LOGIN_POST_URL, formData, '.form-login', '/customer/account')
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
    return submitForm(CREATE_ACCOUNT_POST_URL, formData, '.form-create-account', '/customer/account')
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
    return submitForm(`/customer/address/formPost/id/${addressId}`, formData, '.form-address-edit', '/customer/address/index/')
        .then(() => dispatch(updateCustomerAddresses()))
}

export const addAddress = (address) => (dispatch, getState) => {
    const formKey = getFormKey(getState())
    const formData = {
        form_key: formKey,
        ...createAddressRequestObject(address)
    }
    return submitForm('/customer/address/formPost/', formData, '.form-address-edit', '/customer/address/index/')
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
    return submitForm('/customer/account/editPost/', formData, '.form-edit-account', '/customer/account/edit/')
}


export const updateAccountPassword = (formValues) => (dispatch) => {
    dispatch(updateAccountInfo(formValues))
}


export const initAccountViewOrderPage = (url) => (dispatch) => {
    const idMatch = /order_id\/(\d+)\//.exec(url)
    const id = idMatch ? idMatch[1] : ''
    return (dispatch(fetchPageData(url)))
        .then(([$, $response]) => {
            const orderData = {
                ...parseOrder($, $response),
                id
            }
            // set current order Number
            dispatch(receiveCurrentOrderNumber(orderData.orderNumber))
            dispatch(receiveAccountOrderListData({[orderData.orderNumber]: orderData}))
        })
}

export const initAccountOrderListPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            return dispatch(receiveAccountOrderListData(parseOrderListData($, $response)))
        })
}

export const reorderPreviousOrder = (orderNumber) => (dispatch, getState) => { // eslint-disable-line
    const formKey = getFormKey(getState())
    const orderId = orderNumber.replace(/^0+/, '')
    return makeFormEncodedRequest(`/sales/order/reorder/order_id/${orderId}/`, {form_key: formKey}, {method: 'POST'})
        .then(() => '/checkout/cart/')
}
