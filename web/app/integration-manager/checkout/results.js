/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import {createAction, createActionWithAnalytics} from 'progressive-web-sdk/dist/utils/action-creation'
import {EVENT_ACTION, Transaction, Product} from 'progressive-web-sdk/dist/analytics/data-objects/'
import {getCartItems, getOrderTotal, getTax} from '../../store/cart/selectors'
import {createTypedAction} from '../../utils/utils'
import {LocationList, ShippingMethods} from './types'

export const receiveCheckoutLocations = createTypedAction('Receive Checkout Locations', LocationList, 'locations')
export const receiveShippingMethods = createTypedAction('Receive Shipping Methods', ShippingMethods)

export const receiveCheckoutData = createAction('Receive Checkout Data')
export const receiveCheckoutCustomContent = createAction('Receive Checkout Custom Content', ['custom'])
export const receiveShippingInitialValues = createAction('Receive Shipping Initial Values', ['shipping'])
export const receiveHasExistingCard = createAction('Receive Has Existing Cart flag', ['hasExistingCreditCard'])
export const receiveBillingInitialValues = createAction('Receive Billing Initial Values', ['billing'])
export const setDefaultShippingAddressId = createAction('Receive default shipping address ID', 'defaultShippingAddressId')
export const receiveSavedShippingAddresses = createAction('Receive Saved Shipping Addresses', 'storedAddresses')



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

const realReceiveCheckoutConfirmationData = createActionWithAnalytics(
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

export const receiveUserEmail = createAction('Receive User Email Address', ['emailAddress'])
export const receiveLocationsCustomContent = createAction('Receive Locations Custom Content')
export const receiveShippingCustomContent = createAction('Receive Shipping Custom Content')
export const receiveShippingAddressCustomContent = createAction('Receive Shipping Address Custom Content')
export const receiveBillingCustomContent = createAction('Receive Billing Custom Content')
export const receiveBillingAddressCustomContent = createAction('Receive Billing Address Custom Content')
export const receivePaymentCustomContent = createAction('Receive Payment Custom Content')
export const receivePaymentAddressCustomContent = createAction('Receive Payment Address Custom Content')
