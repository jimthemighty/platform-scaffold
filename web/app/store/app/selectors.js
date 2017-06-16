/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createSelector} from 'reselect'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getApp} from '../selectors'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {getFetchedPages} from 'progressive-web-sdk/dist/store/offline/selectors'
import {CURRENT_URL} from './constants'

export const getCurrentUrl = createGetSelector(getApp, CURRENT_URL)
export const getCurrentPathKey = createSelector(getCurrentUrl, urlToPathKey)

export const hasFetchedCurrentPath = createHasSelector(getFetchedPages, getCurrentPathKey)

