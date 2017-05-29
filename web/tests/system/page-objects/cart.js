/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    miniCart: '.qa-header__cart',
    viewCart: '.t-mini-cart__content .c--tertiary',
    cartTemplateIdentifier: '.t-cart.t--loaded',
    cartCheckout: '.qa-cart__checkout',
    removeItem: '.qa-cart__remove-item',
    confirmRemove: '.t-cart__remove-item-confirmation-modal .c--secondary',
    emptyCart: '.t-cart__empty',
    emptyMiniCart: '.t-mini-cart__empty-content'
}

const Cart = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Cart.prototype.navigateToCheckout = function() {
    // Navigate from Cart to Checkout
    this.browser
        .log('Navigating to Checkout')
        .waitForElementVisible(selectors.cartCheckout)
        .click(selectors.cartCheckout)
        .waitUntilMobified()
    return this
}

Cart.prototype.removeItems = function() {
    // Remove all items from the cart
    const self = this
    this.browser
        .preview()
        .log('Opening mini cart')
        .waitForElementVisible(selectors.miniCart)
        .click(selectors.miniCart)
        .element('css selector', selectors.viewCart, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('View cart')
                    .click(selectors.viewCart)
                    .log('Removing item from cart')
                    .trigger(selectors.removeItem)
                    .waitForElementVisible(selectors.confirmRemove)
                    .click(selectors.confirmRemove)
                    .waitUntilMobified()
                    .waitForElementVisible(selectors.emptyCart)
                self.removeItems()
            }
        })
        .waitForElementVisible(selectors.emptyMiniCart)
    return this
}

export default Cart
