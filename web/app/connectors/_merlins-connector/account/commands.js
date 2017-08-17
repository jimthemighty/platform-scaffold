/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeFormEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {extractPathFromURL, isLocalStorageAvailable} from 'progressive-web-sdk/dist/utils/utils'
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

import {jqueryAjaxWrapper} from '../utils'
import {LOGIN_POST_URL, CREATE_ACCOUNT_POST_URL, getDeleteAddressURL} from '../config'
import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'
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

const submitForm = (href, formValues, formSelector, responseUrl) => {
    clearMessageCookie()
    return makeFormEncodedRequest(href, formValues, {method: 'POST'})
        .then(jqueryResponse)
        .catch(() => {
            throw new SubmissionError({_error: 'Failed to login due to network error.'})
        })
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            // todo set localStorage full name from jquery response
            const magentoCacheStorage = isLocalStorageAvailable ? JSON.parse(localStorage.getItem('mage-cache-storage')) : getCookieValue('ls-mage-cache-storage')
            document.cookie = 'name: mage-cache-storage \ '
            const textNodes = $response
                .find('.box-information .box-content p')
                .contents()
                .filter((_, item) => item.nodeType === Node.TEXT_NODE)
                .map((_, item) => item.textContent.trim())

            // if there is no local storage support it falls back to the following cookie:
            // ls_mage-cache-storage	%7B%22customer%22%3A%7B%22fullname%22%3A%22Mobify%20Mobify%22%2C%22firstname%22%3A%22Mobify%22%2C%22data_id%22%3A1502998993%7D%2C%22compare-products%22%3A%7B%22count%22%3A0%2C%22countCaption%22%3A%220%20items%22%2C%22listUrl%22%3A%22https%3A%2F%2Fwww.merlinspotions.com%2Fcatalog%2Fproduct_compare%2Findex%2Fuenc%2FaHR0cHM6Ly93d3cubWVybGluc3BvdGlvbnMuY29tL2N1c3RvbWVyL3NlY3Rpb24vbG9hZC8_c2VjdGlvbnM9JnVwZGF0ZV9zZWN0aW9uX2lkPWZhbHNlJl89MTUwMjk5ODk5MTIwMg%2C%2C%2F%22%2C%22items%22%3A%5B%5D%2C%22data_id%22%3A1502998993%7D%2C%22last-ordered-items%22%3A%7B%22items%22%3A%5B%5D%2C%22data_id%22%3A1502998993%7D%2C%22review%22%3A%7B%22nickname%22%3A%22%22%2C%22title%22%3A%22%22%2C%22detail%22%3A%22%22%2C%22data_id%22%3A1502998993%7D%2C%22wishlist%22%3A%7B%22counter%22%3A%222%20items%22%2C%22items%22%3A%5B%7B%22image%22%3A%7B%22template%22%3A%22Magento_Catalog%2Fproduct%2Fimage_with_borders%22%2C%22src%22%3A%22https%3A%2F%2Fwww.merlinspotions.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F1%2Fthumbnail%2F75x90%2Fbeff4985b56e3afdbeabfc89641a4582%2Fa%2Fg%2Faging-potion-1.jpg%22%2C%22width%22%3A%2275%22%2C%22height%22%3A%2290%22%2C%22alt%22%3A%22Aging%20Potion%22%7D%2C%22product_url%22%3A%22https%3A%2F%2Fwww.merlinspotions.com%2Faging-potion.html%22%2C%22product_name%22%3A%22Aging%20Potion%22%2C%22product_price%22%3A%22%22%2C%22product_is_saleable_and_visible%22%3Atrue%2C%22product_has_required_options%22%3Afalse%2C%22add_to_cart_params%22%3A%22%7B%5C%22action%5C%22%3A%5C%22https%3A%5C%5C%2F%5C%5C%2Fwww.merlinspotions.com%5C%5C%2Fwishlist%5C%5C%2Findex%5C%5C%2Fcart%5C%5C%2F%5C%22%2C%5C%22data%5C%22%3A%7B%5C%22item%5C%22%3A%5C%22114%5C%22%2C%5C%22qty%5C%22%3A%5C%2215.0000%5C%22%2C%5C%22uenc%5C%22%3A%5C%22aHR0cHM6Ly93d3cubWVybGluc3BvdGlvbnMuY29tL2N1c3RvbWVyL2FjY291bnQv%5C%22%7D%7D%22%2C%22delete_item_params%22%3A%22%7B%5C%22action%5C%22%3A%5C%22https%3A%5C%5C%2F%5C%5C%2Fwww.merlinspotions.com%5C%5C%2Fwishlist%5C%5C%2Findex%5C%5C%2Fremove%5C%5C%2F%5C%22%2C%5C%22data%5C%22%3A%7B%5C%22item%5C%22%3A%5C%22114%5C%22%2C%5C%22uenc%5C%22%3A%5C%22aHR0cHM6Ly93d3cubWVybGluc3BvdGlvbnMuY29tL2N1c3RvbWVyL2FjY291bnQv%5C%22%7D%7D%22%7D%2C%7B%22image%22%3A%7B%22template%22%3A%22Magento_Catalog%2Fproduct%2Fimage_with_borders%22%2C%22src%22%3A%22https%3A%2F%2Fwww.merlinspotions.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F1%2Fthumbnail%2F75x90%2Fbeff4985b56e3afdbeabfc89641a4582%2Fu%2Fn%2Funicorn-blood-1.jpg%22%2C%22width%22%3A%2275%22%2C%22height%22%3A%2290%22%2C%22alt%22%3A%22Unicorn%20Blood%22%7D%2C%22product_url%22%3A%22https%3A%2F%2Fwww.merlinspotions.com%2Funicorn-blood.html%22%2C%22product_name%22%3A%22Unicorn%20Blood%22%2C%22product_price%22%3A%22%22%2C%22product_is_saleable_and_visible%22%3Afalse%2C%22product_has_required_options%22%3Afalse%2C%22add_to_cart_params%22%3A%22%7B%5C%22action%5C%22%3A%5C%22https%3A%5C%5C%2F%5C%5C%2Fwww.merlinspotions.com%5C%5C%2Fwishlist%5C%5C%2Findex%5C%5C%2Fcart%5C%5C%2F%5C%22%2C%5C%22data%5C%22%3A%7B%5C%22item%5C%22%3A%5C%22100%5C%22%2C%5C%22qty%5C%22%3A%5C%224.0000%5C%22%2C%5C%22uenc%5C%22%3A%5C%22aHR0cHM6Ly93d3cubWVybGluc3BvdGlvbnMuY29tL2N1c3RvbWVyL2FjY291bnQv%5C%22%7D%7D%22%2C%22delete_item_params%22%3A%22%7B%5C%22action%5C%22%3A%5C%22https%3A%5C%5C%2F%5C%5C%2Fwww.merlinspotions.com%5C%5C%2Fwishlist%5C%5C%2Findex%5C%5C%2Fremove%5C%5C%2F%5C%22%2C%5C%22data%5C%22%3A%7B%5C%22item%5C%22%3A%5C%22100%5C%22%2C%5C%22uenc%5C%22%3A%5C%22aHR0cHM6Ly93d3cubWVybGluc3BvdGlvbnMuY29tL2N1c3RvbWVyL2FjY291bnQv%5C%22%7D%7D%22%7D%5D%2C%22data_id%22%3A1502998993%7D%7D	www.merlinspotions.com	/customer/account	8/15/2027, 12:43:17 PM	3.44 KB
            magentoCacheStorage.customer.fullname = textNodes[0]
            magentoCacheStorage.customer.email = textNodes[1]
            localStorage.setItem('mage-cache-storage', JSON.stringify(magentoCacheStorage))

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
