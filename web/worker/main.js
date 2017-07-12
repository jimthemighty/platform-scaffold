/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import {worker, getToolbox} from 'progressive-web-sdk/dist/worker/main'

// Check if we're in PWA mode or not. The pwa parameter in the URL used
// to register this worker will tell us. We reverse the logic here, so that
// if the URL does not contain a PWA parameter, we assume pwa mode as the
// default. If we're in PWA mode, init the PWA worker. In non-PWA mode,
// the PWA worker code is still loaded, but does nothing. This allows us
// to use the same worker code in both modes.
if (!/pwa=0/.test(self.location.toString())) {
    worker({
        slug: PROJECT_SLUG,
        isDebug: DEBUG
    })
}

// Load the Messaging worker code, unless we're running under Astro
import isRunningIn from '../app/vendor/astro-detect'
if (!isRunningIn.app()) {
    try {
        // We always load the latest version of the Messaging worker code.
        // If the version changes, then the URL used to register
        // this worker code will change, prompting a re-download of the
        // new code.
        self.importScripts('https://webpush-cdn.mobify.net/pwa-messaging-service-worker.js')

        // We must pass the *same* toolbox module instance to the
        // Messaging worker as is used in the PWA support code. The
        // Messaging worker script is webpacked separately, so it
        // has its own copies of imported modules.
        self.MessagingServiceWorker.messagingWorkerMain(
            {
                toolbox: getToolbox(),
                isDebug: DEBUG
            }
        )
    } catch (e) {
        console.log(`Error importing/initializing Messaging service worker: ${e}`)
    }
}
