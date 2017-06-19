/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.
import Loadable from 'react-loadable'

import {getBuildOrigin} from 'progressive-web-sdk/dist/asset-utils'
import ContainerPlaceholder from '../components/container-placeholder'
import {prefetchLink} from '../utils/loader-utils'
import {requestIdleCallback} from '../utils/utils'

const isRunningInIOS = /ip(hone|ad)/i.test(navigator.userAgent)
const loadableList = []
const prefetchFilenames = []

const PWALoadable = (loader, chunkFileName) => {
    const loadable = Loadable({
        loader,
        LoadingComponent: ContainerPlaceholder
    })
    loadableList.push(loadable)
    prefetchFilenames.push(chunkFileName)
    return loadable
}

const registerPreloadCallbacks = () => {
    loadableList.forEach((loadable) => {
        requestIdleCallback(() => loadable.preload())
    })
}

export const prefetchTemplateChunks = () => {
    // iOS browsers do not support prefetch link tags so
    // register them to be preloaded when browser is idle
    if (isRunningInIOS) {
        registerPreloadCallbacks()
    } else {
        prefetchFilenames
            .map((filename) => `${getBuildOrigin()}${filename}`)
            .forEach((link) => prefetchLink({href: link}))
    }
}

// These are on the old model and need to be wrapped here
// rather than in container.js to avoid circular imports
export const Cart = PWALoadable(() => import('./cart/container' /* webpackChunkName: "cart" */), 'cart.js')
export const CheckoutConfirmation = PWALoadable(() => import('./checkout-confirmation/container' /* webpackChunkName: "checkout-confirmation" */), 'checkout-confirmation.js')
export const CheckoutPayment = PWALoadable(() => import('./checkout-payment/container' /* webpackChunkName: "checkout-payment" */), 'checkout-payment.js')
export const CheckoutShipping = PWALoadable(() => import('./checkout-shipping/container' /* webpackChunkName: "checkout-shipping" */), 'checkout-shipping.js')
export const Login = PWALoadable(() => import('./login/container' /* webpackChunkName: "login" */), 'login.js')
export const ProductDetails = PWALoadable(() => import('./product-details/container' /* webpackChunkName: "product-details" */), 'product-details.js')
export const ProductList = PWALoadable(() => import('./product-list/container' /* webpackChunkName: "product-list" */), 'product-list.js')
