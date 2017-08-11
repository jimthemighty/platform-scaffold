/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {PATHS} from './constants'
import {ITEMS_PER_PAGE} from '../../containers/product-list/constants'

const API_HOST = 'https://hydemo-electronics.thinkwrap.com'
const API_TYPE = 'rest'
const API_VERSION = 'v2'

let config = {} // eslint-disable-line

export const registerConfig = (cfg) => {
    config = cfg
}

export const getBaseSiteId = () => config.baseSiteId
export const getCatalogId = () => config.catalogId[getBaseSiteId()]
export const getCatalogVersionId = () => config.catalogVersionId
export const getMenuConfig = () => config.menuConfig[getBaseSiteId()]
export const getApiEndPoint = () => `${API_HOST}/${API_TYPE}/${API_VERSION}/${getBaseSiteId()}`
export const getCatalogEndPoint = () => `${getApiEndPoint()}/catalogs/${getCatalogId()}/${getCatalogVersionId()}`
export const getAuthEndPoint = () => `${API_HOST}/authorizationserver/oauth/token`

export const getProductEndPoint = (productId) => `/products/${productId}?fields=FULL`
export const getCategoryEndPoint = (catId) => `/catalogs/${getCatalogId()}/${getCatalogVersionId()}/categories/${catId}`
export const getSearchEndPoint = (catId, page, sort) => `/products/search/?pageSize=${ITEMS_PER_PAGE}&currentPage=${page}&fields=FULL&query=:${sort}:allCategories:${catId}`

export const getImageType = (type) => config.imagesTypes[type]
export const getImageSize = (size) => config.imagesSizes[size]
export const getVariantQualifier = (variantType) => config.qualifiers[getBaseSiteId()][variantType]
export const getVariantType = (qualifier) => config.variants[getBaseSiteId()][qualifier]

export const getCategoryPath = (id) => `/${PATHS.CATEGORY}/${id}`

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

