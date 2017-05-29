/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {makeRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {removeNotification} from 'progressive-web-sdk/dist/store/notifications/actions'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getUenc, getCartBaseUrl} from '../selectors'
import {receiveEntityID} from '../actions'
import {getSelectedShippingMethod, getShippingAddress} from '../../../store/checkout/shipping/selectors'
import {getCouponValue} from '../../../store/form/selectors'
import {receiveCartContents} from '../../cart/results'
import {receiveCartProductData} from '../../products/results'
import {submitForm, textFromFragment, prepareEstimateAddress} from '../utils'
import {parseLocations} from '../checkout/parsers'
import {receiveCheckoutLocations} from '../../checkout/results'
import {fetchShippingMethodsEstimate} from '../checkout/commands'
import {fetchPageData} from '../app/commands'
import {parseCart, parseCartProducts, parseCartTotals} from './parser'
import {parseCheckoutEntityID, extractMagentoJson} from '../../../utils/magento-utils'
import {ADD_TO_WISHLIST_URL, PROMO_ERROR} from '../../../containers/cart/constants'
import {getProductById} from '../../../store/products/selectors'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart%2Cmessages&update_section_id=true'
const REMOVE_CART_ITEM_URL = '/checkout/sidebar/removeItem/'
const UPDATE_ITEM_URL = '/checkout/sidebar/updateItemQty/'
const BASE_HEADERS = {
    Accept: 'application/json',
}

/**
 * Get the contents of the users cart
 */
export const getCart = () => (dispatch) => {
    const opts = {
        headers: BASE_HEADERS
    }
    dispatch(removeNotification('cartUpdateError'))
    const currentTimeMs = new Date().getTime()
    return makeRequest(`${LOAD_CART_SECTION_URL}&_=${currentTimeMs}`, opts)
        .then((response) => response.json())
        .then(({cart}) => {
            cart.items.forEach((item) => {
                item.product_price = textFromFragment(item.product_price)
            })

            if (cart.items.length > 0) {
                dispatch(receiveCartProductData(parseCartProducts(cart)))
            }

            dispatch(receiveCartContents(parseCart(cart)))
        })
}

export const addToCart = (productId, quantity) => (dispatch, getState) => {
    const product = getProductById(productId)(getState())
    const formInfo = getState().integrationManager.get(urlToPathKey(product.get('href')))
    const formValues = {
        ...formInfo.get('hiddenInputs').toJS(),
        qty: quantity
    }

    return submitForm(
            formInfo.get('submitUrl'),
            formValues,
            {method: formInfo.get('method')}
        )
        .then(() => dispatch(getCart()))
}

/**
 * Remove an item from the users cart
 *
 * Notes:
 *
 * - The `item_id` present in the data returned from getCart.
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 * - Important: The cart contents rendered in the main HTML is *not* updated until `getCart()` has been called which
 *   busts a cache. removeFromCart() will call getCart() once the request to remove the item has completed
 */
export const removeFromCart = (itemId) => (dispatch) => (
    submitForm(REMOVE_CART_ITEM_URL, {item_id: itemId}, {method: 'POST'})
        .then((response) => response.json())
        .then(({success}) => {
            if (success) {
                return dispatch(getCart())
            }
            throw new Error('Unable to remove item')
        })
)

/**
 * Update the quantity of an item in the users cart
 *
 * Notes:
 *
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 */
export const updateItemQuantity = (itemId, itemQuantity) => (dispatch) => {
    const requestData = {
        item_id: itemId,
        item_qty: itemQuantity
    }

    return submitForm(UPDATE_ITEM_URL, requestData, {method: 'POST'})
        .then((response) => response.json())
        .then(({success}) => {
            if (success) {
                return dispatch(getCart())
            }
            throw new Error('Unable to update Quantity')
        })
}

const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const initCartPage = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => { // eslint-disable-line no-unused-vars
            const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)

            dispatch(receiveEntityID(parseCheckoutEntityID($response)))
            dispatch(receiveCheckoutLocations(parseLocations(magentoFieldData)))

            return dispatch(fetchShippingMethodsEstimate({}))
        })
}

export const addToWishlist = (productId, productURL) => (dispatch, getState) => {
    const currentState = getState()
    const payload = {
        product: productId,
        // This won't always be defined, but add to wishlist will still work
        // if it's missing
        uenc: getUenc(urlToPathKey(productURL))(currentState)
    }

    return submitForm(ADD_TO_WISHLIST_URL, payload, {method: 'POST'})
        .then(jqueryResponse)
        .then(([$, $response]) => { // eslint-disable-line no-unused-vars
            // The response is the HTML of the wishlist page, so check for the item we added
            if (!$response.find(`.product-item-link[href="${productURL}"]`).length) {
                throw new Error('Add Request Failed')
            }
        })
}

export const fetchTaxEstimate = (address, shippingMethod) => (dispatch, getState) => {
    const cartBaseUrl = getCartBaseUrl(getState())

    const shippingMethodParts = shippingMethod.split('_')

    const requestData = {
        addressInformation: {
            address: prepareEstimateAddress(address),
            shipping_carrier_code: shippingMethodParts[0],
            shipping_method_code: shippingMethodParts[1]
        }
    }

    return makeJsonEncodedRequest(`${cartBaseUrl}/totals-information`, requestData, {method: 'POST'})
        .then((response) => response.json())
        .then((responseJSON) => dispatch(receiveCartContents(
            parseCartTotals(responseJSON)
        )))
}

const getCartTotalsSelector = createPropsSelector({
    address: getShippingAddress,
    shippingMethod: getSelectedShippingMethod,
    cartBaseUrl: getCartBaseUrl
})

// Note that this isn't an action/thunk, but rather just a regular function
export const getCartTotalsInfo = (currentState) => {
    const {address, shippingMethod, cartBaseUrl} = getCartTotalsSelector(currentState)
    const shippingMethodId = shippingMethod.id || ''
    const shippingCodes = shippingMethodId.length ? shippingMethodId.split('_') : []
    const addressInformation = {
        address: {
            country_id: address.countryId,
            region_id: address.regionId,
            postcode: address.postcode
        },
        shipping_carrier_code: shippingCodes[0],
        shipping_method_code: shippingCodes[1]
    }

    return makeJsonEncodedRequest(
        `${cartBaseUrl}/totals-information`,
        {addressInformation},
        {method: 'POST'}
    )
        .then((response) => response.json())
        // the above request will be handled by other actions below!
}

export const putPromoCode = (couponCode) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)
    couponCode = getCouponValue(currentState)

    const putPromoUrl = `${cartBaseUrl}/coupons/${couponCode}`
    return makeJsonEncodedRequest(putPromoUrl, couponCode, {method: 'PUT'})
        .then((response) => {
            // Check if coupon is valid
            if (response.status === 404) {
                throw Error(`${PROMO_ERROR}, code is invalid`)
            }
        })
        .then(() => getCartTotalsInfo(currentState))
        .then((responseJSON) => {
            dispatch(receiveCartContents(parseCartTotals(responseJSON)))
        })
}

export const deletePromoCode = (couponCode) => (dispatch, getState) => {
    const currentState = getState()
    const cartBaseUrl = getCartBaseUrl(currentState)
    couponCode = getCouponValue(currentState)

    const deletePromoUrl = `${cartBaseUrl}/coupons/`
    return makeJsonEncodedRequest(deletePromoUrl, couponCode, {method: 'DELETE'})
        .then((response) => response.json())
        .then(() => getCartTotalsInfo(currentState))
        .then((responseJSON) => {
            dispatch(receiveCartContents(parseCartTotals(responseJSON)))
        })
}
