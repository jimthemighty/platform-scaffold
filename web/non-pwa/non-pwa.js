/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {init} from 'progressive-web-sdk/dist/non-pwa/messaging'

const configuration = {
    defaultAsk: {
        options: {
            body: 'Subscribe now to push notifications',
            yesButtonText: 'Yes, Please!',
            showOnPageCount: 1,
            deferOnDismissal: 0,
            channelName: 'shampoo'
        }
    }
}

const initNonPWA = () => init(configuration)

window.Mobify = window.Mobify || {}
window.Mobify.WebPush = window.Mobify.WebPush || {}
window.Mobify.WebPush.NonPWA = {
    // exported for possible testing
    configuration,
    initNonPWA
}
