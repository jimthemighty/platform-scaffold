/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {getFetchedPages} from 'progressive-web-sdk/dist/store/offline/selectors'
import {getURLWithoutQuery} from '../../utils/utils'
import {CURRENT_URL} from './constants'

export const getApp = createSelector(getUi, ({app}) => app)

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)
export const getCurrentPathKey = createSelector(getCurrentUrl, urlToPathKey)
export const getCurrentPathKeyWithoutQuery = createSelector(getCurrentPathKey, getURLWithoutQuery)

export const hasFetchedCurrentPath = createHasSelector(getFetchedPages, getCurrentPathKey)

export const getSvgSprite = createGetSelector(getApp, 'sprite')
export const getHideApp = createGetSelector(getApp, 'hideApp')

export const getCheckoutShippingURL = createGetSelector(getApp, 'checkoutShippingURL')
export const getCartURL = createGetSelector(getApp, 'cartURL')
