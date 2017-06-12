/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {getCart} from '../cart/commands'
import {parseLoginStatus} from './parser'
import {parseNavigation} from '../navigation/parser'
import {receiveFormKey} from '../actions'
import {CHECKOUT_SHIPPING_URL, CART_URL} from '../config'
import {getCookieValue} from '../../../utils/utils'
import {generateFormKeyCookie} from '../../../utils/magento-utils'
import {setPageFetchError} from 'progressive-web-sdk/dist/store/offline/actions'

import {
    receiveNavigationData,
    setCheckoutShippingURL,
    setCartURL,
    setLoggedIn
} from '../../results'

const requestCapturedDoc = () => {
    return window.Progressive.capturedDocHTMLPromise.then((initialCapturedDocHTML) => {
        const body = new Blob([initialCapturedDocHTML], {type: 'text/html'})
        const capturedDocResponse = new Response(body, {
            status: 200,
            statusText: 'OK'
        })

        return Promise.resolve(capturedDocResponse)
    })
}

let isInitialEntryToSite = true

export const fetchPageData = (url) => (dispatch) => {
    // AMP builds do not run in a browser and thus capturedDocHTMLPromise will
    // not be defined, so request the page normally
    const request = isInitialEntryToSite && window.Progressive.capturedDocHTMLPromise
                    ? requestCapturedDoc() : makeRequest(url)

    isInitialEntryToSite = false

    return request
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res
            const isLoggedIn = parseLoginStatus($response)
            dispatch(setLoggedIn(isLoggedIn))
            dispatch(receiveNavigationData(parseNavigation($, $response, isLoggedIn)))
            return res
        })
        .catch((error) => {
            console.info(error.message)
            if (error.name !== 'FetchError') {
                throw error
            } else {
                dispatch(setPageFetchError(error.message))
            }
        })
}

export const initApp = () => (dispatch) => {
    // Use the pre-existing form_key if it already exists
    const formKey = getCookieValue('form_key') || generateFormKeyCookie()
    dispatch(receiveFormKey(formKey))

    dispatch(setCheckoutShippingURL(CHECKOUT_SHIPPING_URL))
    dispatch(setCartURL(CART_URL))
    return dispatch(getCart())
}
