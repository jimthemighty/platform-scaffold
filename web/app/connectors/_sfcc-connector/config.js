/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {buildQueryString} from '../../utils/utils'

const API_TYPE = 'shop'
const API_VERSION = 'v17_4'
const CLIENT_ID = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const CLIENT_PASSWORD = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const BUSINESS_MANAGER_USER = 'public-data-api-access'
const BUSINESS_MANAGER_PASSWORD = '6sL!LJOk'
const GRANT_TYPE = 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'

export const SEARCH_URL = '/catalogsearch/result/'

let config = {
    clientId: CLIENT_ID,
    clientPassword: CLIENT_PASSWORD,
    businessManagerUser: BUSINESS_MANAGER_USER,
    businessManagerPassword: BUSINESS_MANAGER_PASSWORD
}

export const registerConfig = (cfg) => {
    config = cfg
}

export const getSiteID = () => config.siteID


export const getApiEndPoint = () => `/s/${getSiteID()}/dw/${API_TYPE}/${API_VERSION}`
export const getOAuthEndPoint = () => `/dw/oauth2/access_token?client_id=${config.clientId}&grant_type=${GRANT_TYPE}`

export const getRequestHeaders = () => ({
    'Content-Type': 'application/json',
    'x-dw-client-id': config.clientID
})

export const getAuthHeaders = () => ({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${btoa(`${config.businessManagerUser}:${config.businessManagerPassword}:${config.clientPassword}`)}`,
})

export const getCategoryPath = (id) => `/s/${getSiteID()}/${id}`

const getBaseURL = () => `/on/demandware.store/Sites-${getSiteID()}-Site/default/`

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
