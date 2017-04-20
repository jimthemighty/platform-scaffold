import {makeRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'
import {removeNotification} from '../../../containers/app/actions'
import {receiveCartContents} from '../../cart/responses'
import {receiveCartProductData} from '../../products/responses'
import {getUenc} from '../selectors'
import {submitForm} from '../utils'
import {parseLocations} from '../checkout/parsers'
import {fetchShippingMethodsEstimate} from '../checkout/commands'
import {fetchPageData} from '../app/commands'
import {parseCart, parseCartProducts} from './parser'
import {parseCheckoutEntityID, extractMagentoJson} from '../../../utils/magento-utils'
import {ESTIMATE_FORM_NAME, ADD_TO_WISHLIST_URL} from '../../../containers/cart/constants'

const LOAD_CART_SECTION_URL = '/customer/section/load/?sections=cart%2Cmessages&update_section_id=true'
const REMOVE_CART_ITEM_URL = '/checkout/sidebar/removeItem/'
const UPDATE_ITEM_URL = '/checkout/sidebar/updateItemQty/'
const BASE_HEADERS = {
    Accept: 'application/json',
}

export const textFromFragment = (fragment) => {
    const e = document.createElement('div')
    e.innerHTML = fragment
    return e.textContent.trim()
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
        .then((response) => response.text())
        .then((responseText) => {
            const {cart} = JSON.parse(responseText)
            const items = cart.items.map((item) => {
                item.product_price = textFromFragment(item.product_price)
                return item
            })

            if (items.length > 0) {
                dispatch(receiveCartProductData(parseCartProducts(cart)))
            }

            dispatch(receiveCartContents({...parseCart(cart), items}))
        })
}

export const addToCart = (key, qty) => (dispatch, getState) => {
    const formInfo = getState().integrationManager.get(key)
    const formValues = {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }

    return submitForm(formInfo.get('submitUrl'), formValues, {method: formInfo.get('method')})
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
export const removeFromCart = (itemId) => {
    return (dispatch) => {
        return submitForm(REMOVE_CART_ITEM_URL, {item_id: itemId}, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    return dispatch(getCart())
                }
                throw new Error('Unable to remove item')
            })
    }
}

/**
 * Update the quantity of an item in the users cart
 *
 * Notes:
 *
 * - Response is 200 with JSON: `{"success":true}` on success
 * - Response is 200 with JSON: `{"success":false,"error_message":"We can't find the quote item."}` if item not in cart
 */
export const updateItemQuantity = (itemId, itemQuantity) => {
    return (dispatch) => {
        const requestData = {
            item_id: itemId,
            item_qty: itemQuantity
        }

        return submitForm(UPDATE_ITEM_URL, requestData, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.success) {
                    return dispatch(getCart())
                }
                throw new Error('Unable to update Quantity')
            })
    }
}

const ESTIMATE_FIELD_PATH = ['#block-summary', 'Magento_Ui/js/core/app', 'components', 'block-summary', 'children', 'block-shipping', 'children', 'address-fieldsets', 'children']

export const fetchCartPageData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res // eslint-disable-line no-unused-vars
            const customerEntityID = parseCheckoutEntityID($response)
            const magentoFieldData = extractMagentoJson($response).getIn(ESTIMATE_FIELD_PATH)
            const locationsData = parseLocations(magentoFieldData)

            return dispatch(receiveCheckoutData({
                customerEntityID,
                ...locationsData
            }))
        })
        .then(() => dispatch(fetchShippingMethodsEstimate(ESTIMATE_FORM_NAME)))
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
            .then((response) => {
                const [$, $response] = response // eslint-disable-line no-unused-vars
                // The response is the HTML of the wishlist page, so check for the item we added
                if ($response.find(`.product-item-link[href="${productURL}"]`).length) {
                    return
                }
                throw new Error('Add Request Failed')
            })
}
