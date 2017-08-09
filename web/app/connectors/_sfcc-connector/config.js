/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import engine from 'store/src/store-engine'
import sessionStorage from 'store/storages/sessionStorage'
import cookieStorage from 'store/storages/cookieStorage'

import {isSessionStorageAvailable} from 'progressive-web-sdk/dist/utils/utils'

import {buildQueryString} from '../../utils/utils'

const API_TYPE = 'shop'
const API_VERSION = 'v17_4'

export const SEARCH_URL = '/catalogsearch/result/'

let config = {}

export const registerConfig = (cfg) => {
    config = cfg
    if (!config.storageType) {
        config.storageType = isSessionStorageAvailable() ? sessionStorage : cookieStorage
    }
    config.storageInstance = engine.createStore([config.storageType])
}

export const getSiteID = () => config.siteID
export const getSiteBaseURL = () => { return config.siteBaseURL ? config.siteBaseURL : '' }

export const getApiEndPoint = () => `${getSiteBaseURL()}/s/${getSiteID()}/dw/${API_TYPE}/${API_VERSION}`

export const getRequestHeaders = () => ({
    'Content-Type': 'application/json',
    'x-dw-client-id': config.clientID
})

export const getCategoryPath = (id) => `/s/${getSiteID()}/${id}`

const getBaseURL = () => `${getSiteBaseURL()}/on/demandware.store/Sites-${getSiteID()}-Site/default/`

export const getHomeURL = () => `${getBaseURL()}Home-Show`
export const getSignInURL = () => `${getBaseURL()}Account-Show`
export const getDashboardURL = () => `${getBaseURL()}Account-Show?dashboard`
export const getSignOutURL = () => `${getBaseURL()}Logout-Logout`
export const getCheckoutShippingURL = () => `${getBaseURL()}COShipping-Start`
export const getCartURL = () => `${getBaseURL()}Cart-Show`
export const getWishlistURL = () => `${getBaseURL()}Wishlist-Show`
export const getPaymentURL = () => `${getBaseURL()}COBilling-Start`
export const getConfirmationURL = () => `${getBaseURL()}COSummary-Submit`
export const getAccountAddressURL = () => `${getBaseURL()}Address-List`
export const getAccountInfoURL = () => `${getBaseURL()}Account-EditProfile`

export const buildSearchURL = (query) => `${SEARCH_URL}${buildQueryString(query)}`

export const getStorage = () => config.storageInstance
