/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    dismissButton: '.pw-push-messaging__default-ask-actions-dismiss',
    yesPlease: '.pw-push-messaging__default-ask-actions-accept'
}

const PushMessaging = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

PushMessaging.prototype.dismissDefaultAsk = function() {
    const self = this
    this.browser
        .log('Checking if Push Messaging is enabled')
        .element('css selector', selectors.dismissButton, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('Dismissing Push Messaging default ask')
                    .waitForElementVisible(selectors.dismissButton)
                    .click(selectors.dismissButton)
                    .waitForElementNotPresent(selectors.dismissButton)
            }
        })
    return this
}

PushMessaging.prototype.acceptDefaultAsk = function() {
    const self = this
    this.browser
        .log('Checking if Push Messaging is enabled')
        .element('css selector', selectors.yesPlease, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('Accepting Push Messaging default ask')
                    .waitForElementVisible(selectors.yesPlease)
                    .click(selectors.yesPlease)
                    .waitForElementNotPresent(selectors.yesPlease)
            }
        })
    return this
}

export default PushMessaging
