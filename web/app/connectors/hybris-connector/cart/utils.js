/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {calculateCartID, deleteCartID, makeApiRequest, getCartID, getUserType, storeCartID} from '../utils'
import {receiveCartProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'
import {receiveCartContents} from 'progressive-web-sdk/dist/integration-manager/cart/results'

import {parseCartProducts, parseCartContents} from './parsers'

const makeCartRequest = () => {
    return makeApiRequest(`/users/${getUserType()}/carts/${getCartID()}?fields=FULL`, {method: 'GET'})
        .then((response) => {
            if (response.status === 404) {
                deleteCartID()
                throw new Error('Cart not found')
            }
            return response
        })
        .then((response) => response.json())
}

export const createCart = () => {
    let body
    // if there's an previous cart on session, we merge it
    if (getCartID()) {
        body = {oldCartId: getCartID()}
    }
    return makeApiRequest(`/users/${getUserType()}/carts`, {method: 'POST'}, body)
        .then((response) => response.json())
        .then((cart) => {
            storeCartID(calculateCartID(cart))
            return makeCartRequest()
        })
}

export const mergeCart = (toMergeCartGuid, oldCartId) => {
    const body = {
        toMergeCartGuid,
        oldCartId
    }
    return makeApiRequest(`/users/${getUserType()}/carts`, {method: 'POST'}, body)
        .then((response) => response.json())
        .then((cart) => {
            storeCartID(calculateCartID(cart))
            return makeCartRequest()
        })
}

/**
 * Fetches product images for items that are in the cart and don't already
 * have them.
 */
export const fetchCartItemData = () => (dispatch, getState) => {

    /*
    const thumbnailViewType = 'medium'
    const largeViewType = 'large'

    const currentState = getState()

    const items = getCartItems(currentState).toJS()

    const updatedProducts = {}
    const updatedCartItems = []

    return Promise.all(
        items.map((cartItem) => {
            const productId = cartItem.productId
            return makeApiRequest(`/products/${productId}?expand=images,variations&all_images=false&view_type=${largeViewType},${thumbnailViewType}`, {method: 'GET'})
                .then((response) => response.json())
                .then(({image_groups, name, page_title, short_description, variation_values, variation_attributes}) => {
                    const productHref = getProductHref(productId)
                    const productState = getProductById(productId)(currentState).toJS()
                    const options = variation_attributes.map((attribute) => {
                        const selectedId = variation_values[attribute.id]
                        const selectedVariant = attribute.values.find((val) => val.value === selectedId) // eslint-disable-line

                        return {
                            label: attribute.name,
                            value: selectedVariant.name
                        }
                    })

                    const product = {
                        ...productState,
                        id: productId,
                        title: page_title,
                        available: true,
                        href: productHref,
                        price: productState.price || ''
                    }

                    const thumbnail = image_groups.find((group) => group.view_type === thumbnailViewType)
                    if (thumbnail) {
                        product.thumbnail = imageFromJson(thumbnail.images[0], name, short_description)
                    }
                    const largeGroup = image_groups.find((group) => group.view_type === largeViewType)
                    if (largeGroup) {
                        product.images = largeGroup.images.map((image) => imageFromJson(image, name, short_description))
                    }

                    updatedProducts[productId] = product

                    updatedCartItems.push({
                        ...cartItem,
                        options,
                        thumbnail: product.thumbnail,
                        title: product.title
                    })
                })
        })
        )
        .then(() => {
            dispatch(receiveCartProductData(updatedProducts))
            dispatch(receiveCartItems(updatedCartItems))
        })
        */
}

const requestCartData = () =>
    makeCartRequest()
        .catch(() => createCart())


export const getCart = () => {
    return getCartID() ? requestCartData() : createCart()
}

export const handleCartData = (cart) => (dispatch) => {
    // Note: These need to be dispatched in this order, otherwise there's
    //       a chance we could try to render cart items and not have product
    //       data in the store for it.
    dispatch(receiveCartProductData(parseCartProducts(cart)))
    dispatch(receiveCartContents(parseCartContents(cart)))

    return dispatch(fetchCartItemData())
}
