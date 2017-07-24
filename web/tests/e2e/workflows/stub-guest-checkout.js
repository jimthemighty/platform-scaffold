/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import process from 'process'
import Home from '../page-objects/home'
import ProductList from '../page-objects/product-list'
import ProductDetails from '../page-objects/product-details'
import Cart from '../page-objects/cart'
import PushMessaging from '../page-objects/push-messaging'

let home
let productList
let productDetails
let cart
let pushMessaging

const PRODUCT_LIST_INDEX = process.env.PRODUCT_LIST_INDEX || 2
const PRODUCT_INDEX = process.env.PRODUCT_INDEX || 1
const ENV = process.env.NODE_ENV || 'test'

export default {
    '@tags': ['stub'],

    before: (browser) => {
        home = new Home(browser)
        productList = new ProductList(browser)
        productDetails = new ProductDetails(browser)
        cart = new Cart(browser)
        pushMessaging = new PushMessaging(browser)
    },

    after: (browser) => {
        browser.end()
    },

    // The following tests are conducted in sequence within the same session.
    'Checkout - Guest - Navigate to Home': (browser) => {
        if (ENV === 'production') {
            browser.url(process.env.npm_package_siteUrl)
        } else {
            console.log('Running preview.')
            browser.preview(process.env.npm_package_siteUrl, 'https://localhost:8443/loader.js')
        }
        browser
            .waitForElementVisible(home.selectors.wrapper)
            .assert.visible(home.selectors.wrapper)
    },

    'Checkout - Guest - Navigate from Home to ProductList': (browser) => {
        home.navigateToProductList(PRODUCT_LIST_INDEX)
        browser
            .waitForElementVisible(productList.selectors.productListTemplateIdentifier)
            .assert.visible(productList.selectors.productListTemplateIdentifier)

        // This is the second page view, the DefaultAsk should be visible and
        // dismissable by this point.
        pushMessaging.dismissDefaultAsk()
    },

    'Checkout - Guest - Navigate from ProductList to ProductDetails': (browser) => {
        productList.navigateToProductDetails(PRODUCT_INDEX)
        browser
            .waitForElementVisible(productDetails.selectors.productDetailsTemplateIdentifier)
            .assert.visible(productDetails.selectors.productDetailsTemplateIdentifier)
    },

    'Checkout - Guest - Add item to Shopping Cart': () => {
        productDetails.addItemToCart()
    },

    'Checkout - Guest - Navigate from ProductDetails to Cart': (browser) => {
        if (productDetails.inStock) {
            productDetails.navigateToCart()
            browser
                .waitForElementVisible(cart.selectors.cartTemplateIdentifier)
                .assert.visible(cart.selectors.cartTemplateIdentifier)
        } else {
            browser.log(`Item is out of stock. Try changing PRODUCT_INDEX. It is currently ${PRODUCT_INDEX}`)
        }
    }
}
