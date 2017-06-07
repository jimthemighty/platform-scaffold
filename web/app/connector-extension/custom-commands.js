/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {privacyPageParser} from './privacy-parser'

export const isEmailAvailable = (email) => (dispatch) => {
    return makeJsonEncodedRequest(
            '/rest/default/V1/customers/isEmailAvailable',
            {customerEmail: email},
            {method: 'POST'}
        )
        .then((response) => response.text())
        .then((responseText) => {
            return /true/.test(responseText)
        })
}

const fetchPageData = (url) => (dispatch) => {
    console.log('sending request')
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            console.log('got response')
            const [$, $response] = res
            const data = privacyPageParser($, $response)
            console.log('data')
            console.log(data)
            // dispatch(receiveNavigationData(parseNavigation($, $response, isLoggedIn)))
            return res
        })
        .catch((error) => {
            console.info(error.message)
            if (error.name !== 'FetchError') {
                throw error
            } else {
                throw error
                // dispatch(setPageFetchError(error.message))
            }
        })
}

export const initPrivacyPage = (url) => (dispatch) => {
    console.log('yay')
    return dispatch(fetchPageData(url))
        .then(() => {
            // dispatch(setSigninLoaded())
        })
}


