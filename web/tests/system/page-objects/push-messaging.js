/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    dismissButton: '.pw-push-messaging__default-ask-actions-dismiss'
}

const PushMessaging = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

PushMessaging.prototype.dismissDefaultAsk = function() {
    this.browser
        .log('Dismissing Push Messaging default ask')
        .waitForElementVisible(selectors.dismissButton)
        .click(selectors.dismissButton)

    return this
}

export default PushMessaging
