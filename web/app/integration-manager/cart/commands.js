/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'
import {EVENT_ACTION, Product, ShoppingList} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {getCartSummaryCount, getSubtotal, getCartItems} from '../../store/cart/selectors'

let connector = {}

export const register = (commands) => {
    connector = commands
}
/**
 * Initializes any required data for the Cart page
 * @function
 * @param {string} url The url of the current page
 * @param {string} routeName The route name of the current page
 */
export const initCartPage = (url, routeName) => connector.initCartPage(url, routeName)

/**
 * Retrieves the current cart information.
 * @function
 */
export const getCart = () => connector.getCart()

const createCartAction = createActionWithAnalytics(
    'Add to cart complete',
    ['cart_count'],
    EVENT_ACTION.addToCart,
    (cartCount, subtotal, addedItem) => ({
        cart: {
            [ShoppingList.TYPE]: 'cart',
            [ShoppingList.COUNT]: cartCount,
            [ShoppingList.SUBTOTAL]: subtotal
        },
        product: addedItem
    })
)

/**
 * Adds a product to the cart
 * @function
 * @param productId {string} The product's ID
 * @param quantity {number} The quantity to add
 */
export const addToCart = (productId, quantity) => (dispatch, getState) => {
    return dispatch(connector.addToCart(productId, quantity)).then((cart) => {
        const currentState = getState()
        const cartCount = getCartSummaryCount(currentState) + quantity
        const subtotal = getSubtotal(currentState)

        const cartItems = getCartItems(currentState)

        let matchedProduct = {}
        if (cartItems) {
            const matchedItem = cartItems.find((item) => (item.id === productId))
            if (matchedItem) {
                matchedProduct = {
                    [Product.ID]: matchedItem.id,
                    [Product.NAME]: matchedItem.title,
                    [Product.PRICE]: matchedItem.price
                }
            }
        }

        // find the cartItems that have the same productId
        const cartAction = createCartAction(
            cartCount,
            subtotal,
            matchedProduct
        )
        dispatch(cartAction)

        return cart
    })

}

/**
 * Removes an item from the cart
 * @function
 * @param itemID {string} The cart item ID to remove
 */
export const removeFromCart = (itemID) => connector.removeFromCart(itemID)

/**
 * Updates the quantity of the given item in the cart
 * @function
 * @param itemID {string} The cart item ID to update
 * @param quantity {number} The new quantity
 */
export const updateItemQuantity = (itemID, quantity) => connector.updateItemQuantity(itemID, quantity)

/**
 * Add a product to the wishlist
 * @function
 * @param productId {string} The product's ID
 * @param productURL {strin} The URL of the product's detail page
 */
export const addToWishlist = (productId, productURL) => connector.addToWishlist(productId, productURL)

/**
 * Estimates taxes for a proposed address and shipping method
 * @function
 * @param address {object} The address to use for tax estimation
 * @param shippingMethod {string} The shipping method to use for tax estimation (connector-specific!)
 */
export const fetchTaxEstimate = (address, shippingMethod) => connector.fetchTaxEstimate(address, shippingMethod)

/**
 * Adds promo code
 * @function
 * @param couponCode {string} The coupon code to be applied
 */
export const putPromoCode = (couponCode) => connector.putPromoCode(couponCode)

/**
 * Deletes promo code
 * @function
 * @param couponCode {string} The coupon code to be removed
 */
export const deletePromoCode = (couponCode) => connector.deletePromoCode(couponCode)
