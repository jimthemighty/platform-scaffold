/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {buildQueryString} from '../../utils/utils'

const API_TYPE = 'shop'
const API_VERSION = 'v17_4'

export const SEARCH_URL = '/catalogsearch/result/?q=+'

let config = {}

export const registerConfig = (cfg) => {
    config = cfg
}

export const getSiteID = () => config.siteID
export const getSiteBaseURL = () => { return config.siteBaseURL ? config.siteBaseURL : '' }
export const atob = () => { return config.atob ? config.atob : window.atob }

export const getApiEndPoint = () => `${getSiteBaseURL()}/s/${getSiteID()}/dw/${API_TYPE}/${API_VERSION}`

export const getRequestHeaders = () => ({
    'Content-Type': 'application/json',
    'x-dw-client-id': config.clientID
})

export const getCategoryPath = (id) => `/s/${getSiteID()}/${id}`

const getBaseURL = () => `${getSiteBaseURL()}/on/demandware.store/Sites-${getSiteID()}-Site/default/`

export const getHomeURL = () => `${getBaseURL()}Home-Show`
export const getSignInURL = () => `${getBaseURL()}Account-Show`
export const getSignOutURL = () => `${getBaseURL()}Logout-Logout`
export const getCheckoutShippingURL = () => `${getBaseURL()}COShipping-Start`
export const getCartURL = () => `${getBaseURL()}Cart-Show`
export const getPaymentURL = () => `${getBaseURL()}COBilling-Start`
export const getConfirmationURL = () => `${getBaseURL()}COSummary-Submit`

export const buildSearchURL = (query) => `${SEARCH_URL}${buildQueryString(query)}`

export const configuredStorageAvailable = () => config.setItemInStorage && config.getItemInStorage && config.removeItemInStorage
export const setItemInStorage = (key, value) => config.setItemInStorage(key, value)
export const getItemInStorage = (key) => config.getItemInStorage(key)
export const removeItemInStorage = (key) => config.removeItemInStorage(key)
