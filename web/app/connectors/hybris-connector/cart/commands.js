/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-disable no-unused-vars */

import {receiveCartContents} from 'progressive-web-sdk/dist/integration-manager/cart/results'
import {receiveCartProductData} from 'progressive-web-sdk/dist/integration-manager/products/results'

export const initCartPage = (url, routeName) => (dispatch) => {
    console.log('[Hybris Connector] Called initCartPage stub with arguments:', url, routeName)
    return Promise.resolve()
}

export const getCart = () => (dispatch) => {
    console.log('[Hybris Connector] Called getCart stub')

    const exampleCartData = {
        items: [{
            id: '1',
            productId: '1',
            href: '/product1.html',
            quantity: 1,
            itemPrice: '$10.00',
            linePrice: '$10.00'
        }],
        subtotal: '$10.00',
        orderTotal: '$10.00'
    }

    const image = {
        src: '//via.placeholder.com/350x350',
        alt: 'Product 1'
    }
    // const productURL = '300044599' // tools
    // const productURL = '115195' // watch
    // const productURL = '115195_shocking_pink';
    // const productURL = '122811' // t-shirts
    // const productURL = '122811_heather_berry'
    // const productURL = '300717437'
    // const productURL = '300720128'
    // const productURL = '1978440' // electronics
    const productURL = '779841' // electronics
    const exampleCartProducts = {
        '1': { // eslint-disable-line
            price: '$10.00',
            available: true,
            href: `product_id/${productURL}`,
            thumbnail: image,
            title: 'Product testing',
            id: '1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    }

    // For more information on the shape of the expected data, see progressive-web-sdk/integration-manager/cart/types
    dispatch(receiveCartContents(exampleCartData))
    dispatch(receiveCartProductData(exampleCartProducts))
    return Promise.resolve()
}

export const addToCart = (productId, quantity) => (dispatch) => {
    console.log('[Hybris Connector] Called addToCart stub with arguments:', productId, quantity)
    return Promise.resolve()
}

export const removeFromCart = (itemID) => (dispatch) => {
    console.log('[Hybris Connector] Called removeFromCart stub with arguments:', itemID)
    return Promise.resolve()
}

export const updateItemQuantity = (itemID, quantity) => (dispatch) => {
    console.log('[Hybris Connector] Called updateItemQuantity stub with arguments:', itemID, quantity)
    return Promise.resolve()
}


export const fetchTaxEstimate = (address, shippingMethod) => (dispatch) => {
    console.log('[Hybris Connector] Called fetchTaxEstimate stub with arguments:', address, shippingMethod)
    return Promise.resolve()
}

export const putPromoCode = (couponCode) => (dispatch) => {
    console.log('[Hybris Connector] Called putPromoCode stub with arguments:', couponCode)
    return Promise.resolve()
}

export const deletePromoCode = (couponCode) => (dispatch) => {
    console.log('[Hybris Connector] Called deletePromoCode stub with arguments:', couponCode)
    return Promise.resolve()
}
