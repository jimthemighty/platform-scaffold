/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import {buildQueryString} from '../../utils/utils'

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
export const getRegions = () => config.regions[getBaseSiteId()]
export const getApiEndPoint = () => `${API_HOST}/${API_TYPE}/${API_VERSION}/${getBaseSiteId()}`
export const getCatalogEndPoint = () => `${getApiEndPoint()}/catalogs/${getCatalogId()}/${getCatalogVersionId()}`
export const getAuthEndPoint = () => `${API_HOST}/authorizationserver/oauth/token`

export const getProductEndPoint = (productId) => `/products/${productId}?fields=FULL`
export const getCategoryEndPoint = (catId) => `/catalogs/${getCatalogId()}/${getCatalogVersionId()}/categories/${catId}`
export const getSearchEndPoint = (catId, page, sort, filters) =>
    `/products/search/?pageSize=${ITEMS_PER_PAGE}&currentPage=${page}&fields=FULL&query=:${sort}:allCategories:${catId}${filters}`
export const getFreeTextSearchEndPoint = (searchTerm, page, sort, filters) =>
    `/products/search/?pageSize=${ITEMS_PER_PAGE}&currentPage=${page}&fields=FULL&query=${searchTerm}:${sort}${filters}`
export const getSearchSuggestionsEndPoint = (searchTerm) => `/products/suggestions?term=${searchTerm}&fields=FULL`

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
export const getMyAccountURL = () => '/customer/account'
export const getPaymentURL = () => '/x6'
export const getSignInURL = () => '/customer/account/login/'
export const getSignOutURL = () => '/x7'
export const getWishlistURL = () => '/wishlist/'
export const getSearchURL = () => '/search/'

export const buildSearchURL = (query) => `${getSearchURL()}${buildQueryString(query)}`


export const getRequestHeaders = () => ({
    'Content-Type': 'application/x-www-form-urlencoded',
})

export const getAuthHeaders = () => ({
    'Content-Type': 'application/x-www-form-urlencoded',
})

