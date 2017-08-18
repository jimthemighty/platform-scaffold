/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {initHybrisAuth, isUserLoggedIn} from '../utils'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {getCart} from '../cart/commands'
import {getCartURL, getCatalogEndPoint, getMenuConfig, getHomeURL, getMyAccountURL, getRequestHeaders, getSignInURL, getWishlistURL} from '../config'
import {parseCategories} from '../parsers'

import {
    receiveNavigationData,
    setCheckoutShippingURL,
    setCartURL,
    setSignInURL,
    setWishlistURL
} from 'progressive-web-sdk/dist/integration-manager/results'

import {
    ACCOUNT_NAV_ITEM,
    SIGNED_OUT_ACCOUNT_NAV_ITEM,
    GUEST_NAV,
    LOGGED_IN_NAV
} from '../../../modals/navigation/constants'

const fetchCategories = (menuItems) => {
    const requestOptions = {
        headers: getRequestHeaders()
    }
    return makeRequest(`${getCatalogEndPoint()}`, requestOptions)
        .then((response) => response.json())
        .then(({categories}) => categories)
}

export const fetchNavigationData = () => (dispatch) => {
    const requestOptions = {
        headers: getRequestHeaders()
    }
    let navData = []
    const menuItems = getMenuConfig() || []

    // Use menu configuration to display categories
    menuItems.reduce((p, menuItem) => {
        return p.then(() => {
            return makeRequest(`${getCatalogEndPoint()}/categories/${menuItem.id}`, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    const node = menuItem.displayAsNode ? [json] : json.subcategories
                    navData = navData.concat(parseCategories(node))
                })
        })
    }, Promise.resolve())
        // If there isn't any menu configuration, use categories as the are stored in hybris
        .then(() => {
            if (navData.length) {
                return Promise.resolve()
            } else {
                return fetchCategories()
                    .then((categories) => {
                        for (const cat of categories) {
                            if (typeof cat.name !== 'undefined') {
                                navData = navData.concat(parseCategories([cat]))
                            }
                        }
                    })
            }
        })
        .then(() => {
            const isLoggedIn = isUserLoggedIn()
            const accountNode = [
                {
                    type: isLoggedIn ? ACCOUNT_NAV_ITEM : SIGNED_OUT_ACCOUNT_NAV_ITEM,
                    title: 'My Account',
                    options: {
                        icon: 'user',
                        className: 'u-margin-top-md u-border-top'
                    },
                    path: getMyAccountURL()
                },
                {
                    type: isLoggedIn ? ACCOUNT_NAV_ITEM : SIGNED_OUT_ACCOUNT_NAV_ITEM,
                    title: 'Wishlist',
                    options: {
                        icon: 'star'
                    },
                    path: getWishlistURL()
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
            const navigationData = {
                path: '/',
                root: {
                    title: 'Root',
                    path: getHomeURL(),
                    children: navData.concat(accountNode)
                }
            }
            return dispatch(receiveNavigationData(navigationData))
        })
}

export const initApp = () => (dispatch) => {
    return initHybrisAuth()
        .then(() => dispatch(fetchNavigationData()))
        .then(() => {
            // For more information on the shape of the expected data,
            // see https://docs.mobify.com/progressive-web/latest/components/#!/Nav
            dispatch(getCart())
            dispatch(setCartURL(getCartURL()))
            dispatch(setWishlistURL(getWishlistURL()))
            dispatch(setSignInURL(getSignInURL()))
            // dispatch(setCheckoutShippingURL(getCheckoutShippingURL()))
            return Promise.resolve()

        })
}

