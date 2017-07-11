/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {init as initMessaging} from 'progressive-web-sdk/dist/non-pwa/messaging'

const messagingConfiguration = {
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

const init = () => {
    initMessaging(messagingConfiguration)
}

window.Mobify = window.Mobify || {}
window.Mobify.NonPWA = {
    // exported for possible testing
    messagingConfiguration,
    init
}
