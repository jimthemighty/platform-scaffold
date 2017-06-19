/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import Loadable from 'react-loadable'

import {getBuildOrigin} from 'progressive-web-sdk/dist/asset-utils'
import ContainerPlaceholder from '../components/container-placeholder'
import {requestIdleCallback} from '../utils/utils'
import {prefetchLink} from '../utils/loader-utils'


const PWALoadable = (loader) => {
    const loadable = Loadable({
        loader,
        LoadingComponent: ContainerPlaceholder
    })
    return loadable
}

// A list of filenames that we want to be prefetched by the browser
// these filenames come from the chunk names defined below.
const prefetchFilenames = [
    'cart.js',
    'checkout-confirmation.js',
    'checkout-payment.js',
    'checkout-shipping.js',
    'login.js',
    'product-details.js',
    'product-list.js'
]

export const prefetchChunks = () => {
    prefetchFilenames
        .map((filename) => `${getBuildOrigin()}${filename}`)
        .forEach((link) => prefetchLink({href: link}))
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