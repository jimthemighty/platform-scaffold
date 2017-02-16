const selectors = {
    wrapper: '.t-home__container',
    skipLinks: '.pw-skip-links',
    skipToMain: '.pw-skip-links__anchor:first-of-type',
    skipToNav: '.pw-skip-links__anchor:nth-child(2n)',
    skipToFooter: '.pw-skip-links__anchor:last-of-type',
    plpItem(index) {
        return `.t-home__category .t-home__category-section:nth-child(${index}) .pw--is-loaded`
    }
}

const Home = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Home.prototype.navigateToProductList = function(PRODUCT_LIST_INDEX) {
    // Navigate from Home to ProductList
    this.browser
        .log('Navigating to ProductList')
        .waitForAjaxCompleted()
        .waitForElementVisible(selectors.plpItem(PRODUCT_LIST_INDEX))
        .click(selectors.plpItem(PRODUCT_LIST_INDEX))
        .waitUntilMobified()
    return this
}

export default Home
