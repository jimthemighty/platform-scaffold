/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable import/namespace */
/* eslint-disable import/named */

import {UI_NAME} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {browserHistory} from 'progressive-web-sdk/dist/routing'

import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import {createAction} from 'progressive-web-sdk/dist/utils/action-creation'

import {logout} from 'progressive-web-sdk/dist/integration-manager/account/commands'
import {
    setPageFetchError,
    clearPageFetchError,
    setOfflineModeStartTime,
    clearOfflineModeStartTime,
    trackOfflinePage,
    clearOfflinePages
} from 'progressive-web-sdk/dist/store/offline/actions'
import {sendOfflineModeUsedAnalytics, sendOfflinePageview} from 'progressive-web-sdk/dist/analytics/actions'
import {OFFLINE_ASSET_URL} from './constants'
import {closeModal} from 'progressive-web-sdk/dist/store/modals/actions'
import {isModalOpen} from 'progressive-web-sdk/dist/store/modals/selectors'
import {addNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {getOfflineModeStartTime, getOfflinePageViews} from 'progressive-web-sdk/dist/store/offline/selectors'
import {OFFLINE_MODAL} from '../../modals/constants'
import {isRunningInAstro, trigger} from '../../utils/astro-integration'
import {getCartURL} from './selectors'


export const updateSvgSprite = createAction('Updated SVG sprite', ['sprite'])
export const toggleHideApp = createAction('Toggling the hiding of App', ['hideApp'])
export const setStandAloneAppFlag = createAction('Set Standalone app flag', ['standaloneApp'])


const sendOfflineAnalytics = (offlineModeStartTime) => (dispatch, getState) => {
    const timestamp = Date.now()
    const offlineModeDuration = timestamp - offlineModeStartTime
    const pagesViewed = getOfflinePageViews(getState()).toJS()

    pagesViewed.forEach(({routeName, inCache, title, url}) => {
        dispatch(sendOfflinePageview(url, routeName, title, inCache))
    })

    dispatch(sendOfflineModeUsedAnalytics(offlineModeDuration, timestamp, pagesViewed))
}

const startOfflineTimer = (offlineModeStartTime) => (dispatch) => {
    // set offline mode start time if we haven't already
    if (!offlineModeStartTime) {
        dispatch(setOfflineModeStartTime(Date.now()))
    }
}

/**
 * Make a separate request that is intercepted by the worker. The worker will
 * return a JSON object where `{offline: true}` if the request failed, which we
 * can use to detect if we're offline.
 */
export const checkIfOffline = (url, routeName) => (dispatch, getState) => {
    // we need to cachebreak every request to ensure we don't get something
    // stale from the disk cache on the device - the CDN will ignore query
    // parameters for this asset, however
    const currentState = getState()
    const offlineModeStartTime = getOfflineModeStartTime(currentState)
    return fetch(`${OFFLINE_ASSET_URL}?${Date.now()}`, {
        cache: 'no-store'
    })
        .then((response) => response.json())
        .then((json) => {
            if (json.offline) {
                dispatch(setPageFetchError('Network failure, using worker cache'))
                dispatch(startOfflineTimer(offlineModeStartTime))
                dispatch(trackOfflinePage({url, routeName, title: window.document.title}))
            } else {
                // if we have an offline mode start time then we're transitioning from offline to online
                // calculate the time we were offline for
                if (offlineModeStartTime) {
                    dispatch(sendOfflineAnalytics(offlineModeStartTime))
                    dispatch(clearOfflineModeStartTime())
                    dispatch(clearOfflinePages())
                }
                dispatch(clearPageFetchError())

                if (isModalOpen(OFFLINE_MODAL)(currentState)) {
                    dispatch(closeModal(OFFLINE_MODAL, UI_NAME.offline))
                }
            }
        })
        .catch((error) => {
            // In cases where we don't have the worker installed, this means
            // we indeed have a network failure, so switch on offline
            dispatch(setPageFetchError(error.message))
            dispatch(startOfflineTimer(offlineModeStartTime))
            dispatch(trackOfflinePage({url, routeName, title: window.document.title}))
        })
}

/**
 * Until the day that the `use` element's cross-domain issues are fixed, we are
 * forced to fetch the SVG Sprite's XML as a string and manually inject it into
 * the DOM. See here for details on the issue with `use`:
 * @URL: https://bugs.chromium.org/p/chromium/issues/detail?id=470601
 */
export const fetchSvgSprite = () => (dispatch) => {
    const spriteUrl = getAssetUrl('static/svg/sprite-dist/sprite.svg')
    return makeRequest(spriteUrl)
        .then((response) => response.text())
        .then((text) => dispatch(updateSvgSprite(text)))
}


export const signOut = () => (dispatch) => {
    return dispatch(logout())
        .then(() => browserHistory.push({pathname: '/'}))
        .then(() => {
            // Desktop's message includes 'redirect to home page' message
            // so we'll just hardcode a message instead
            dispatch(addNotification(
                'signedOutNotification',
                'You are now signed out'
            ))
        })
}

export const cartExpired = () => (dispatch) => {
    // navigate to homepage, show notification
    browserHistory.push({
        pathname: '/'
    })
    dispatch(addNotification(
        'cartUpdateError',
        'Your cart has expired.',
        true
    ))
}

export const handleCartExpiryError = (error) => (dispatch) => {
    if (error.message.includes('expired')) {
        return dispatch(cartExpired())
    }
    throw error
}

export const goToCheckout = () => (dispatch, getState) => {
    if (isRunningInAstro) {
        // If we're running in Astro, we want to dismiss open the cart modal,
        // otherwise, navigating is taken care of by the button press
        trigger('open:cart-modal')
    } else {
        browserHistory.push(getCartURL(getState()))
    }
}
