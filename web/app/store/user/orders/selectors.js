// /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
// /* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
// /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
import Immutable from 'immutable'
import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUser} from '../../../store/selectors'

export const getCurrentOrderId = createGetSelector(getUser, 'currentOrderId', '')
export const getOrders = createGetSelector(getUser, 'orders', Immutable.Map())

export const getCurrentOrder = createSelector(
    getOrders,
    getCurrentOrderId,
    (orders, currentOrderId) => orders.get(currentOrderId) || Immutable.Map()
)

export const getOrderDate = createGetSelector(getCurrentOrder, 'date')
export const getOrderStatus = createGetSelector(getCurrentOrder, 'status')
export const getOrderItems = createGetSelector(getCurrentOrder, 'items')
export const getOrderTotal = createGetSelector(getCurrentOrder, 'total')
export const getOrderTax = createGetSelector(getCurrentOrder, 'tax')
export const getOrderShippingTotal = createGetSelector(getCurrentOrder, 'shippingTotal')
export const getOrderSubtotal = createGetSelector(getCurrentOrder, 'subtotal')
export const getOrderBillingAddress = createGetSelector(getCurrentOrder, 'billingAddress')
export const getOrderPaymentMethod = createGetSelector(getCurrentOrder, 'paymentMethod')
export const getOrderShippingMethod = createGetSelector(getCurrentOrder, 'shippingMethod')
export const getOrderShippingAddress = createGetSelector(getCurrentOrder, 'shippingAddress')
