import Home from '../page-objects/home'
import PLP from '../page-objects/plp'
import PDP from '../page-objects/pdp'
import Cart from '../page-objects/cart'
import Checkout from '../page-objects/checkout'

let home
let plp
let pdp
let cart
let checkout

export default {
    '@tags': ['checkout'],

    before: (browser) => {
        home = new Home(browser)
        plp = new PLP(browser)
        pdp = new PDP(browser)
        cart = new Cart(browser)
        checkout = new Checkout(browser)
    },

    after: (browser) => {
        browser.end()
    },

    'Checkout - Registered - Step 1 - Navigate to Home': (browser) => {
        browser.preview()
        browser.waitForElementVisible(home.selectors.homeTemplateIdentifier)
        browser.assert.visible(home.selectors.homeTemplateIdentifier)
    },

    'Checkout - Registered - Step 2 - Navigate from Home to PLP': (browser) => {
        home.navigateToPLP()
        browser.waitForElementVisible(plp.selectors.plpTemplateIdentifier)
        browser.assert.visible(plp.selectors.plpTemplateIdentifier)
    },

    'Checkout - Registered - Step 3 - Navigate from PLP to PDP': (browser) => {
        plp.navigateToPDP()
        browser.waitForElementVisible(pdp.selectors.pdpTemplateIdentifier)
        browser.assert.visible(pdp.selectors.pdpTemplateIdentifier)
    },

    'Checkout - Registered - Step 4 - Add item to Shopping Cart': (browser) => {
        pdp.addItemToCart()
        browser.waitForElementVisible(pdp.selectors.cartIconTemplateIdentifier)
        browser.assert.visible(pdp.selectors.cartIconTemplateIdentifier)
    },

    'Checkout - Registered - Step 5 - Navigate from PDP to Shopping Cart': (browser) => {
        pdp.navigateToCart()
        browser.waitForElementVisible(cart.selectors.cartTemplateIdentifier)
        browser.assert.visible(cart.selectors.cartTemplateIdentifier)
    },

    'Checkout - Registered - Step 6 - Navigate from Shopping Cart to Checkout Sign In or Continue as Guest page': (browser) => {
        cart.navigateToCheckout()
        browser.waitForElementVisible(checkout.selectors.checkoutAccountTemplateIdentifier)
        browser.assert.visible(checkout.selectors.checkoutAccountTemplateIdentifier)
    },

    'Checkout - Registered - Step 7 - Continue to Registered Checkout': (browser) => {
        checkout.continueAsRegistered()
        browser.waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier)
        browser.assert.visible(checkout.selectors.checkoutTemplateIdentifier)
    },

    'Checkout - Registered - Step 8 - Fill out Registered Checkout Payment Details form': (browser) => {
        checkout.fillPaymentDetails()
        browser.waitForElementVisible(checkout.selectors.lastPaymentDetail)
        browser.assert.containsValue(checkout.selectors.lastPaymentDetail, checkout.userData.lastPaymentDetail)
    },

    'Checkout - Registered - Step 9 - Verify Submit Order button is visible': (browser) => {
        browser.waitForElementVisible(checkout.selectors.submitOrder)
        browser.assert.visible(checkout.selectors.submitOrder)
    }
}
