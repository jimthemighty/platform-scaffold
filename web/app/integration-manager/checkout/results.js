/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import * as Runtypes from 'runtypes'
import {createAction, createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'
import {EVENT_ACTION, Transaction, Product} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {getCartItems, getOrderTotal, getTax} from '../../store/cart/selectors'
import {createTypedAction} from '../../utils/utils'
import {LocationList, ShippingMethods, Address} from './types'

export const receiveCheckoutLocations = createTypedAction('Receive Checkout Locations', LocationList, 'locations')
export const receiveShippingMethods = createTypedAction('Receive Shipping Methods', ShippingMethods)
export const receiveShippingAddress = createTypedAction('Receive Shipping Address', Address, 'shippingAddress')
export const receiveBillingAddress = createTypedAction('Receive Billing Address', Address, 'billingAddress')
export const receiveHasExistingCard = createTypedAction('Receive Has Existing Cart flag', Runtypes.Boolean, 'hasExistingCreditCard')

export const receiveCheckoutCustomContent = createAction('Receive Checkout Custom Content', ['custom'])
export const setDefaultShippingAddressId = createAction('Receive default shipping address ID', ['defaultShippingAddressId'])
export const receiveSavedShippingAddresses = createAction('Receive Saved Shipping Addresses', ['storedAddresses'])
export const receiveBillingSameAsShipping = createAction('Receive Billing same as Shipping', ['billingSameAsShipping'])

const remapProducts = (products) => {
    const mappedProducts = []
    products.forEach((product) => {
        const detail = product.product
        mappedProducts.push({
            [Product.ID]: detail.id,
            [Product.NAME]: detail.title,
            [Product.PRICE]: detail.price,
            [Product.QUANTITY]: product.quantity
        })
    })
    return mappedProducts
}

export const realReceiveCheckoutConfirmationData = createActionWithAnalytics(
    'Receive Checkout Confirmation Data',
    ['confirmationData'],
    EVENT_ACTION.purchase,
    (confirmationData, purchaseData) => {
        return new Transaction(
            {
                [Transaction.ID]: confirmationData.orderNumber,
                [Transaction.REVENUE]: purchaseData[Transaction.REVENUE],
                [Transaction.TAX]: purchaseData[Transaction.TAX]
            },
            purchaseData.products
        )
    }
)

// This is a proxy action to get state information before dispatching the real intended action
// The idea here is that we obtain the data in the state using selectors so that is can be
// used to build out the analytic data required for analytic manager
export const receiveCheckoutConfirmationData = (confirmationData) => (dispatch, getState) => {
    return dispatch(realReceiveCheckoutConfirmationData(confirmationData, {
        [Transaction.REVENUE]: getOrderTotal(getState()),
        [Transaction.TAX]: getTax(getState()),
        products: remapProducts(getCartItems(getState()).toJS())
    }))
}

export const receiveUserEmail = createAction('Receive User Email Address', ['email'])
export const receiveSelectedShippingMethod = createAction('Receive Selected Shipping Method', ['selectedShippingMethodId'])
export const receiveLocationsCustomContent = createAction('Receive Locations Custom Content')
export const receiveShippingAddressCustomContent = createAction('Receive Shipping Address Custom Content')
export const receiveBillingAddressCustomContent = createAction('Receive Billing Address Custom Content')
