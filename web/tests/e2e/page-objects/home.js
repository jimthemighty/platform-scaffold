/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
const ENV = process.env.NODE_ENV || 'test'

const selectors = {
    wrapper: '.t-home__container',
    skipLinks: '.pw-skip-links',
    skipToMain: '.pw-skip-links__anchor:first-of-type',
    skipToNav: '.pw-skip-links__anchor:nth-child(2n)',
    skipToFooter: '.pw-skip-links__anchor:last-of-type',
    productListItem(index) {
        return `.t-home__category .t-home__category-section:nth-child(${index}) .pw--is-loaded`
    },
    email: '.pw-field__input'
}

const Home = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Home.prototype.openBrowserToHomepage = function() {
    if (ENV === 'production') {
        this.browser.url(process.env.npm_package_siteUrl)
    } else {
        console.log('Running preview.')
        this.browser.preview(process.env.npm_package_siteUrl, 'https://localhost:8443/loader.js')
    }
    this.browser
        .waitForElementVisible(selectors.wrapper)
        .assert.visible(selectors.wrapper)
}

Home.prototype.closeBrowser = function(browser) {
    if (ENV === 'debug') {
        console.log('Debugging, not closing browser')
    } else {
        browser.end()
    }
}

Home.prototype.navigateToProductList = function(PRODUCT_LIST_INDEX) {
    // Navigate from Home to ProductList
    this.browser
        .log(`Navigating to ProductList number: ${PRODUCT_LIST_INDEX}`)
        .waitForElementVisible(selectors.productListItem(PRODUCT_LIST_INDEX))
        .click(selectors.productListItem(PRODUCT_LIST_INDEX))
    return this
}

export default Home
