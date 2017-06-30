/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {isLocalStorageAvailable} from 'progressive-web-sdk/dist/utils/utils'

export const loadScript = ({id, src, onload, isAsync = true, onerror}) => {
    const script = document.createElement('script')

    // Setting UTF-8 as our encoding ensures that certain strings (i.e.
    // Japanese text) are not improperly converted to something else. We
    // do this on the vendor scripts also just in case any libs we
    // import have localized strings in them.
    script.charset = 'utf-8'
    script.async = isAsync
    script.id = id
    script.src = src
    if (typeof onload === 'function') {
        script.onload = onload
    }
    if (typeof onerror === 'function') {
        script.onerror = onerror
    }

    document.getElementsByTagName('body')[0].appendChild(script)
}

export const loadScriptAsPromise = ({id, src, onload, isAsync = true, rejectOnError = true}) => {
    return new Promise(
        (resolve, reject) => {

            const resolver = () => {
                if (typeof onload === 'function') {
                    onload()
                }
                resolve()
            }

            loadScript({
                id,
                src,
                onload: resolver,
                isAsync,
                onerror: rejectOnError ? reject : resolve
            })
        }
    )
}

export const prefetchLink = ({href}) => {
    const link = document.createElement('link')

    // Setting UTF-8 as our encoding ensures that certain strings (i.e.
    // Japanese text) are not improperly converted to something else. We
    // do this on the vendor scripts also just in case any libs we
    // import have localized strings in them.
    link.charset = 'utf-8'
    link.href = href
    link.rel = 'prefetch'

    document.getElementsByTagName('head')[0].appendChild(link)
}

const MESSAGING_PWA_CLIENT_PATH = 'https://webpush-cdn.mobify.net/pwa-messaging-client.js'

/**
 * Start the asynchronous loading and intialization of the Messaging client,
 * storing a Promise in window.Progressive.MessagingClientInitPromise that
 * is resolved when the load and initialization is complete. If either load
 * or init fails, the Promise is rejected.
 */
export const loadAndInitMessagingClient = (debug, siteId) => {
    // Creating an early promise that users of the Messaging Client can
    // chain means they don't need to poll for its existence
    let clientInitResolver
    let clientInitRejecter
    window.Progressive.MessagingClientInitPromise = new Promise((resolve, reject) => {
        clientInitResolver = resolve
        clientInitRejecter = reject
    })

    return () => loadScriptAsPromise({
        id: 'progressive-web-messaging-client',
        src: MESSAGING_PWA_CLIENT_PATH,
        rejectOnError: true
    })
        .then(() => {
            // We assume window.Progressive will exist at this point.
            const messagingClient = window.Progressive.MessagingClient || {}

            // If init is not a function, this will
            // throw, and the catch below will
            // cause the promise to reject with
            // the error.
            return messagingClient.init({
                debug,
                siteId
            }).then(clientInitResolver)
        })
        .catch((error) => {
            console.error(`Error loading ${MESSAGING_PWA_CLIENT_PATH}:`, error)
            clientInitRejecter(error)
            throw error
        })
}

const MESSAGING_PWA_SW_VERSION_PATH = 'https://webpush-cdn.mobify.net/pwa-serviceworker-version.json'
const messagingSWVersionKey = 'messagingServiceWorkerVersion'

/**
 * Kick off a fetch for the service worker version, returning a Promise
 * that resolves when the fetch is done.
 * @returns {*|Promise.<T>}
 */
export const updateMessagingSWVersion = () => {
    return fetch(MESSAGING_PWA_SW_VERSION_PATH)
        .then((response) => response.json())
        .then((versionData) => {
            // Persist the result in localStorage
            if (isLocalStorageAvailable() && versionData) {
                localStorage.setItem(
                    messagingSWVersionKey,
                    `${versionData.SERVICE_WORKER_CURRENT_VERSION || ''}_${versionData.SERVICE_WORKER_CURRENT_HASH || ''}`
                )
            }
            return versionData
        })
        // If the fetch or JSON-decode fails, just log.
        .catch((error) => { console.log(error) })
}

export const getMessagingSWVersion = () => localStorage.getItem(messagingSWVersionKey) || ''
