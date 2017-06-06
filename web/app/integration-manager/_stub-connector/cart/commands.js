import {receiveCartContents, receiveCartTotals} from '../../cart/results'
import {receiveCartProductData} from '../../products/results'

export const initCartPage = (url, routeName) => (dispatch) => {
    console.log('[Stub Connector] Called initCartPage stub')
    return Promise.resolve()
}

export const getCart = () => (dispatch) => {
    console.log('[Stub Connector] Called getCart stub')
    
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
    const exampleCartProducts = {
        ['/product1.html']: {
            price: '$10.00',
            available: true,
            href: '/product1.html',
            thumbnail: image,
            title: 'Product 1',
            id: '1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    }

    // For more information on the shape of the expected data, see ../../cart/types
    dispatch(receiveCartContents(exampleCartData))
    dispatch(receiveCartProductData(exampleCartProducts))
    return Promise.resolve()
}

export const addToCart = (productId, quantity) => (dispatch) => {
    console.log('[Stub Connector] Called addToCart stub')
    return Promise.resolve()
}

export const removeFromCart = (itemID) => (dispatch) => {
    console.log('[Stub Connector] Called removeFromCart stub')
    return Promise.resolve()
}

export const updateItemQuantity = (itemID, quantity) => (dispatch) => {
    console.log('[Stub Connector] Called updateItemQuantity stub')
    return Promise.resolve()
}

export const addToWishlist = (productId, productURL) => (dispatch) => {
    console.log('[Stub Connector] Called addToWishlist stub')
    return Promise.resolve()
}

export const fetchTaxEstimate = (address, shippingMethod) => (dispatch) => {
    console.log('[Stub Connector] Called fetchTaxEstimate stub')
    return Promise.resolve()
}

export const putPromoCode = (couponCode) => (dispatch) => {
    console.log('[Stub Connector] Called putPromoCode stub')
    return Promise.resolve()
}

export const deletePromoCode = (couponCode) => (dispatch) => {
    console.log('[Stub Connector] Called deletePromoCode stub')
    return Promise.resolve()
}
