import { loadScriptAsPromise } from 'progressive-web-sdk/dist/utils/utils'

/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

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

export const isLocalStorageAvailable = () => {
    try {
        const x = '__test_key__'
        localStorage.setItem(x, x)
        localStorage.removeItem(x)
        return true
    } catch (e) {
        return false
    }
}

const MESSAGING_PWA_CLIENT_PATH = 'https://webpush-cdn.mobify.net/pwa-messaging-client.js'

// Creating an early promise that users of the Messaging Client can
// chain from means they don't need to poll for its existence
const logMessagingSetupError = () => console.error('`LoaderUtils.createGlobalMessagingClientInitPromise` must be called before `setupMessagingClient`')
let clientInitResolver = logMessagingSetupError
let clientInitRejecter = logMessagingSetupError
export const createGlobalMessagingClientInitPromise = (messagingEnabled) => {
    if (!messagingEnabled || window.Progressive.MessagingClientInitPromise) {
        return
    }

    window.Progressive.MessagingClientInitPromise = new Promise((resolve, reject) => {
        clientInitResolver = resolve
        clientInitRejecter = reject
    })
}

/**
 * Start the asynchronous loading and intialization of the Messaging client,
 * storing a Promise in window.Progressive.MessagingClientInitPromise that
 * is resolved when the load and initialization is complete. If either load
 * or init fails, the Promise is rejected.
 * @returns {Promise.<*>} the same Promise
 */
export const loadAndInitMessagingClient = (debug, siteId) => {
    loadScriptAsPromise({
        id: 'progressive-web-messaging-client',
        src: MESSAGING_PWA_CLIENT_PATH,
        rejectOnError: true
    })
        .then(() => (
            // We assume window.Progressive will exist at this point.
            window.Progressive.MessagingClient
                .init({debug, siteId})
                .then(clientInitResolver)
        ))
        /**
         * Potential errors:
         * - URIError thrown by `loadScriptAsPromise` rejection
         * - TypeError from `messagingClient.init` being undefined
         * - expected error if Messaging is unavailable on the device (i.e. Safari)
         */
        .catch(clientInitRejecter)

    return window.Progressive.MessagingClientInitPromise
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
            if (isLocalStorageAvailable()) {
                if (versionData) {
                    localStorage.setItem(
                        messagingSWVersionKey,
                        `${versionData.SERVICE_WORKER_CURRENT_VERSION || ''}_${versionData.SERVICE_WORKER_CURRENT_HASH || ''}`
                    )
                }

                // Update the sessionStorage marker that tells us we
                // successfully checked. See getMessagingSWVersion
                sessionStorage.setItem(
                    messagingSWVersionKey,
                    'checked'
                )
            }
            return versionData
        })
        // If the fetch or JSON-decode fails, just log.
        .catch((error) => { console.log(error) })
}

export const getMessagingSWVersion = () => {
    // Once per session (as defined by sessionStorage lifetime), update
    // the messaging service worker version data.
    if (isLocalStorageAvailable()) {
        // A string is available in sessionStorage if a previous
        // check for the version completed successfully.
        if (!sessionStorage.getItem(messagingSWVersionKey)) {
            updateMessagingSWVersion()
        }
    }
    return localStorage.getItem(messagingSWVersionKey) || ''
}
