import {receiveCartContents, receiveCartTotals} from '../../cart/results'
import {receiveCartProductData} from '../../products/results'

export const initCartPage = (url, routeName) => (dispatch) => Promise.resolve()

export const getCart = () => (dispatch) => {
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

    return new Promise((resolve) => {
        // For more information on the shape of the expected data, see ../../cart/types
        dispatch(receiveCartContents(exampleCartData))
        dispatch(receiveCartProductData(exampleCartProducts))
        resolve()
    })
}

export const addToCart = (productId, quantity) => (dispatch) => Promise.resolve()

export const removeFromCart = (itemID) => (dispatch) => Promise.resolve()

export const updateItemQuantity = (itemID, quantity) => (dispatch) => Promise.resolve()

export const addToWishlist = (productId, productURL) => (dispatch) => Promise.resolve()

export const fetchTaxEstimate = (address, shippingMethod) => (dispatch) => Promise.resolve()

export const putPromoCode = (couponCode) => (dispatch) => Promise.resolve()

export const deletePromoCode = (couponCode) => (dispatch) => Promise.resolve()
