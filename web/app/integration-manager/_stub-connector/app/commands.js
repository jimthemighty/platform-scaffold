import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'

import {
    setPageFetchError
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
    const request = isInitialEntryToSite ? requestCapturedDoc() : makeRequest(url)
    isInitialEntryToSite = false

    return request
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res

            // Add global actions here

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

export const initApp = () => (dispatch) => Promise.resolve()
