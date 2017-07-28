/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {SubmissionError} from 'redux-form'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {setLoggedIn} from 'progressive-web-sdk/dist/integration-manager/results'
import {
    setSigninLoaded,
    setRegisterLoaded,
    receiveWishlistData,
    receiveWishlistUIData,
    receiveAccountInfoData,
    removeWishlistItem,
    receiveAccountAddressData,
} from 'progressive-web-sdk/dist/integration-manager/account/results'
import {receiveWishlistProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {createOrderAddressObject} from '../checkout/utils'
import {
    initSfccSession,
    deleteAuthToken,
    storeAuthToken,
    makeApiRequest,
    makeApiJsonRequest,
    checkForResponseFault,
    deleteBasketID,
    storeBasketID,
    getCustomerID,
    fetchItemData
} from '../utils'
import {parseWishlistProducts} from '../parsers'
import {requestCartData, createBasket, handleCartData} from '../cart/utils'
import {splitFullName} from '../../../utils/utils'
import {getDashboardURL, getApiEndPoint, getRequestHeaders} from '../config'
import {fetchNavigationData} from '../app/commands'
import {addToCart} from 'progressive-web-sdk/dist/integration-manager/cart/commands'
import {removeItemFromWishlist as removeItemFromWishlistCommand} from 'progressive-web-sdk/dist/integration-manager/account/commands'

const initLoginData = () => (dispatch) => {
    dispatch(setSigninLoaded())
    dispatch(setRegisterLoaded())
    return Promise.resolve()
}

export const initLoginPage = initLoginData
export const initRegisterPage = initLoginData

export const navigateToSection = () => (dispatch) => Promise.resolve()

export const login = (username, password) => (dispatch) => {
    const authorizationData = window.btoa(`${username}:${password}`)
    const requestOptions = {
        method: 'POST',
        body: '{type: "credentials"}',
        headers: {
            ...getRequestHeaders(),
            Authorization: `Basic ${authorizationData}`
        }
    }
    let responseHeaders
    let basketContents
    let customerID
    return requestCartData()
        .then((basket) => {
            basketContents = basket

            // Actual login call
            return makeRequest(`${getApiEndPoint()}/customers/auth`, requestOptions)
        })
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then((responseJSON) => {
            if (responseJSON.fault) {
                let errorMessage = 'Username or password is incorrect'
                if (/internal server/i.test(responseJSON.fault.message)) {
                    errorMessage = 'There was a problem logging in. Please try again.'
                }
                throw new SubmissionError({_error: errorMessage})
            }
            const authorization = responseHeaders.get('Authorization')
            customerID = responseJSON.customer_id
            storeAuthToken(authorization)
            dispatch(setLoggedIn(true))
            dispatch(fetchNavigationData())
            deleteBasketID()
            return initSfccSession(authorization)
        })
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
        .then(() => {
            // Navigate to the homepage, since we haven't made an account page yet
            // and demandware's account page is at the same URL as their login page
            return getDashboardURL()
        })
}

export const logout = () => (dispatch) => {
    return makeApiRequest('/customers/auth', {method: 'DELETE'})
        .then((response) => response.json())
        .then((responseJSON) => {
            // We don't really do any serious error checking here because we can't
            // really do much about it.
            if (responseJSON.fault) {
                console.error('Error logging out. Clearing auth tokens anyways.', responseJSON)
            }

            deleteBasketID()
            deleteAuthToken()
            dispatch(setLoggedIn(false))
            dispatch(fetchNavigationData())
        })
}

export const registerUser = (firstname, lastname, email, password) => (dispatch) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            password,
            customer: {
                first_name: firstname,
                last_name: lastname,
                login: email,
                email
            }
        })
    }
    let responseHeaders
    return makeApiRequest('/customers', requestOptions)
        .then((response) => {
            responseHeaders = response.headers
            return response.json()
        })
        .then(({fault}) => {
            if (fault) {
                throw new SubmissionError({_error: 'Unable to create account.'})
            }
            const authorization = responseHeaders.get('Authorization')
            if (authorization) {
                storeAuthToken(authorization)
                return initSfccSession(authorization)
            }
            return Promise.resolve()
        })
        // Creating a user doesn't sign them in automatically, so dispatch the login command
        .then(() => dispatch(login(email, password, true)))

}

const addAddress = (formValues, addressName) => {
    const addressData = createOrderAddressObject(formValues)
    const customerId = getCustomerID()
    const requestBody = {
        ...addressData,
        address_id: addressName
    }
    return makeApiJsonRequest(`/customers/${customerId}/addresses`, requestBody, {method: 'POST'})
        .then(checkForResponseFault)
        .catch(() => { throw Error('Unable to save address') })
}


// updateShippingAddress and updateBillingAddress are separate commands to
// support other connectors that require different actions for saving a
// shipping vs. a billing address
// SFCC doesn't diferentiate between the two address types,
// so these commands do effectively the same thing
export const updateShippingAddress = (formValues) => (dispatch) => {
    return addAddress(formValues, 'shipping_address')
}

export const updateBillingAddress = (formValues) => (dispatch) => {
    return addAddress(formValues, 'billing_address')
}

export const initAccountDashboardPage = (url) => (dispatch) => { // eslint-disable-line
    return Promise.resolve()
}

export const initAccountAddressPage = () => (dispatch) => {
    const customerId = getCustomerID()

    return makeApiRequest(`/customers/${customerId}/addresses`, {method: 'GET'})
        .then((res) => res.json())
        .then(({data}) => {
            const addresses = data
                        .map(({
                            first_name,
                            last_name,
                            phone,
                            postal_code,
                            address1,
                            address2,
                            city,
                            state_code,
                            preferred,
                            country_code
                        }) => {

                            return {
                                firstname: first_name,
                                lastname: last_name,
                                telephone: phone,
                                postcode: postal_code,
                                addressLine1: address1,
                                addressLine2: address2,
                                default: preferred,
                                city,
                                countryId: country_code.toUpperCase(),
                                regionId: state_code
                            }
                        })

            return dispatch(receiveAccountAddressData(addresses))
        })
}
/* eslint-disable camelcase */
const handleAccountInfoData = ({first_name, last_name, login}) => (
    {
        names: `${first_name} ${last_name}`,
        email: login
    }
)
/* eslint-enable camelcase */

export const initAccountInfoPage = () => (dispatch) => {
    const customerId = getCustomerID()
    return makeApiJsonRequest(`/customers/${customerId}`)
        .then((res) => dispatch(receiveAccountInfoData((handleAccountInfoData(res)))))
}


export const updateAccountInfo = ({names, email}) => (dispatch) => {
    const customerId = getCustomerID()
    const {firstname, lastname} = splitFullName(names)

    const requestBody = {
        first_name: firstname,
        last_name: lastname,
        email
    }

    return makeApiJsonRequest(`/customers/${customerId}`, requestBody, {method: 'PATCH'})
        .then(checkForResponseFault)
        .then((res) => dispatch(receiveAccountInfoData((handleAccountInfoData(res)))))
        .catch(() => {
            throw new SubmissionError({_error: 'Account Info Update Failed'})
        })
}

export const updateAccountPassword = ({currentPassword, newPassword}) => (dispatch) => {
    const customerId = getCustomerID()
    const requestBody = {
        current_password: currentPassword,
        password: newPassword
    }

    // NOTE: res.json() on a successful PUT throws
    // "Uncaught (in promise) SyntaxError: Unexpected end of JSON input"
    // because it returns an empty response, thus we need to use res.text()
    return makeApiRequest(`/customers/${customerId}/password`, {method: 'PUT', body: JSON.stringify(requestBody)})
        .then((res) => res.text())
        .then((responseString) => {
            if (!responseString.length) {
                return Promise.resolve()
            }

            const res = JSON.parse(responseString)

            if (res.fault && res.fault.type === 'InvalidCustomerException') {
                return new SubmissionError({_error: 'Your session has expired'})
            }

            return checkForResponseFault(res)
        })
        .catch(() => {
            throw new SubmissionError({_error: 'Password Change Failed'})
        })
}

export const initWishlistPage = () => (dispatch) => {
    const customerID = getCustomerID()

    return makeApiRequest(`/customers/${customerID}/product_lists`, {method: 'GET'})
        .then((response) => response.json())
        .then(({data}) => {
            if (!data) {
                // wishlist is empty, handle the empty case
                dispatch(receiveWishlistData({
                    title: 'My Wish List'
                }))
                return dispatch(receiveWishlistUIData({contentLoaded: true}))
            }
            const wishlistResponse = data[0]
            const wishlistItems = parseWishlistProducts(wishlistResponse)
            const wishlistData = {
                products: wishlistItems,
                id: wishlistResponse.id
            }

            if (wishlistResponse.name) {
                wishlistData.title = wishlistResponse.name
            }

            return dispatch(fetchItemData(wishlistItems))
                .then(({updatedProducts}) => {
                    dispatch(receiveWishlistProductData(updatedProducts))
                    dispatch(receiveWishlistData(wishlistData))
                    dispatch(receiveWishlistUIData({contentLoaded: true}))

                })
        })
}

export const removeItemFromWishlist = (itemID, wishlistID, productId) => (dispatch) => {
    const customerID = getCustomerID()
    return makeApiRequest(`/customers/${customerID}/product_lists/${wishlistID}/items/${itemID}`, {method: 'DELETE'})
        .then((response) => response.text())
        .then((responseText) => {
            if (!responseText.length) {
                return Promise.resolve({})
            }

            return JSON.parse(responseText)
        })
        .then(checkForResponseFault)
        .then(() => dispatch(removeWishlistItem(productId)))
}

export const addToCartFromWishlist = ({productId, quantity, wishlistID, itemID}) => (dispatch) => {
    // add the item to the cart
    return dispatch(addToCart(productId, quantity))
        .then(() => dispatch(removeItemFromWishlistCommand(itemID, wishlistID, productId, quantity)))
}
