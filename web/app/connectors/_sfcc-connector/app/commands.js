/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as utils from '../utils'
import {
    receiveNavigationData,
    receiveSearchSuggestions,
    setLoggedIn,
    setCheckoutShippingURL,
    setCartURL
} from 'progressive-web-sdk/dist/integration-manager/results'
import {receiveUserEmail} from 'progressive-web-sdk/dist/integration-manager/checkout/results'
import {parseCategories, parseSearchSuggestions} from '../parsers'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

import {getSignInURL, getCheckoutShippingURL, getCartURL, buildSearchURL} from '../config'
import {
    ACCOUNT_LINK,
    SIGNED_OUT_ACCOUNT_LINK,
    GUEST_NAV,
    LOGGED_IN_NAV
} from '../../../modals/navigation/constants'


export const fetchNavigationData = () => (dispatch) => {
    return utils.makeUnAuthenticatedApiRequest('/categories/root?levels=2', {method: 'GET'})
        .then((response) => response.json())
        .then(({categories}) => {
            const navData = parseCategories(categories)

            const isLoggedIn = utils.isUserLoggedIn(utils.getAuthToken())
            const accountNode = [
                {
                    type: isLoggedIn ? ACCOUNT_LINK : SIGNED_OUT_ACCOUNT_LINK,
                    title: 'My Account',
                    options: {
                        icon: 'user',
                        className: 'u-margin-top-md u-border-top'
                    },
                    path: '/customer/account/'
                },
                {
                    type: isLoggedIn ? ACCOUNT_LINK : SIGNED_OUT_ACCOUNT_LINK,
                    title: 'Wishlist',
                    options: {
                        icon: 'star'
                    },
                    path: '/wishlist/'
                },
                {
                    ...(isLoggedIn ? LOGGED_IN_NAV : GUEST_NAV),
                    options: {
                        icon: isLoggedIn ? 'lock' : 'user',
                        className: !isLoggedIn ? 'u-margin-top-md u-border-top' : ''
                    },
                    path: getSignInURL()
                }
            ]

            return dispatch(receiveNavigationData({
                path: '/',
                root: {
                    title: 'root',
                    path: '/',
                    children: navData.concat(accountNode)
                }
            }))
        })
}

export const getSearchSuggestions = (query) => (dispatch) => {
    // SFCC API requires min length of 3
    if (query.length < 3) {
        return dispatch(receiveSearchSuggestions(null))
    }
    const queryURL = `/search_suggestion?q=${query}`
    return utils.makeApiRequest(queryURL)
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveSearchSuggestions(parseSearchSuggestions(responseJSON))))
}

export const searchProducts = (query) => (dispatch) => {
    browserHistory.push({pathname: buildSearchURL(query)})
}

export const initApp = () => (dispatch) => {
    return utils.initSfccAuthAndSession()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => {
            const customerData = utils.getCustomerData(utils.getAuthToken())
            dispatch(setCheckoutShippingURL(getCheckoutShippingURL()))
            dispatch(setCartURL(getCartURL()))
            if (!customerData.guest) {
                dispatch(setLoggedIn(true))
                return utils.makeApiRequest(`/customers/${customerData.customer_id}`, {method: 'GET'})
                    .then((response) => response.json())
                    .then(({email}) => {
                        return dispatch(receiveUserEmail(email))
                    })
            }

            return dispatch(setLoggedIn(false))
        })
}
