/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import Loadable from 'react-loadable'

import ContainerPlaceholder from '../components/container-placeholder'
import {requestIdleCallback} from '../utils/utils'

const loadableList = []
const PWALoadable = (loader) => {
    const loadable = Loadable({
        loader,
        LoadingComponent: ContainerPlaceholder
    })
    loadableList.push(loadable)
    return loadable
}

export const registerPreloadCallbacks = () => {
    loadableList.forEach((loadable) => {
        requestIdleCallback(loadable.preload)
    })
}

// These are on the old model and need to be wrapped here
// rather than in container.js to avoid circular imports
export const Cart = PWALoadable(() => import('./cart/container' /* webpackChunkName: "cart" */))
export const CheckoutConfirmation = PWALoadable(() => import('./checkout-confirmation/container' /* webpackChunkName: "checkout-confirmation" */))
export const CheckoutPayment = PWALoadable(() => import('./checkout-payment/container' /* webpackChunkName: "checkout-payment" */))
export const CheckoutShipping = PWALoadable(() => import('./checkout-shipping/container' /* webpackChunkName: "checkout-shipping" */))
export const Login = PWALoadable(() => import('./login/container' /* webpackChunkName: "login" */))
export const ProductDetails = PWALoadable(() => import('./product-details/container' /* webpackChunkName: "product-details" */))
export const ProductList = PWALoadable(() => import('./product-list/container' /* webpackChunkName: "product-list" */))

// A list of filenames that we want to be prefetched by the browser
// these filenames come from the chunk names defined above.
export const prefetchFilenames = [
    'cart.js',
    'checkout-confirmation.js',
    'checkout-payment.js',
    'checkout-shipping.js',
    'login.js',
    'product-details.js',
    'product-list.js'
]