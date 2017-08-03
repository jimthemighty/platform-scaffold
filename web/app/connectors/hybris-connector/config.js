/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const API_HOST = 'https://hydemo-electronics.thinkwrap.com'
const API_TYPE = 'rest'
const API_VERSION = 'v2'

let config = {} // eslint-disable-line

export const registerConfig = (cfg) => {
    config = cfg
}

export const getBaseSiteId = () => config.baseSiteId
export const getCatalogId = () => config.catalogId
export const getCatalogVersionId = () => config.catalogVersionId
export const getMenuConfig = () => config.menuConfig
export const getApiEndPoint = () => `${API_HOST}/${API_TYPE}/${API_VERSION}/${getBaseSiteId()}`
export const getCatalogEndPoint = () => `${getApiEndPoint()}/catalogs/${getCatalogId()}/${getCatalogVersionId()}`
export const getAuthEndPoint = () => `${API_HOST}/authorizationserver/oauth/token`

export const getCategoryPath = (id) => `/s/${getBaseSiteId()}/${id}`

export const getCartURL = () => '/checkout/cart/'
export const getCheckoutShippingURL = () => '/x1'
export const getConfirmationURL = () => '/x2'
export const getDashboardURL = () => '/x3'
export const getHomeURL = () => '/'
export const getMyAccountURL = () => '/x5'
export const getPaymentURL = () => '/x6'
export const getSignInURL = () => '/customer/account/login/'
export const getSignOutURL = () => '/x7'
export const getWishlistURL = () => '/wishlist/'

// export const buildSearchURL = (query) => `${SEARCH_URL}${buildQueryString(query)}`


export const getRequestHeaders = () => ({
    'Content-Type': 'application/x-www-form-urlencoded',
})

export const getAuthHeaders = () => ({
    'Content-Type': 'application/x-www-form-urlencoded',
})

