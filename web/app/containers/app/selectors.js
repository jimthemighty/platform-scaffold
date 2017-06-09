/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

export const getApp = createSelector(getUi, ({app}) => app)

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)
export const getCurrentPathKey = createSelector(getCurrentUrl, urlToPathKey)

export const getIdFromPathKey = createSelector(getCurrentPathKey, (pathKey) => {
    // this is required since we are no longer keying products off of path key
    const pathKeyMatch = pathKey.match(/(?:2017refresh|product_id\/)(.*?)(?:\/|.html\/)/)
    return pathKey ? pathKeyMatch[1] : ''
})

// This will need to become more complicated when we handle more types of errors,
// but will do for now
export const getFetchError = createGetSelector(getApp, 'fetchError')
export const getFetchedPaths = createGetSelector(getApp, FETCHED_PATHS)
export const hasFetchedCurrentPath = createHasSelector(getFetchedPaths, getCurrentPathKey)

export const getSvgSprite = createGetSelector(getApp, 'sprite')
export const getHideApp = createGetSelector(getApp, 'hideApp')

export const getCheckoutShippingURL = createGetSelector(getApp, 'checkoutShippingURL')
export const getCartURL = createGetSelector(getApp, 'cartURL')
