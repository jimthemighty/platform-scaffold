/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import process from 'process'
import Home from '../page-objects/home'
import ProductList from '../page-objects/product-list'
import ProductDetails from '../page-objects/product-details'
import Cart from '../page-objects/cart'
import Checkout from '../page-objects/checkout'
import PushMessaging from '../page-objects/push-messaging'

let home
let productList
let productDetails
let cart
let checkout
let pushMessaging

const PRODUCT_LIST_INDEX = process.env.PRODUCT_LIST_INDEX || 2
const PRODUCT_INDEX = process.env.PRODUCT_INDEX || 1
const ENV = process.env.NODE_ENV || 'test'

export default {
    '@tags': ['checkout'],

    before: (browser) => {
        home = new Home(browser)
        productList = new ProductList(browser)
        productDetails = new ProductDetails(browser)
        cart = new Cart(browser)
        checkout = new Checkout(browser)
        pushMessaging = new PushMessaging(browser)
    },

    after: () => {
        // cart.removeItems()
        Home.prototype.closeBrowser()
    },

    // The following tests are conducted in sequence within the same session.

    'Checkout - Registered - Navigate to Home': () => {
        home.openBrowserToHomepage()
    },

    'Checkout - Registered - Navigate from Home to ProductList': (browser) => {
        home.navigateToProductList(PRODUCT_LIST_INDEX)
        browser
            .waitForElementVisible(productList.selectors.productListTemplateIdentifier)
            .assert.visible(productList.selectors.productListTemplateIdentifier)

        // This is the second page view, the DefaultAsk should be visible and
        // dismissable by this point.
        pushMessaging.dismissDefaultAsk()
    },

    'Checkout - Registered - Navigate from ProductList to ProductDetails': (browser) => {
        productList.navigateToProductDetails(PRODUCT_INDEX)
        browser
            .waitForElementVisible(productDetails.selectors.productDetailsTemplateIdentifier)
            .assert.visible(productDetails.selectors.productDetailsTemplateIdentifier)
    },

    'Checkout - Registered - Add item to Shopping Cart': () => {
        productDetails.addItemToCart()
    },

    'Checkout - Registered - Navigate from ProductDetails to Cart': (browser) => {
        if (productDetails.inStock) {
            productDetails.navigateToCart()
            browser
                .waitForElementVisible(cart.selectors.cartTemplateIdentifier)
                .assert.visible(cart.selectors.cartTemplateIdentifier)
        } else {
            browser.log(`Item is out of stock. Try changing PRODUCT_INDEX. It is currently ${PRODUCT_INDEX}`)
        }
    },

    'Checkout - Registered - Navigate from Cart to Checkout': (browser) => {
        if (productDetails.inStock) {
            cart.navigateToCheckout()
            browser
                .waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier)
                .assert.visible(checkout.selectors.checkoutTemplateIdentifier)
                // Email field should have email input type
                .waitForElementVisible(`${checkout.selectors.email}[type="email"]`)
        }
    },

    'Checkout - Registered - Continue to Registered Checkout': (browser) => {
        if (productDetails.inStock) {
            checkout.continueAsRegistered()
            browser
                .waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier)
                .assert.visible(checkout.selectors.checkoutTemplateIdentifier)
        }
    },

    'Checkout - Registered - Choose shipping info': (browser) => {
        if (productDetails.inStock) {
            checkout.chooseShippingInfo()
            browser.waitForElementVisible(`${checkout.selectors.addressListOption} .pw--checked`)
        }
    },

    'Checkout - Registered - Fill out Registered Checkout Payment Details form': (browser) => {
        if (productDetails.inStock) {
            checkout.continueToPayment()
            checkout.fillPaymentInfo()
            browser
                .waitForElementVisible(checkout.selectors.cvv)
                .assert.valueContains(checkout.selectors.cvv, checkout.userData.cvv)
        }
    },

    'Checkout - Registered - Verify Submit Order button is visible': (browser) => {
        if (productDetails.inStock) {
            browser
                .waitForElementVisible(checkout.selectors.placeOrder)
                .assert.visible(checkout.selectors.placeOrder)
        }
    }
}
