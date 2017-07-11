/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import process from 'process'
import Home from '../page-objects/home'
import PushMessaging from '../page-objects/push-messaging'

let home
let pushMessaging

const PRODUCT_LIST_INDEX = process.env.PRODUCT_LIST_INDEX || 2
const ENV = process.env.NODE_ENV || 'test'

export default {
    '@tags': ['messaging'],

    before: (browser) => {
        home = new Home(browser)
        pushMessaging = new PushMessaging(browser)
    },

    after: (browser) => {
        browser.end()
    },

    'Push Subscribe - Home': (browser) => {
        if (ENV === 'production') {
            browser.url(process.env.npm_package_siteUrl)
        } else {
            console.log('Running preview against siteUrl.')
            browser.preview()
        }
        browser
            .waitForElementVisible(home.selectors.wrapper)
            .assert.visible(home.selectors.wrapper)
    },

    'Push Subscribe - Navigate and Accept Default Ask': () => {
        home.navigateToProductList(PRODUCT_LIST_INDEX)

        // This is the second page view, the DefaultAsk should be visible
        // by this point.
        pushMessaging
            .acceptDefaultAsk()
            .assertSubscribed()
    }
}
