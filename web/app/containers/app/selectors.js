/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {getFetchedPages} from 'progressive-web-sdk/dist/store/offline/selectors'
import {CURRENT_URL} from './constants'

export const getApp = createSelector(getUi, ({app}) => app)

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)
export const getCurrentPathKey = createSelector(getCurrentUrl, urlToPathKey)

export const hasFetchedCurrentPath = createHasSelector(getFetchedPages, getCurrentPathKey)

export const getSvgSprite = createGetSelector(getApp, 'sprite')
export const getHideApp = createGetSelector(getApp, 'hideApp')

export const getURLs = createGetSelector(getApp, 'urls')
export const getURL = (name) => createGetSelector(getURLs, name)

export const getCartURL = getURL('cart')
export const getCheckoutShippingURL = getURL('checkoutShipping')
